import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'Is IncuBrix suitable for beginners?',
          a: 'Absolutely! IncuBrix is designed for creators at all levels—from those just starting out to established professionals. Our intuitive interface and AI assistance make it easy to create professional content even if you\'re new to digital content creation.'
        },
        {
          q: 'Do I need technical skills to use IncuBrix?',
          a: 'No technical skills required. IncuBrix is built to be user-friendly and intuitive. If you can use social media, you can use IncuBrix.'
        },
        {
          q: 'How long does it take to get started?',
          a: 'You can create your first piece of content within 15 minutes of signing up. Our onboarding process guides you through connecting your platforms and creating your first AI-generated content.'
        }
      ]
    },
    {
      category: 'Features & Functionality',
      questions: [
        {
          q: 'Which platforms does IncuBrix support?',
          a: 'We currently support LinkedIn, YouTube, podcasts, newsletters, and blogs. We\'re constantly adding new platforms based on user feedback. Instagram, Twitter/X, and TikTok support is coming soon.'
        },
        {
          q: 'How does the AI content generation work?',
          a: 'Our AI learns your unique voice and style by analyzing your existing content. When you input an idea, it generates content that sounds authentically like you—not generic AI text. You maintain full control to edit and refine everything.'
        },
        {
          q: 'Can I customize the AI-generated content?',
          a: 'Yes! AI generation is just the starting point. You have full editing capabilities to refine, adjust, and personalize every piece of content before publishing.'
        },
        {
          q: 'What is the Creator Growth Score?',
          a: 'The Creator Growth Score is a proprietary metric that tracks your consistency, engagement growth, audience retention, and monetization health. It helps you understand the overall health of your creator business at a glance.'
        }
      ]
    },
    {
      category: 'Pricing & Plans',
      questions: [
        {
          q: 'How much does IncuBrix cost?',
          a: 'We\'re currently in beta with free access for early users. Production pricing will be announced before the official launch, and all beta users will receive special lifetime discounts.'
        },
        {
          q: 'Is there a free trial?',
          a: 'Yes! Join our beta program for free access to all features. We want you to experience the full power of IncuBrix before making any commitment.'
        },
        {
          q: 'Can I cancel anytime?',
          a: 'Absolutely. When we launch paid plans, you\'ll be able to cancel anytime with no penalties or long-term commitments.'
        }
      ]
    },
    {
      category: 'Brand Partnerships',
      questions: [
        {
          q: 'How does the Brand Partnership Hub work?',
          a: 'The Brand Partnership Hub connects you with brands looking for creators in your niche. You create a profile showcasing your audience and content style, and brands can discover and reach out to you directly. You can also browse available partnership opportunities.'
        },
        {
          q: 'Do you take a commission on brand deals?',
          a: 'No. We don\'t take any commission on partnerships you secure through IncuBrix. The connection platform is included in your subscription.'
        },
        {
          q: 'What kind of brands use IncuBrix?',
          a: 'We work with brands across tech, education, lifestyle, business services, and more. Our focus is on quality partnerships that align with creator values and audience interests.'
        }
      ]
    },
    {
      category: 'Data & Privacy',
      questions: [
        {
          q: 'Is my content data secure?',
          a: 'Yes. We use enterprise-grade encryption and security measures. Your content, analytics data, and personal information are protected and never shared with third parties without your explicit consent.'
        },
        {
          q: 'Do you own the content I create on IncuBrix?',
          a: 'No. You own 100% of all content you create using IncuBrix. We simply provide the tools to help you create it.'
        },
        {
          q: 'Can I export my data?',
          a: 'Yes. You can export all your content, analytics, and account data at any time in standard formats.'
        }
      ]
    },
    {
      category: 'Support',
      questions: [
        {
          q: 'What kind of support do you offer?',
          a: 'We provide email support for all users, live chat for beta users, and priority support for enterprise customers. We also have extensive documentation, video tutorials, and a community forum.'
        },
        {
          q: 'How quickly do you respond to support requests?',
          a: 'We aim to respond to all support requests within 24 hours during weekdays, often much faster. Critical issues are handled immediately.'
        }
      ]
    }
  ];

  return (
    <div className="bg-[#0a0e27] text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-12 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0e27] to-black">
          <motion.div 
            className="absolute top-1/3 left-1/4 w-[460px] h-[460px] bg-gradient-to-br from-cyan-500/28 to-teal-500/25 rounded-full blur-[120px]"
            animate={{ 
              scale: [1, 1.4, 1.1, 1],
              opacity: [0.4, 0.6, 0.5, 0.4],
              x: [0, 80, -40, 0],
              y: [0, -60, 50, 0],
              rotate: [0, 120, 240, 360]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/25 to-purple-500/30 rounded-full blur-[130px]"
            animate={{ 
              scale: [1.3, 1, 1.5, 1.3],
              opacity: [0.5, 0.3, 0.7, 0.5],
              x: [0, -90, 60, 0],
              y: [0, 70, -50, 0],
              rotate: [360, 180, 0, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 right-1/2 w-[420px] h-[420px] bg-gradient-to-br from-blue-500/20 to-cyan-500/25 rounded-full blur-[100px]"
            animate={{ 
              scale: [1, 1.3, 0.9, 1],
              opacity: [0.3, 0.6, 0.4, 0.3],
              x: [0, 70, -70, 0],
              rotate: [0, 270, 180, 0]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-4xl font-bold mb-6">
            Frequently Asked
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Everything you need to know about IncuBrix
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, categoryIdx) => (
            <div key={categoryIdx}>
              <h2 className="text-2xl font-bold mb-6 text-cyan-400">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIdx) => {
                  const globalIndex = `${categoryIdx}-${faqIdx}`;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <Card
                      key={faqIdx}
                      className="bg-[#151d45] border-cyan-500/20 overflow-hidden hover:border-cyan-500/40 transition-all"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full text-left p-6 flex justify-between items-start gap-4"
                      >
                        <h3 className="font-semibold text-lg text-white pr-4">{faq.q}</h3>
                        <ChevronDown
                          className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-12 px-6 bg-[#0f1535]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg text-gray-400 mb-8">
            Our team is here to help. Reach out anytime.
          </p>
          <a
            href={createPageUrl('NeedHelp')}
            className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold transition-opacity"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}