import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Target,
  Users,
  Lightbulb,
  Heart,
  Sparkles,
  Share2,
  BarChart3,
  Handshake,
  TrendingUp,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Creator-First',
      description: 'Every feature is designed with creators in mind, solving real problems they face daily.'
    },
    {
      icon: Users,
      title: 'Community-Driven',
      description: 'We build based on feedback from real creators building real businesses.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI to empower creators with next-generation tools.'
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'Helping creators build sustainable, long-term businesses, not just viral moments.'
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI Content Studio',
      description: 'Transform one idea into multiple content formats - posts, scripts, newsletters, and podcasts - in minutes.',
    },
    {
      icon: Share2,
      title: 'Multi-Platform Publishing',
      description: 'Publish and schedule content across LinkedIn, YouTube, and more from a single unified dashboard.',
    },
    {
      icon: BarChart3,
      title: 'Unified Analytics',
      description: 'Track performance, engagement, and growth across all platforms with real-time insights.',
    },
    {
      icon: Handshake,
      title: 'Brand Partnership Hub',
      description: 'Get discovered by brands and manage collaborations seamlessly in one place.',
    },
    {
      icon: TrendingUp,
      title: 'Creator Growth Score',
      description: 'Track your consistency, growth, and monetization health with actionable metrics.',
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Once',
      description: 'Input your idea and let AI generate content across multiple formats'
    },
    {
      step: '02',
      title: 'Publish Everywhere',
      description: 'Schedule and distribute to all your platforms from one dashboard'
    },
    {
      step: '03',
      title: 'Track & Grow',
      description: 'Monitor performance and optimize based on real-time analytics'
    },
    {
      step: '04',
      title: 'Monetize',
      description: 'Connect with brands and manage partnerships that match your niche'
    }
  ];

  return (
    <div className="bg-[#0a0e27] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-10 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#0a0e27] to-[#050510]">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.4, 1.2, 1],
              opacity: [0.4, 0.7, 0.5, 0.4],
              x: [0, 120, -60, 0],
              y: [0, -40, 60, 0],
              rotate: [0, 120, 240, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-gradient-to-br from-purple-500/25 to-pink-500/30 rounded-full blur-[130px]"
            animate={{
              scale: [1.3, 1, 1.4, 1.3],
              opacity: [0.6, 0.3, 0.7, 0.6],
              x: [0, -100, 80, 0],
              y: [0, 80, -50, 0],
              rotate: [360, 240, 120, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/20 to-cyan-500/25 rounded-full blur-[110px]"
            animate={{
              scale: [1.1, 1.5, 0.9, 1.1],
              opacity: [0.3, 0.6, 0.4, 0.3],
              x: [0, -70, 70, 0],
              rotate: [0, 180, 360, 0]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.3, 1.1, 1],
              opacity: [0.4, 0.5, 0.6, 0.4],
              x: [0, 60, -60, 0],
              y: [0, -70, 70, 0]
            }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-4xl font-bold mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              Building the Future of
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                Creator Operations
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              IncuBrix is an AI-powered Creator Operating System that helps content creators create, repurpose,
              publish, analyze, and monetize content across platforms like LinkedIn, YouTube, podcasts, and
              newsletters - all from one unified platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to={createPageUrl('Demo')}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all">
                    Schedule Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What is IncuBrix */}
      <section className="py-12 px-6 bg-[#0f1535] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                What is IncuBrix?
              </h2>
              <div className="space-y-4 text-lg text-gray-300">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  IncuBrix was born from a simple observation: creators are the new entrepreneurs,
                  but they're still using fragmented tools built for a different era.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  We're building the operating system for the creator economy - a unified platform
                  that empowers content professionals to create, distribute, and monetize at scale.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  Our vision is simple: every creator should have enterprise-grade tools without
                  enterprise-level complexity or cost.
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-30"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Platform Overview"
                className="rounded-2xl shadow-2xl relative z-10"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 px-6 bg-[#0a0e27] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Complete Creator Platform
            </h2>
            <p className="text-xl text-gray-400">Everything you need to build, grow, and monetize</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/20 p-8 h-full hover:border-cyan-500/60 transition-all relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative z-10">
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/50"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6 bg-[#0f1535]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Your complete creator journey, simplified</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-cyan-500/30 mb-4">{step.step}</div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-12 px-6 bg-[#0a0e27]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-400">IncuBrix is built for content professionals across platforms</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'LinkedIn Creators',
                desc: 'Build thought leadership and professional brand',
                img: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=400&q=80'
              },
              {
                title: 'YouTubers & Podcasters',
                desc: 'Scale video and audio content production',
                img: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400&q=80'
              },
              {
                title: 'Educators & Solopreneurs',
                desc: 'Monetize expertise and grow audiences',
                img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80'
              }
            ].map((audience, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -15 }}
              >
                <Card className="bg-[#151d45] border-cyan-500/20 overflow-hidden hover:border-cyan-500/60 transition-all group relative">
                  <div className="h-48 overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <img
                      src={audience.img}
                      alt={audience.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute -top-6 left-6 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/50 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white mt-4">{audience.title}</h3>
                    <p className="text-gray-400">{audience.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 px-6 bg-[#0f1535]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-400">The principles that guide everything we build</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <Card key={idx} className="bg-[#151d45] border-cyan-500/20 p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Why IncuBrix Exists</h2>
            <p className="text-xl text-gray-400">The creator's dilemma</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Tool Overload', desc: 'Creators juggle 10+ different tools for creation, scheduling, and analytics' },
              { title: 'Time Waste', desc: 'Hours spent on repetitive tasks instead of creating content' },
              { title: 'Unstable Income', desc: 'Difficulty finding brand partnerships and monetizing consistently' }
            ].map((problem, idx) => (
              <Card key={idx} className="bg-[#151d45] border-red-500/20 p-8 text-center">
                <h3 className="text-xl font-semibold mb-3 text-white">{problem.title}</h3>
                <p className="text-gray-400">{problem.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-2xl text-gray-300 mb-8">
              IncuBrix consolidates everything into one intelligent platform, saving creators 85% of their operational time.
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-6 bg-[#0f1535]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Real Results</h2>
            <p className="text-xl text-gray-400">From beta creators using IncuBrix</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-4">85%</div>
              <p className="text-xl text-gray-300">Time Saved</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-4">10x</div>
              <p className="text-xl text-gray-300">Content Output</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-4">3x</div>
              <p className="text-xl text-gray-300">Revenue Growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Built by Creators, for Creators</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our team includes former creators, content strategists, and AI engineers who understand
            the challenges firsthand.
          </p>
          <p className="text-lg text-gray-400">
            We're backed by leading investors in the creator economy and supported by an advisory
            network of successful creators across every platform.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-cyan-950/20 to-[#050510]" />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-96 h-96 mx-auto bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-[150px]" />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Workflow?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join 500+ creators already using IncuBrix to scale their content business
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to={createPageUrl('Demo')}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-12 py-6 text-lg font-semibold rounded-xl shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: [-200, 200] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10 flex items-center">
                    Schedule Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}