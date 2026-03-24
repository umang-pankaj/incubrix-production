import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Rocket, User, Star, ChevronDown, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const featureTooltips = {
  'Upload': 'The number of video/audio files you can upload to the platform each month.',
  'Transcribe': 'Convert your audio or video speech into text automatically.',
  'Repurpose': 'Transform long-form content into engaging short-form clips automatically.',
  'TTS (v3)': 'Text-to-Speech (Version 3). High-quality, ultra-realistic AI voice generation.',
  'Render': 'The total duration of video you can export or process on our cloud servers.',
  'Watermarked exports': 'All exported videos will contain a small Incubrix watermark.',
  'Concurrency': 'The number of tasks (like rendering or transcribing) you can run at the exact same time.'
};

const renderFeatureText = (text) => {
  let matchedKeyword = null;
  for (const keyword of Object.keys(featureTooltips)) {
    if (text.includes(keyword)) {
      matchedKeyword = keyword;
      break;
    }
  }

  if (matchedKeyword) {
    return (
      <span className="flex items-center gap-1.5 flex-wrap">
        <span>{text}</span>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger type="button" className="focus:outline-none">
              <Info className="w-3.5 h-3.5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[220px] text-xs bg-[#0a0e27] border-cyan-500/30 text-gray-300 p-2.5 shadow-2xl rounded-lg z-[100]">
              <p className="font-semibold text-white mb-1.5 pb-1.5 border-b border-white/10">{matchedKeyword}</p>
              <p className="leading-relaxed">{featureTooltips[matchedKeyword]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    );
  }
  return <span>{text}</span>;
};

export default function Pricing() {
  // Monthly billing only as annual is currently unavailable
  const billingCycle = 'monthly';
  const { user } = useAuth();
  const location = useLocation();
  const [highlightPlan, setHighlightPlan] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const highlight = params.get('highlight');
    if (highlight) {
      setHighlightPlan(highlight);
    } else {
      setHighlightPlan(user?.plan || 'Free');
    }
  }, [location, user]);

  const plans = [
    {
      name: 'Free',
      subtitle: '(Weekly Creator)',
      icon: User,
      price: 0,
      description: 'Perfect for exploring our platform',
      features: [
        '10 Upload files/mo',
        '120 mins OR 10 files Transcribe',
        '40 mins Repurpose',
        '20k TTS (v3) characters',
        '10 mins Render (720p)',
        'Watermarked exports',
        '1 Concurrency'
      ],
      cta: 'Get Started for Free',
      popular: false
    },
    {
      name: 'Starter',
      icon: Zap,
      price: 29,
      description: 'Essential tools for growing creators',
      features: [
        '30 Upload files/mo',
        '240 mins Transcribe',
        '120 mins Repurpose',
        '60k TTS (v3) characters',
        '25 mins Render',
        '12 platform publish/mo',
        '2 Concurrency'
      ],
      cta: 'Choose Starter',
      popular: false
    },
    {
      name: 'Creator',
      icon: Star,
      price: 69,
      description: 'Ideal for consistent content creators',
      features: [
        '60 Upload files/mo',
        '600 mins Transcribe',
        '300 mins Repurpose',
        '150k TTS (v3) characters',
        '60 mins Render',
        '30 platform publish/mo',
        '3 Concurrency'
      ],
      cta: 'Choose Creator',
      popular: true
    },
    {
      name: 'Pro',
      icon: Crown,
      price: 129,
      description: 'Advanced features for professional creators',
      features: [
        '120 Upload files/mo',
        '1200 mins Transcribe',
        '700 mins Repurpose',
        '300k TTS (v3) characters',
        '120 mins Render',
        '70 platform publish/mo',
        '5 Concurrency'
      ],
      cta: 'Choose Pro',
      popular: false
    },
    {
      name: 'Business',
      icon: Rocket,
      price: 249,
      description: 'Scale your content production effortlessly',
      features: [
        '300 Upload files/mo',
        '3000 mins Transcribe',
        '1500 mins Repurpose',
        '600k TTS (v3) characters',
        '300 mins Render',
        '200 platform publish/mo',
        '8 Concurrency'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="bg-[#0a0e27] text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-8 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0e27] to-black pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/3 w-[480px] h-[480px] bg-gradient-to-br from-cyan-500/30 to-blue-500/25 rounded-full blur-[120px] pointer-events-none"
            animate={{
              scale: [1, 1.4, 1.2, 1],
              opacity: [0.4, 0.6, 0.5, 0.4],
              x: [0, 90, -50, 0],
              y: [0, -50, 40, 0],
              rotate: [0, 90, 180, 360]
            }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-[520px] h-[520px] bg-gradient-to-br from-purple-500/25 to-indigo-500/30 rounded-full blur-[130px] pointer-events-none"
            animate={{
              scale: [1.3, 1, 1.4, 1.3],
              opacity: [0.5, 0.3, 0.6, 0.5],
              x: [0, -80, 70, 0],
              y: [0, 60, -60, 0],
              rotate: [360, 270, 90, 0]
            }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-full blur-[110px] pointer-events-none"
            animate={{
              scale: [1.1, 1.5, 0.9, 1.1],
              opacity: [0.3, 0.5, 0.4, 0.3],
              rotate: [0, 180, 360, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Choose the plan that's right for your creator business
            </p>

            {/* Only Monthly Billing currently available */}
            <div className="inline-flex items-center gap-4 bg-[#151d45] p-2 rounded-full invisible h-0 pointer-events-none">
              {/* Toggle removed as only monthly is available */}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="plans" className="py-8 px-6 relative z-10 scroll-mt-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan, idx) => {
              const isCurrentPlan = user && plan.name === (user?.plan || 'Free');
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={isCurrentPlan ? {} : {
                    y: -12,
                    scale: 1.02,
                    zIndex: 20,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={isCurrentPlan ? {} : { scale: 0.98 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group h-full"
                >
                  {plan.popular && !isCurrentPlan && (
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[22px] opacity-20 group-hover:opacity-100 transition-opacity blur-[2px] z-0" />
                  )}

                  <Card
                    className={`bg-[#0f1535]/80 backdrop-blur-xl p-6 h-full flex flex-col border transition-all duration-300 relative z-10 ${
                      isCurrentPlan
                        ? 'border-white/20 shadow-none ring-0 scale-[1.00]'
                        : plan.name === highlightPlan
                          ? 'border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.6)] ring-2 ring-cyan-400/50 scale-[1.02]'
                          : plan.popular
                            ? 'border-cyan-500 shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)]'
                            : 'border-white/10 hover:border-cyan-500/50'
                    }`}
                  >
                    {plan.popular && !isCurrentPlan && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-lg shadow-cyan-500/20 z-20">
                        Most Popular
                      </div>
                    )}

                    {isCurrentPlan && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-lg shadow-green-500/20 z-30 ring-2 ring-white/20">
                        Current Plan
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                        className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0"
                      >
                        <plan.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex flex-col min-w-0">
                        <h3 className="text-lg font-bold text-white truncate">{plan.name}</h3>
                        {plan.subtitle && (
                          <span className="text-[9px] text-cyan-400 font-medium uppercase tracking-wider">
                            {plan.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">{plan.description}</p>

                    <div className="mb-6 h-10">
                      {typeof plan.price === 'number' ? (
                        <div className="flex items-baseline gap-1">
                          <motion.span
                            key={billingCycle + plan.price}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-4xl font-bold text-white block"
                          >
                            ${plan.price}
                          </motion.span>
                          <span className="text-gray-400 text-xs">
                            /mo
                          </span>
                        </div>
                      ) : (
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, featureIdx) => (
                        <motion.li
                          key={featureIdx}
                          initial={{ opacity: 0, x: -5 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + featureIdx * 0.05 }}
                          className="flex items-start gap-2 text-xs"
                        >
                          <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 group-hover:text-white transition-colors">
                            {renderFeatureText(feature)}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA — hidden for the user's current plan */}
                    {!isCurrentPlan && (
                      plan.name === 'Business' ? (
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=contact@incubrix.com&su=${encodeURIComponent('Business Plan Enquiry — IncuBrix')}&body=${encodeURIComponent("Hi IncuBrix Team,\n\nI'm interested in the Business Plan and would like to discuss pricing, onboarding, and how it fits our scale.\n\nLooking forward to hearing from you.\n\nBest regards,")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto block"
                        >
                          <Button className="w-full py-4 text-sm font-bold rounded-xl transition-all duration-300 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/50">
                            {plan.cta}
                          </Button>
                        </a>
                      ) : (
                        <Link to={createPageUrl('Signup')} className="mt-auto">
                          <Button
                            className={`w-full py-4 text-sm font-bold rounded-xl transition-all duration-300 ${
                              plan.popular
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.02] active:scale-[0.98] text-white shadow-lg shadow-cyan-500/20'
                                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/50'
                            }`}
                          >
                            {plan.cta}
                          </Button>
                        </Link>
                      )
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 px-6 bg-[#0f1535]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Pricing FAQs</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Do we offer a free trial?',
                a: <>We do not offer free trials for paid plans. However, <span className="text-white font-bold">we offer a Free plan</span> for exploring the platform. Once the limits of the free plan are exhausted, we provide options to upgrade to a paid plan to continue using the services.</>
              },
              {
                q: 'Can I upgrade or downgrade my plan?',
                a: <><span className="text-white font-bold">We support plan upgrades anytime</span> when higher limits or additional capabilities are required. Downgrading plans is currently not supported once a paid plan has been activated.</>
              },
              {
                q: 'Is there a monthly usage limit?',
                a: <>No. There are <span className="text-white font-bold">no monthly limits</span>. We allow the usage limits provided in each plan to be used <span className="text-white font-bold">within a 1-year period</span>, giving flexibility to utilize them based on the workflow.</>
              },
              {
                q: 'What payment methods do we accept?',
                a: <>All payments are processed through <span className="text-white font-bold">Stripe</span>, our secure payment partner. We support all payment methods accepted by Stripe, such as major credit or debit cards depending on the region.</>
              },
              {
                q: 'Do we offer refunds?',
                a: <>We do not offer refunds for completed purchases. Refunds are only processed in cases where there is a <span className="text-white font-bold">technical payment issue</span>, such as duplicate or incorrect deductions. These refunds are handled according to the policies of our payment partner, Stripe.</>
              }
            ].map((faq, idx) => (
              <Card
                key={idx}
                className={`bg-[#151d45] border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer overflow-hidden ${activeFaq === idx ? 'ring-1 ring-cyan-500/30' : ''}`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="p-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{faq.q}</h3>
                  <motion.div
                    animate={{ rotate: activeFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-cyan-400"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: activeFaq === idx ? 'auto' : 0,
                    opacity: activeFaq === idx ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}