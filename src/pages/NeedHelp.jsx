import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/lib/AuthContext';

const CATEGORIES = [
  { id: 'feedback', label: 'General Feedback' },
  { id: 'bug', label: 'Bug Report' },
  { id: 'feature', label: 'Feature Request' },
  { id: 'account', label: 'Account Issue' },
];

export default function NeedHelp() {
  const { theme } = useAuth();
  const location = useLocation();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (location.hash === '#faq') {
      const element = document.getElementById('faq');
      if (element) {
        // Small timeout to ensure DOM is ready and layout has settled
        const timeoutId = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [location.hash]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Feedback',
    message: '',
    attachments: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

  const validateEmail = (email) => {
    // Simple, bundler-safe email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.attachments.length + files.length > 3) {
      toast.error('Maximum 3 files allowed');
      return;
    }
    const newAttachments = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      file,
    }));
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/support/ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.category,
          message: formData.message,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setTicketId(data.ticketId);
        setSubmitted(true);
        toast.success('Message sent successfully!');
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending support request:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#0a0e27] text-white min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-lg">
          <Card className="bg-[#10173a] border-cyan-500/20 p-12 text-center shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Message Received</h2>
            <p className="text-lg text-gray-300 mb-8">
              Ticket ID: <span className="text-cyan-400 font-bold">{ticketId}</span>.<br />
              Our support team will respond to{' '}
              <span className="text-cyan-400">{formData.email}</span> within 24 hours.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  category: 'General Feedback',
                  message: '',
                  attachments: [],
                });
              }}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8"
            >
              Back to Support
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0e27] text-white min-h-screen relative">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">

        {/* ── Header ── */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-[0.3em] mb-6">
            Support Center
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            How can we <span className="text-cyan-400">help you</span> today?
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Whether you found a bug, have an idea, or just want to say hi, our team is ready to listen.
          </p>
        </div>

        {/* ── Form Card ── */}
        <div className="w-full max-w-3xl">
          <Card className="bg-[#0d1330] border-white/5 p-8 md:p-12 rounded-[2rem] shadow-2xl">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-white">Need Help?</h2>
              <p className="text-gray-400 text-sm mt-2">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Full Name</Label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-14 bg-white/5 border-white/10 rounded-xl text-white focus:border-cyan-500/50 transition-all font-medium placeholder:text-gray-600"
                    placeholder="e.g. Alex Creator"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Email Address</Label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-14 bg-white/5 border-white/10 rounded-xl text-white focus:border-cyan-500/50 transition-all font-medium placeholder:text-gray-600"
                    placeholder="alex@incubrix.com"
                  />
                </div>
              </div>

              {/* Topic Dropdown */}
              <div className="space-y-3 relative">
                <Label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Topic</Label>
                <div
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between px-5 cursor-pointer hover:border-white/20 transition-all"
                >
                  <span className="font-bold text-white uppercase tracking-wider text-xs">{formData.category}</span>
                  <span className={`text-gray-500 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}>▼</span>
                </div>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-[#0a0e27] border border-white/10 rounded-xl shadow-2xl z-50">
                    {CATEGORIES.map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => {
                          setFormData({ ...formData, category: cat.label });
                          setIsCategoryOpen(false);
                        }}
                        className={`p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-all ${formData.category === cat.label ? 'bg-white/5' : ''}`}
                      >
                        <span className="font-bold text-gray-300 uppercase tracking-wider text-[10px]">{cat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="space-y-3">
                <Label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">Message</Label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[160px] bg-white/5 border-white/10 rounded-2xl text-white focus:border-cyan-500/50 transition-all font-medium p-5 placeholder:text-gray-600"
                  placeholder="Describe your issue or suggestion in detail..."
                />

              </div>

              {/* Attachments */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Label className="text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1">
                    Attachments (Max 3)
                  </Label>
                  <span className="text-gray-500 text-[10px]">
                    Supported: JPG · PNG · GIF · PDF · DOC · DOCX &nbsp;·&nbsp; Max 10 MB each
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formData.attachments.map((file, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="text-rose-400 font-bold text-[10px] ml-2 shrink-0"
                      >
                        REMOVE
                      </button>
                    </div>
                  ))}
                  {formData.attachments.length < 3 && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 border border-dashed border-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:border-cyan-500/40 transition-all"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Add File</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-cyan-600 hover:bg-cyan-500 text-white text-lg font-black uppercase tracking-widest rounded-xl transition-all"
              >
                {loading ? 'Processing...' : 'Submit Message'}
              </Button>
            </form>
          </Card>
        </div>

        {/* ── FAQ Section ── */}
        <div id="faq" className="mt-24 w-full max-w-4xl scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is IncuBrix and how does it help creators?",
                a: "IncuBrix is an all-in-one creator platform that helps you plan, create, publish, and analyze your content—so you can grow faster without juggling multiple tools."
              },
              {
                q: "Do I need technical or editing skills to use IncuBrix?",
                a: "No. IncuBrix is designed to be simple and intuitive—whether you're creating videos, generating voiceovers, or publishing content, everything is streamlined for ease of use."
              },
              {
                q: "Which platforms can I publish my content to?",
                a: "You can publish across multiple platforms like YouTube, Instagram, Facebook, and more—all from one place, with just a single click."
              },
              {
                q: "How does IncuBrix help me grow my content?",
                a: "IncuBrix analyzes your content to identify gaps, trends, and opportunities—helping you create better content, improve engagement, and scale your reach."
              },
              {
                q: "Is my data secure when I connect my accounts?",
                a: "Yes. We use secure authentication methods, and your credentials are never stored. You can also disconnect your accounts anytime."
              },
              {
                q: "How quickly can I get started?",
                a: "You can get started in minutes—just sign up, connect your accounts, and begin creating and publishing content right away."
              }
            ].map((item, idx) => (
              <FaqItem key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div 
      className={`group rounded-2xl border transition-all duration-300 ${
        isOpen 
          ? 'bg-[#0d1330] border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]' 
          : 'bg-[#0a0e27] border-white/5 hover:border-white/10'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-cyan-400' : 'text-white'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className={`w-5 h-5 ${isOpen ? 'text-cyan-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-gray-400 leading-relaxed font-medium">
          {answer}
        </div>
      </motion.div>
    </div>
  );
}