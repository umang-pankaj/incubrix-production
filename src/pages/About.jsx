import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScheduleDemoModal from '../components/ScheduleDemoModal';
import BetaSignupModal from '../components/BetaSignupModal';
import { useAuth } from '@/lib/AuthContext';
import {
  Target,
  Users,
  Lightbulb,
  Heart,
  Sparkles,
  Share2,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Repeat as RepurposerIcon,
  Mic,
  Youtube,
  Linkedin,
  Instagram,
  Music,
  Video,
  Briefcase,
  PenTool,
  Monitor,
  Clock,
  Layers,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isBetaOpen, setIsBetaOpen] = React.useState(false);
  const { isAuthenticated, setAuthModalOpen } = useAuth();
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
      description: 'Create Posts, Blogs, Podcasts, and Video Content in minutes.',
    },
    {
      icon: RepurposerIcon,
      title: 'Repurposer',
      description: 'Transform your core content into 10+ formats for different platforms automatically.',
    },
    {
      icon: Share2,
      title: 'Publishing',
      description: 'Publish across 10+ platforms including YouTube, Instagram, Spotify, LinkedIn and others.',
    },
    {
      icon: BarChart3,
      title: 'Unified Analytics',
      description: 'Track performance, engagement, and growth across all platforms with real-time insights.',
      comingSoon: true
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Get Content Insights',
      icon: Lightbulb,
      description: 'Analyze content topics, current trends, and performance to understand what works and what doesn\'t, with clear guidance to help you create content and meet your objectives.'
    },
    {
      step: '02',
      title: 'Create Content',
      icon: Sparkles,
      description: 'Input your idea or content, and generate content across multiple formats (original or AI-enhanced content). Convert text to audio, text to video, and repurpose content across platforms like LinkedIn, Reels, and Newsletters while preserving your unique voice.'
    },
    {
      step: '03',
      title: 'Publish Everywhere',
      icon: Share2,
      description: 'Distribute content across platforms from one place without switching between tools.'
    },
    {
      step: '04',
      title: 'Track & Grow',
      icon: BarChart3,
      description: 'Monitor engagement and reach, compare performance across platforms, and get insights to improve future content and grow your audience.',
      comingSoon: true
    }
  ];

  const creatorTypes = [
    {
      type: 'Thought Leaders',
      icon: Lightbulb,
      color: 'from-amber-400 to-orange-500',
      desc: 'Build authority through consistent expert content',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      comingSoon: false
    },
    {
      type: 'Podcasters',
      icon: Mic,
      color: 'from-purple-400 to-pink-500',
      desc: 'Repurpose episodes into clips, posts & articles',
      img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80',
      comingSoon: false
    },
    {
      type: 'Coaches',
      icon: Target,
      color: 'from-cyan-400 to-blue-500',
      desc: 'Scale your reach without scaling your workload',
      img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
      comingSoon: true
    },
    {
      type: 'Consultants',
      icon: Briefcase,
      color: 'from-emerald-400 to-teal-500',
      desc: 'Build a personal brand while running your business',
      img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=600&q=80',
      comingSoon: true
    },
    {
      type: 'Founders',
      icon: Monitor,
      color: 'from-blue-400 to-indigo-500',
      desc: 'Document your journey and build in public',
      img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80',
      comingSoon: true
    },
    {
      type: 'Content Creators',
      icon: PenTool,
      color: 'from-rose-400 to-red-500',
      desc: 'Create more in less time across every platform',
      img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&q=80',
      comingSoon: true
    }
  ];

  const SpotifyIcon = ({ className }) => (
    <div className={`${className} bg-[#1DB954] rounded-full p-1 flex items-center justify-center`}>
      <svg viewBox="0 0 24 24" fill="black" className="w-full h-full">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    </div>
  );

  const ApplePodcastsIcon = ({ className }) => (
    <div className={`${className} bg-gradient-to-br from-[#A254F2] to-[#8025E6] rounded-xl p-1.5 flex items-center justify-center`}>
      <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.06 14.19c-1.31.25-2.61.12-3.84-.28-.51-.17-1.03-.43-1.51-.76-.84-.57-1.46-1.36-1.81-2.26-.37-.96-.44-2-.22-3.02.26-1.19.86-2.27 1.72-3.11.83-.8 1.84-1.37 2.94-1.63 1.25-.29 2.53-.29 3.77-.02.66.14 1.29.38 1.88.72.63.36 1.18.82 1.63 1.38.74.92 1.17 2.05 1.21 3.23v.97h-6.72c-.08 1.05.34 1.86.99 2.51.7.7 1.61 1.03 2.58.9.89-.12 1.65-.62 2.1-1.38l1.37.58c-.6 1.02-1.56 1.76-2.68 2.02l-.51.15zM7.28 10.9h4.86c0-1.18-.73-2.09-1.92-2.33-.8-.16-1.61-.06-2.28.42-.51.37-.81.99-.81 1.63v.28h.15z"/>
      </svg>
    </div>
  );

  const platforms = [
    { name: 'LinkedIn', icon: Linkedin, color: '#0077B5' },
    { name: 'YouTube', icon: Youtube, color: '#FF0000' },
    { name: 'Instagram', icon: Instagram, color: '#E4405F' },
    { name: 'Spotify', icon: SpotifyIcon, color: '#1DB954' },
    { name: 'Apple Podcasts', icon: ApplePodcastsIcon, color: '#A2AAAD' }
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-4 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10"
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400">About Us</span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              Incu<span className="text-cyan-500">Brix</span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-8 text-gray-300 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Building the Future of{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Creator Operations
              </span>
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              IncuBrix is an AI-powered platform that helps content creators create, manage, repurpose, publish, and analyze content across platforms like LinkedIn, YouTube, Instagram, and 10+ audio and video platforms — all from one unified platform.
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* What is IncuBrix */}
      <section className="py-12 px-6 bg-[#0f1535] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
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
                  IncuBrix was born from a simple observation: creators are the new entrepreneurs, but they are still using fragmented tools built for a different era.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  We are building a unified platform that helps creators turn ideas into content, repurpose it across formats, and grow their audience across multiple platforms.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-cyan-400 font-semibold italic block mb-2">Our vision is simple:</span>
                  To empower every creator with intelligent solutions to transform ideas into impact and passion into lasting success.
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
                src="/assets/images/incubrix-dashboard-laptop.jpg"
                alt="IncuBrix Dashboard"
                className="rounded-2xl shadow-2xl relative z-10"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why IncuBrix Exists */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.08, 0.12, 0.08],
              x: [0, -40, 0],
              y: [0, -60, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(10,14,39,0.5)_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 mb-8 rounded-full bg-red-500/5 border border-red-500/20 backdrop-blur-xl group hover:border-red-500/40 transition-all duration-500"
              style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.1)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-[11px] font-black uppercase tracking-[0.4em]">The Creator's Dilemma</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white leading-[1.05]">
              Why <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-[length:200%_auto] animate-gradient-x">IncuBrix</span> Exists
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Traditional content creation is <span className="text-red-400/80 italic font-medium">fragmented and exhausting.</span> <br className="hidden md:block" /> We're here to unify your creative journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: 'Tool Overload', 
                desc: 'Creators juggle 3+ different tools for creation, scheduling, and analytics, leading to friction and fatigue.',
                icon: Layers,
                color: 'red'
              },
              { 
                title: 'High Effort', 
                desc: 'Manual labor spent on repetitive tasks and repurposing prevents you from focusing on your true creative vision.',
                icon: Clock,
                color: 'cyan'
              },
              { 
                title: 'Limited Reach', 
                desc: 'Inability to scale across platforms and formats means your best ideas never reach their full global potential.',
                icon: Zap,
                color: 'indigo'
              }
            ].map((problem, idx) => {
              const Icon = problem.icon;
              const accentColor = problem.color === 'red' ? 'rgba(239, 68, 68, 0.4)' : problem.color === 'cyan' ? 'rgba(34, 211, 238, 0.4)' : 'rgba(129, 140, 248, 0.4)';
              const glowColor = problem.color === 'red' ? 'rgba(239, 68, 68, 0.1)' : problem.color === 'cyan' ? 'rgba(34, 211, 238, 0.1)' : 'rgba(129, 140, 248, 0.1)';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.2 }}
                  whileHover={{ y: -15, scale: 1.02 }}
                >
                  <div 
                    className="relative h-full bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 text-center group transition-all duration-700 hover:border-white/20"
                    style={{ boxShadow: `0 20px 40px rgba(0,0,0,0.3)` }}
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[3rem]"
                         style={{ background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)` }} 
                    />

                    {/* Icon Container */}
                    <div className="relative mb-10 inline-flex">
                      <div className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-50 transition-opacity" style={{ background: accentColor }} />
                      <div className="relative w-20 h-20 rounded-[1.5rem] bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all duration-500 rotate-3 group-hover:rotate-0">
                        <Icon className="w-10 h-10" style={{ color: problem.color === 'red' ? '#f87171' : problem.color === 'cyan' ? '#22d3ee' : '#818cf8' }} />
                      </div>
                    </div>

                    <h3 className="text-3xl font-black mb-6 text-white tracking-tight group-hover:translate-x-1 transition-transform">{problem.title}</h3>
                    <p className="text-gray-400 text-[17px] leading-relaxed group-hover:text-gray-200 transition-colors font-medium">
                      {problem.desc}
                    </p>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full opacity-20 group-hover:w-24 group-hover:opacity-60 transition-all duration-700"
                         style={{ background: accentColor }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 px-6 relative overflow-hidden bg-[#0a0e27]">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] opacity-40" />
          <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest"
            >
              Core Capabilities
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white leading-[1.1]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ultimate</span> Creator Toolkit
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Everything creators need to create, grow, and scale</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                className="group h-full"
              >
                <div className="relative h-full bg-gradient-to-b from-[#151d45]/40 to-[#0a0f2b]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 hover:border-cyan-500/30 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">

                  {/* Decorative corner glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Coming Soon Badge */}
                  {feature.comingSoon && (
                    <div className="absolute top-6 right-6 z-20">
                      <span className="px-4 py-2 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest shadow-2xl">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  <div className="relative mb-8">
                    {/* Animated icon container */}
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1a234e] to-[#0a0e27] rounded-3xl border border-white/5 flex items-center justify-center relative shadow-xl group-hover:shadow-cyan-500/20 group-hover:scale-110 transition-all duration-500 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      <feature.icon className="w-9 h-9 text-cyan-400 group-hover:text-white transition-colors duration-500 relative z-10" />
                    </div>
                    {/* Outer glow */}
                    <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-10" />
                  </div>

                  <h3 className="text-2xl font-black mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                    {feature.description}
                  </p>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How IncuBrix Works */}
      <section className="py-32 px-6 bg-[#0a0e27] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              The Process
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white">
              Your complete creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">journey</span>, simplified
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Experience a seamless flow from initial inspiration to global distribution</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Animated Connection Line for Desktop */}
            <div className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] z-0">
              <svg width="100%" height="2" viewBox="0 0 1000 2" fill="none" preserveAspectRatio="none">
                <motion.path
                  d="M0 1H1000"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  initial={{ strokeDashoffset: 1000 }}
                  whileInView={{ strokeDashoffset: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="rgba(34, 211, 238, 0)" />
                    <stop offset="0.5" stopColor="rgba(34, 211, 238, 0.6)" />
                    <stop offset="1" stopColor="rgba(34, 211, 238, 0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {howItWorks.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative z-10 group"
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-8">
                    {/* Simplified Background Container */}
                    <motion.div
                      className="w-28 h-28 rounded-3xl bg-[#151d45]/40 backdrop-blur-md border border-white/10 flex items-center justify-center relative shadow-2xl transition-all duration-500 group-hover:border-cyan-500/30 group-hover:bg-[#151d45]/60"
                    >
                      {/* Floating Step Badge - Corner Pill Style */}
                      <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-[#0ea5e9] text-white font-black text-[10px] tracking-tighter shadow-lg shadow-cyan-500/40 z-20">
                        {step.step}
                      </div>

                      <step.icon className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                    </motion.div>

                    {/* Subtle Glow beneath */}
                    <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white tracking-tight group-hover:text-cyan-400 transition-colors text-center">
                    {step.title}
                  </h3>

                  <div className="max-w-[240px] text-center">
                    <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">
                      {step.description}
                    </p>
                  </div>

                  {step.comingSoon && (
                    <div className="mt-5 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/20">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-500/80">Coming Soon</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 px-6 relative overflow-hidden bg-[#0c1233]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-transparent to-[#0a0e27] opacity-60" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
              Expected <span className="text-cyan-400">Results</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                label: 'Time to Create Content',
                value: '<10 Minutes',
                icon: Clock,
                color: 'from-cyan-400 to-blue-500',
                desc: 'From idea to polished content in record time.'
              },
              {
                label: 'Insights & Control of Content',
                value: '5X More',
                icon: BarChart3,
                color: 'from-blue-500 to-indigo-600',
                desc: 'Unprecedented visibility into your creator performance.'
              },
              {
                label: 'Multiple Format & Platform Presence',
                value: '3X Audience',
                icon: Share2,
                color: 'from-indigo-600 to-purple-600',
                desc: 'Scale your reach across every major platform seamlessly.'
              }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                whileHover={{ y: -10 }}
                className="relative group h-full"
              >
                <div className="h-full p-8 rounded-[2.5rem] bg-gradient-to-b from-[#151d45]/40 to-[#0a0e27]/40 border border-white/5 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 group-hover:bg-[#151d45]/60 overflow-hidden">
                  {/* Background Aura */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-700`} />

                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} p-[1px] mb-8`}>
                    <div className="w-full h-full rounded-2xl bg-[#0a0e27] flex items-center justify-center">
                      <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-white`} />
                    </div>
                  </div>

                  <div className={`text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent tracking-tight`}>
                    {stat.value}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {stat.label}
                  </h3>

                  <p className="text-gray-400 leading-relaxed font-medium">
                    {stat.desc}
                  </p>

                  {/* Decorative glow line */}
                  <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${stat.color} transition-all duration-700 group-hover:w-full`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-[#0f1535] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent opacity-50" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
              Built on <span className="text-cyan-400">Principles</span>
            </h2>
            <p className="text-xl text-gray-400">The values that guide every line of code we write</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="bg-[#151d45]/40 backdrop-blur-md border border-cyan-500/10 p-8 rounded-[2rem] text-center h-full hover:bg-[#151d45]/60 hover:border-cyan-500/30 transition-all duration-500 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-white group-hover:text-cyan-400 transition-colors">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Who IncuBrix is built for */}
      <section className="py-24 px-6 bg-[#0a0e27] relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-[0.3em]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              The Community
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
              Built for the <span className="text-cyan-400">Future</span> of Content
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Join the new generation of creators scaling their impact with IncuBrix.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {creatorTypes.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={item.comingSoon ? {} : { y: -10 }}
                className={`${!item.comingSoon ? "group " : ""}relative rounded-[2rem] overflow-hidden ${!item.comingSoon ? "cursor-pointer" : "cursor-default border border-white/5 opacity-90"} h-[320px] sm:h-[400px] lg:h-[450px] shadow-2xl`}
              >
                {/* Background Image with Parallax-like effect */}
                <motion.img
                  src={item.img}
                  alt={item.type}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ${!item.comingSoon ? "group-hover:scale-125" : ""}`}
                />

                {/* Coming Soon Badge */}
                {item.comingSoon && (
                  <div className="absolute top-6 right-6 z-20">
                    <span className="px-4 py-2 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest shadow-2xl">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Multi-layered Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay`} />

                {/* Animated Border Glow */}
                <div className={`absolute inset-0 rounded-[2rem] border border-white/10 ${!item.comingSoon ? "group-hover:border-white/30" : ""} transition-colors duration-500`} />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-2xl ${!item.comingSoon ? "group-hover:shadow-white/20 group-hover:-translate-y-2" : ""} transition-all duration-500`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className={`text-2xl font-black text-white mb-2 tracking-tight ${!item.comingSoon ? "group-hover:text-cyan-400" : ""} transition-colors duration-300`}>
                    {item.type}
                  </h3>

                  <div className="overflow-hidden">
                    <p className="text-gray-300 text-sm leading-relaxed translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 font-medium">
                      {item.desc}
                    </p>
                  </div>

                  <motion.div
                    className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mt-6 rounded-full group-hover:w-full w-0 transition-all duration-500"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Integrations */}
      <section className="py-16 px-6 bg-[#0f1535] border-y border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.3em] uppercase text-cyan-500/60 mb-10"
          >
            Seamlessly Integrated With
          </motion.p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 transition-all duration-700">
            {platforms.map((platform, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-all duration-300 shadow-lg shadow-black/20">
                  <platform.icon className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110" style={{ color: platform.color }} />
                </div>
                <span className="text-sm font-bold text-white tracking-wide">{platform.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#040612]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight text-white leading-tight">
              Join creators already using IncuBrix to <span className="text-cyan-400">scale</span> their content business.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Primary CTA: Get Started Now (Hidden if logged in) */}
              {!isAuthenticated && (
                <div className="relative">
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 blur-lg"
                    animate={{ opacity: [0.4, 0.75, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                  <Button
                    onClick={() => setAuthModalOpen(true)}
                    className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 text-white px-10 py-6 rounded-full text-lg font-bold shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
                  >
                    Get Started Now
                  </Button>
                </div>
              )}
              {/* Secondary CTA: Book a Demo */}
              <Button
                onClick={() => {
                  if (window.location.pathname === '/') {
                    document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#book-demo';
                  }
                }}
                variant="ghost"
                className="text-cyan-300 hover:text-white hover:bg-cyan-500/15 px-8 py-6 rounded-full text-base font-semibold border border-cyan-400/30 hover:border-cyan-400/60 transition-all"
              >
                Book a Demo <ArrowRight className="ml-2 w-5 h-5 inline" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ScheduleDemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <BetaSignupModal
        isOpen={isBetaOpen}
        onClose={() => setIsBetaOpen(false)}
        onSuccess={() => { }}
      />
    </div>
  );
}