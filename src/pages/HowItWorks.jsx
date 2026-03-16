import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  Calendar,
  BarChart3,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Zap,
  Video,
  Lightbulb,
  Mic,
  Clock,
  Share2
} from 'lucide-react';
import { motion, useScroll } from 'framer-motion';
import ScheduleDemoModal from '../components/ScheduleDemoModal';

export default function HowItWorks() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = scrollYProgress;

  const steps = [
    {
      step: 1,
      icon: Lightbulb,
      title: 'Get Content Insights',
      description: 'Analyse content topics, current trends, and performance to understand what works and what doesn\'t, providing clear guidance on what to create next based on your goals (powered by our Scribe module).',
      features: [
        'Analyse trending topics and audience interests',
        'Understand which content performs best',
        'Get recommendations on what to create next'
      ],
      gradient: 'from-cyan-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80'
    },
    {
      step: 2,
      icon: Mic,
      title: 'Create Content',
      description: 'Input your idea or existing content and transform it into multiple formats (original or AI-enhanced) while preserving your unique voice and perspective.',
      features: [
        'Text to Audio (scripts to podcasts or voice content)',
        'Text to Video (scripts to short or long-form videos)',
        'Audio/Video to Text (transcripts, posts, newsletters)',
        'Multi-format repurposing (LinkedIn, Reels, Newsletter)'
      ],
      gradient: 'from-blue-500 to-indigo-500',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80'
    },
    {
      step: 3,
      icon: Calendar,
      title: 'Publish Everywhere',
      description: 'Distribute content across platforms from one place without switching between tools.',
      features: [
        'Publish across multiple platforms',
        'Schedule content at the right time (Soon to be available)',
        'Preview how content appears before publishing'
      ],
      gradient: 'from-indigo-500 to-purple-500',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80'
    },
    {
      step: 4,
      icon: BarChart3,
      title: 'Track & Grow',
      description: 'Monitor your engagement and reach across platforms to understand your audience and get actionable insights to grow your impact.',
      features: [
        'Monitor engagement and reach',
        'Compare performance across platforms',
        'Get insights to improve future content'
      ],
      gradient: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      comingSoon: true
    }
  ];

  return (
    <div className="bg-[#0a0e27] text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-12 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#0a0e27] to-[#050510]">
          <motion.div
            className="absolute top-1/3 left-1/3 w-[480px] h-[480px] bg-gradient-to-br from-cyan-500/30 to-blue-500/25 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.3, 1.1, 1],
              opacity: [0.4, 0.6, 0.5, 0.4],
              x: [0, 100, -50, 0],
              y: [0, -60, 40, 0],
              rotate: [0, 120, 240, 360]
            }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-[520px] h-[520px] bg-gradient-to-br from-purple-500/25 to-pink-500/28 rounded-full blur-[130px]"
            animate={{
              scale: [1.3, 1, 1.4, 1.3],
              opacity: [0.6, 0.3, 0.7, 0.6],
              x: [0, -90, 70, 0],
              y: [0, 80, -50, 0],
              rotate: [360, 180, 90, 0]
            }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/2 w-[410px] h-[410px] bg-gradient-to-br from-indigo-500/22 to-teal-500/25 rounded-full blur-[105px]"
            animate={{
              scale: [1, 1.4, 0.9, 1],
              opacity: [0.3, 0.5, 0.4, 0.3],
              x: [0, 70, -70, 0],
              rotate: [0, 270, 180, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-4xl md:text-4xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
              How IncuBrix Works
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            From idea to impact — see how creators turn ideas into content, reach, and growth with IncuBrix.
          </motion.p>
        </div>
      </section>

      {/* Process Steps Timeline */}
      <section className="py-16 px-6 bg-[#0a0e27] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div ref={containerRef} className="max-w-6xl mx-auto relative z-10 py-12">
          {/* Vertical Center Line Background */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-800/40 transform -translate-x-1/2" />
          
          {/* Animated Vertical Center Line Foreground */}
          <motion.div 
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-purple-500 transform -translate-x-1/2 origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-24 md:space-y-32">
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                className={`relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 ${item.comingSoon ? 'opacity-70 grayscale-[0.5] pointer-events-none select-none' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {/* Center Node Badge Animated (lg only) */}
                <motion.div 
                  className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-20 w-14 h-14 rounded-full border-4 items-center justify-center transition-colors duration-500"
                  initial={{ backgroundColor: '#1e293b', borderColor: '#0f172a', color: '#64748b' }}
                  whileInView={{ backgroundColor: '#4f46e5', borderColor: '#818cf8', color: '#ffffff', boxShadow: '0 0 20px rgba(79,70,229,0.6)' }}
                  viewport={{ once: false, margin: "100% 0px -50% 0px" }}
                >
                  <span className="text-xl font-bold">{item.step}</span>
                </motion.div>

                {/* Content Block */}
                <motion.div
                  className={`flex-1 w-full lg:w-1/2 flex flex-col ${idx % 2 === 0 ? 'lg:items-end lg:text-right lg:pr-12 order-2 lg:order-1' : 'lg:items-start lg:text-left lg:pl-12 order-2 lg:order-2'}`}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className={`flex items-center gap-4 mb-6 ${idx % 2 === 0 ? 'lg:flex-row-reverse' : 'flex-row'}`}>
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 flex-shrink-0`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    {/* Mobile Step Badge (visible md and down) */}
                    <div className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                      {item.step}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {item.title}
                      </h2>
                      {item.comingSoon && (
                        <span className="px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {idx % 2 === 0 ? (
                    <div className="w-full lg:w-3/4 mx-0 lg:ml-auto h-px bg-gradient-to-l from-cyan-500/50 to-transparent mb-6" />
                  ) : (
                    <div className="w-full lg:w-3/4 mr-auto h-px bg-gradient-to-r from-cyan-500/50 to-transparent mb-6" />
                  )}

                  <p className="text-lg text-gray-400 mb-8 max-w-lg">{item.description}</p>

                  <ul className={`space-y-4 mb-8 max-w-lg ${idx % 2 === 0 ? 'lg:mr-auto lg:ml-auto lg:text-right' : ''}`}>
                    {item.features.map((feature, featureIdx) => (
                      <motion.li
                        key={featureIdx}
                        className={`flex items-center gap-3 ${idx % 2 === 0 ? 'lg:flex-row-reverse' : 'flex-row'}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + featureIdx * 0.1 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        </div>
                        <span className="text-gray-300 font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <a 
                    href="#demo"
                    className="group inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors text-lg"
                  >
                    See how it works 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>

                {/* Visual Block */}
                <motion.div
                  className={`flex-1 w-full lg:w-1/2 ${idx % 2 === 0 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="relative group mx-auto max-w-xl">
                    <motion.div
                      className={`absolute -inset-4 bg-gradient-to-br ${item.gradient} rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40`}
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <Card className="bg-[#151d45]/80 backdrop-blur-sm border-cyan-500/20 overflow-hidden relative z-10 group-hover:border-cyan-500/50 transition-all rounded-[1.5rem] p-3 shadow-2xl">
                      <div className="aspect-[4/3] lg:aspect-[16/10] relative overflow-hidden rounded-xl border border-white/5">
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#151d45]/80 via-[#151d45]/20 to-transparent" />
                      </div>
                    </Card>
                  </div>
                </motion.div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Overview */}
      <section className="py-12 px-6 bg-[#0a0e27] relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-96 h-96 mx-auto bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-[120px]" />
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Expected Results
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                stat: '<10 Minutes',
                label: 'Time to Create Content',
                description: 'From idea to polished content in record time.',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: BarChart3,
                stat: '5X More',
                label: 'Insights & Control of Content',
                description: 'Unprecedented visibility into your creator performance.',
                gradient: 'from-blue-500 to-indigo-500'
              },
              {
                icon: Share2,
                stat: '3x Audience',
                label: 'Multiple Format & Platform Presence',
                description: 'Scale your reach across every major platform seamlessly.',
                gradient: 'from-indigo-500 to-purple-500'
              }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/20 p-8 text-center hover:border-cyan-500/60 transition-all relative overflow-hidden group h-full">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />
                  <motion.div
                    className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <benefit.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <motion.div
                    className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, type: "spring" }}
                  >
                    {benefit.stat}
                  </motion.div>
                  <div className="text-xl font-semibold mb-2 text-white">{benefit.label}</div>
                  <p className="text-gray-400">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-cyan-950/20 to-[#050510]" />
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-[150px]" />
        </motion.div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-4xl font-bold mb-6">
              Ready to See It in Action?
            </h2>
            <p className="text-xl text-gray-400">
              See IncuBrix in action and discover how it helps creators turn ideas into consistent content and long-term growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <Card className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/20 p-8 hover:border-cyan-500/60 transition-all h-full relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Video className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">Watch Pre-recorded Demo</h3>
                  <p className="text-gray-400 mb-6">
                    Get a quick overview of the platform at your own pace
                  </p>
                  <Button
                    disabled
                    className="w-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 py-6 text-lg font-semibold rounded-xl cursor-not-allowed opacity-70"
                  >
                    Coming Soon
                  </Button>
                  <p className="text-[10px] text-center mt-3 text-cyan-500/40 uppercase tracking-[0.2em] font-bold">
                    Official demo coming soon
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <Card className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/20 p-8 hover:border-cyan-500/60 transition-all h-full relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/50"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Calendar className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">Schedule a Live Demo</h3>
                  <p className="text-gray-400 mb-6">
                    Book a personalized 30-minute session with our team
                  </p>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white py-6 text-lg font-semibold rounded-xl shadow-lg shadow-cyan-500/30"
                  >
                    Schedule a Demo
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>

        </div>
      </section>

      <ScheduleDemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}