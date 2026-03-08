import React from 'react';
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
  Video
} from 'lucide-react';
import { motion } from 'framer-motion';
import ScheduleDemoModal from '../components/ScheduleDemoModal';

export default function HowItWorks() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const workflow = [
    {
      step: 1,
      icon: Sparkles,
      title: 'Create with AI',
      description: 'Input your idea or topic, and our AI content studio generates multiple formats - LinkedIn posts, YouTube scripts, newsletter drafts, and podcast outlines.',
      features: [
        'AI learns your unique voice and style',
        'Generate 5-10 pieces from one idea',
        'Edit and refine with intuitive controls'
      ],
      gradient: 'from-cyan-500 to-blue-500',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80'
    },
    {
      step: 2,
      icon: Calendar,
      title: 'Publish Everywhere',
      description: 'Connect all your platforms and schedule content from a single dashboard. No more logging into multiple accounts or copy-pasting between tools.',
      features: [
        'One-click cross-platform publishing',
        'Smart scheduling based on audience activity',
        'Preview how content looks on each platform'
      ],
      gradient: 'from-blue-500 to-indigo-500',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80'
    },
    {
      step: 3,
      icon: BarChart3,
      title: 'Track Performance',
      description: 'See all your metrics in one place - engagement, reach, growth trends, and audience insights across every platform you are on.',
      features: [
        'Unified analytics dashboard',
        'Cross-platform performance comparison',
        'Actionable insights and recommendations'
      ],
      gradient: 'from-indigo-500 to-purple-500',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'
    },
    {
      step: 4,
      icon: DollarSign,
      title: 'Monetize & Grow',
      description: 'Connect with brands looking for creators in your niche. Manage partnerships, track deliverables, and grow your creator business.',
      features: [
        'Get discovered by relevant brands',
        'Manage collaboration agreements',
        'Track your Creator Growth Score'
      ],
      gradient: 'from-purple-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80'
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
            From idea to income - see how creators are transforming their workflow with IncuBrix
          </motion.p>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="py-12 px-6 bg-[#0a0e27] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto space-y-32 relative z-10">
          {workflow.map((item, idx) => (
            <motion.div
              key={idx}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Content */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <motion.div
                      className="text-sm text-cyan-400 font-semibold"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      STEP {item.step}
                    </motion.div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      {item.title}
                    </h2>
                  </div>
                </div>

                <p className="text-lg text-gray-300 mb-6">{item.description}</p>

                <ul className="space-y-3">
                  {item.features.map((feature, featureIdx) => (
                    <motion.li
                      key={featureIdx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + featureIdx * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Visual with Image */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative group">
                  <motion.div
                    className={`absolute -inset-4 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50`}
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <Card className="bg-gradient-to-br from-[#151d45] to-[#0f1535] border-cyan-500/30 overflow-hidden relative z-10 group-hover:border-cyan-500/60 transition-all">
                    <div className="aspect-video relative overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151d45] via-transparent to-transparent" />
                      <motion.div
                        className={`absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </motion.div>
          ))}
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
              Why Creators Choose IncuBrix
            </h2>
            <p className="text-xl text-gray-400">Real results from real creators</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                stat: '85%',
                label: 'Time Saved',
                description: 'Spend less time on tools, more time creating',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: ArrowRight,
                stat: '10x',
                label: 'Content Output',
                description: 'Create more content without burning out',
                gradient: 'from-blue-500 to-indigo-500'
              },
              {
                icon: DollarSign,
                stat: '3x',
                label: 'Monetization',
                description: 'Increase revenue through partnerships',
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
              See IncuBrix in action and discover how it can transform your creator workflow
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