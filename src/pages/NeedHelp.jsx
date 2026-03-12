import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Send, CheckCircle2, ChevronDown, Paperclip, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function NeedHelp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [attachments, setAttachments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  // Auto-reset success message after 5 seconds
  React.useEffect(() => {
    let timeout;
    if (submitted) {
      timeout = setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        setAttachments([]);
        setTicketId('');
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [submitted]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max size is 5MB.`);
        continue;
      }

      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
      });

      const content = await base64Promise;
      validFiles.push({
        filename: file.name,
        content: content,
        type: file.type,
        disposition: 'attachment'
      });
    }

    setAttachments(prev => [...prev, ...validFiles]);
    // Reset input
    e.target.value = '';
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          attachments: attachments
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

  const faqs = [
    {
      question: "How long does it take to get a response?",
      answer: "Our support team typically responds within 24 hours during business days. For urgent matters, we prioritize responses and aim to get back to you within 4-6 hours."
    },
    {
      question: "What platforms does IncuBrix integrate with?",
      answer: "IncuBrix currently integrates with LinkedIn, YouTube, podcasts, and newsletters. We're actively working on adding support for Twitter/X, Instagram, TikTok, and Medium in our upcoming releases."
    },
    {
      question: "Can I schedule a live demo?",
      answer: "Absolutely! You can schedule a personalized 30-minute demo with our team by visiting our Demo page or booking directly through our Calendly link. We'll walk you through the platform and answer all your questions."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 14-day free trial for all new users. No credit card required. You'll have full access to all features during the trial period to explore how IncuBrix can transform your creator journey."
    },
    {
      question: "How secure is my content and data?",
      answer: "We take security seriously. All data is encrypted end-to-end, we're GDPR and CCPA compliant, and we never share your content with third parties. Your intellectual property and personal information are fully protected on our platform."
    }
  ];

  if (submitted) {
    return (
      <div className="bg-[#0a0e27] text-white min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0e27] to-black">
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-blue-500/30 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/20 p-12 max-w-2xl text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-cyan-500/50"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Message Sent!
            </motion.h2>
            <motion.p
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Thank you for reaching out. Your Ticket ID is <span className="text-cyan-400 font-bold">{ticketId}</span>. Our support team will respond within 24 hours.
            </motion.p>
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              We've sent a confirmation to <span className="text-cyan-400 font-semibold">{formData.email}</span>
            </motion.p>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0e27] text-white min-h-screen">
      <section className="relative py-8 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0e27] to-black">
          <motion.div
            className="absolute top-1/4 left-1/3 w-[460px] h-[460px] bg-gradient-to-br from-cyan-500/28 to-blue-500/24 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.3, 1.1, 1],
              opacity: [0.4, 0.6, 0.5, 0.4],
              x: [0, 80, -50, 0],
              y: [0, -50, 40, 0],
              rotate: [0, 90, 270, 360]
            }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/26 to-purple-500/28 rounded-full blur-[130px]"
            animate={{
              scale: [1.3, 1, 1.5, 1.3],
              opacity: [0.6, 0.3, 0.7, 0.6],
              x: [0, -90, 60, 0],
              y: [0, 70, -60, 0],
              rotate: [360, 180, 0, 360]
            }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-4xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Let's Build
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Our team is here to answer your questions and support your creator journey
          </motion.p>
        </div>
      </section>

      <section id="contact-form" className="py-8 px-6 bg-[#0a0e27] relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="max-w-md w-full"
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@incubrix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full cursor-pointer relative z-50"
              >
                <Card className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/20 p-8 h-full hover:border-cyan-500/60 transition-all relative overflow-hidden group">
                  <div className="relative z-10">
                    <Mail className="w-10 h-10 text-cyan-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-white">Email Support</h3>
                    <p className="text-gray-400 mb-4">
                      Get help via email. We respond within 24 hours.
                    </p>
                    <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors font-medium">
                      contact@incubrix.com
                    </span>
                  </div>
                </Card>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/20 p-8 md:p-12 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">Need Help?</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white">Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[#0f1535] border-cyan-500/30 text-white mt-2"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#0f1535] border-cyan-500/30 text-white mt-2"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">Your Query *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-[#0f1535] border-cyan-500/30 text-white mt-2 min-h-32"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* Attachment Section */}
                  <div className="space-y-3">
                    <Label className="text-white flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-cyan-400" /> Attach Screenshots (Optional)
                    </Label>

                    <div className="flex flex-wrap gap-3">
                      <AnimatePresence>
                        {attachments.map((file, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2 bg-[#0f1535] border border-cyan-500/30 rounded-lg px-3 py-2 text-xs text-gray-300"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="max-w-[120px] truncate">{file.filename}</span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(idx)}
                              className="hover:text-red-400 p-0.5 rounded-full hover:bg-white/5 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <label className="flex items-center justify-center p-2 rounded-lg border-2 border-dashed border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/5 cursor-pointer transition-all group">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2 text-sm text-cyan-400/70 group-hover:text-cyan-400 px-2">
                          <ImageIcon className="w-4 h-4" />
                          <span>Add Screenshot</span>
                        </div>
                      </label>
                    </div>
                    <p className="text-[11px] text-gray-500">Max size 5MB per file. Formats: JPG, PNG, GIF.</p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white py-6 text-lg font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="py-8 px-6 bg-[#0f1535] relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4 mt-12">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card
                  className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/20 overflow-hidden cursor-pointer hover:border-cyan-500/60 transition-all"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openFaq === idx ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-cyan-400" />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-gray-400 mt-4 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-6 bg-[#0a0e27]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Other Ways to Get Help
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Documentation", desc: "Browse our comprehensive guides and tutorials" },
              { title: "Video Tutorials", desc: "Watch step-by-step video guides" },
              { title: "Community Forum", desc: "Connect with other creators using IncuBrix" }
            ].map((resource, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/20 p-6 text-center h-full hover:border-cyan-500/60 transition-all">
                  <h3 className="font-semibold text-lg mb-2 text-white">{resource.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{resource.desc}</p>
                  <span className="text-cyan-400 text-sm">Coming soon</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}