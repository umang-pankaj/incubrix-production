import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Sparkles,
  Video,
  Mic,
  FileText,
  Share2,
  Scissors,
  Pencil,
  Zap,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageSquare,
  Lightbulb,
  Target,
  Briefcase,
  Monitor,
  PenTool
} from 'lucide-react';
import { motion } from 'framer-motion';
import ScheduleDemoModal from '../components/ScheduleDemoModal';
import BetaSignupModal from '../components/BetaSignupModal';
import { useAuth } from '@/lib/AuthContext';
import { toast } from 'sonner';

const SIDEBAR_TOOLS = [
  { icon: Mic, title: 'Text to Speech', desc: 'Turn any written content into natural, human-like AI voices. Perfect for podcasts, videos, and voiceovers.', accent: '#06b6d4' },
  { icon: Video, title: 'Speech to Video', desc: 'Automatically generate engaging video presentations from audio or script files in minutes.', accent: '#3b82f6' },
  { icon: Pencil, title: 'Scribe', desc: 'Your AI editorial brain — analyses your content portfolio, surfaces missing topics, and auto-plans your next 2 weeks of content.', accent: '#a78bfa' },
  { icon: Scissors, title: 'Content Repurposer', desc: 'Extract the most viral and engaging moments from long-form content with AI precision.', accent: '#8b5cf6' },
  { icon: Share2, title: 'Publisher', desc: 'Hit publish once — and your content goes live across every social media platform simultaneously. No switching tabs, no copy-pasting. One click, everywhere.', accent: '#06b6d4' },
];

const creatorTypes = [
  {
    type: 'Thought Leaders',
    icon: Lightbulb,
    color: 'from-amber-400 to-orange-500',
    desc: 'Build authority through consistent expert content',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80'
  },
  {
    type: 'Podcasters',
    icon: Mic,
    color: 'from-purple-400 to-pink-500',
    desc: 'Repurpose episodes into clips, posts & articles',
    img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80'
  },
  {
    type: 'Coaches',
    icon: Target,
    color: 'from-cyan-400 to-blue-500',
    desc: 'Scale your reach without scaling your workload',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80'
  },
  {
    type: 'Consultants',
    icon: Briefcase,
    color: 'from-emerald-400 to-teal-500',
    desc: 'Build a personal brand while running your business',
    img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=600&q=80'
  },
  {
    type: 'Founders',
    icon: Monitor,
    color: 'from-blue-400 to-indigo-500',
    desc: 'Document your journey and build in public',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80'
  },
  {
    type: 'Content Creators',
    icon: PenTool,
    color: 'from-rose-400 to-red-500',
    desc: 'Create more in less time across every platform',
    img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&q=80'
  }
];

function SidebarToolsPanel({ onExploreTool }) {
  const [activeTool, setActiveTool] = React.useState(0);
  const tool = SIDEBAR_TOOLS[activeTool];
  const { theme } = useAuth();

  const toolFeatures = {
    'Text to Speech': ['Natural AI voices', 'Multiple language support', 'Studio-quality output'],
    'Speech to Video': ['Auto video generation', 'Sync audio to visuals', 'One-click export'],
    'Scribe': ['Content Intelligence', 'Portfolio Indexer', 'AI Content Planner'],
    'Content Repurposer': ['Clip viral moments', 'AI-powered editing', 'Multi-format export'],
    'Publisher': ['One-click multi-platform publish', 'Smart peak-time scheduling', 'Unified analytics dashboard'],
  };

  return (
    <section className={`py-14 px-6 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#07091c]' : 'bg-[#f8fafc]'}`}>
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[280px] h-[280px] bg-cyan-500/15 rounded-full blur-[90px]" />
        <div className="absolute bottom-0 left-1/2 w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-[80px]" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{ background: ['#06b6d4', '#a78bfa', '#3b82f6', '#ec4899', '#8b5cf6', '#06b6d4'][i], left: `${15 + i * 13}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [-8, 8, -8], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full mb-4 text-[11px] font-bold tracking-[0.2em] uppercase relative"
            style={{
              background: 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(6,182,212,0.08))',
              boxShadow: 'inset 0 0 0 1px rgba(167,139,250,0.3)',
              color: '#c4b5fd',
              letterSpacing: '0.18em',
            }}>
            Platform Tools
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>
            Everything you need to create
          </h2>
          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Five powerful tools. One seamless creative process.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-5 items-stretch"
        >
          {/* Sidebar Panel */}
          <div className="w-full lg:w-[185px] shrink-0 rounded-2xl p-2 flex lg:flex-col lg:justify-around gap-1 overflow-x-auto lg:overflow-visible"
            style={{ background: 'linear-gradient(160deg,#0f1428,#111830)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
            {SIDEBAR_TOOLS.map((t, idx) => {
              const Icon = t.icon;
              const isActive = activeTool === idx;
              return (
                <motion.button
                  key={idx}
                  onClick={() => setActiveTool(idx)}
                  whileHover={{ scale: 1.03, x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl transition-all duration-200 min-w-[72px] lg:min-w-0 w-full`}
                  style={isActive
                    ? { background: `linear-gradient(135deg, ${t.accent}18, ${t.accent}08)`, border: `1px solid ${t.accent}30` }
                    : { border: '1px solid transparent' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isActive ? `${t.accent}22` : 'rgba(255,255,255,0.04)',
                      border: isActive ? `1.5px solid ${t.accent}55` : '1.5px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: isActive ? t.accent : '#4b5563' }} />
                  </div>
                  <span className="text-[9px] font-semibold leading-tight text-center" style={{ color: isActive ? t.accent : '#6b7280' }}>
                    {t.title}
                  </span>
                  {/* Badge removed for default state */}
                </motion.button>
              );
            })}
          </div>

          {/* Tool Detail Card */}
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, x: 18, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex-1 rounded-2xl overflow-hidden relative flex flex-col justify-between"
            style={{
              background: 'linear-gradient(135deg,#0f1428 60%,#111830)',
              border: `1px solid rgba(255,255,255,0.08)`,
              boxShadow: `0 8px 40px rgba(0,0,0,0.5)`,
              minHeight: 260,
              padding: '2rem',
            }}
          >
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '32px 32px' }}
            />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                {/* Icon + title row */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${tool.accent}22`, border: `1.5px solid ${tool.accent}45` }}
                  >
                    {React.createElement(tool.icon, { className: 'w-7 h-7', style: { color: tool.accent } })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white leading-tight">{tool.title}</h3>
                    {tool.badge && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full"
                        style={{ background: `${tool.accent}20`, color: tool.accent, border: `1px solid ${tool.accent}35` }}>
                        {tool.badge} — Flagship Module
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-5">{tool.desc}</p>

                {/* Feature bullets */}
                <div className="flex flex-wrap gap-2">
                  {(toolFeatures[tool.title] || []).map((f, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md"
                      style={{
                        background: `${tool.accent}18`,
                        color: tool.accent,
                        letterSpacing: '0.01em',
                      }}
                    >
                      <span style={{ color: tool.accent, opacity: 0.7 }}>›</span>
                      {f}
                    </motion.span>
                  ))}
                </div>

                {/* Animated Workflow — Text to Speech */}
                {tool.title === 'Text to Speech' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-5"
                  >
                    {/* Workflow row */}
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: 'rgba(6,182,212,0.6)' }}>Process Progress</p>
                    <div className="flex items-center w-full mb-5">
                      {[
                        { Icon: FileText, label: 'Document', sub: 'Input source', color: '#06b6d4' },
                        { Icon: Zap, label: 'Script', sub: 'AI processing', color: '#3b82f6' },
                        { Icon: Mic, label: 'Audio', sub: 'Natural voice', color: '#a78bfa' },
                      ].map((step, i) => (
                        <React.Fragment key={i}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                            className="flex flex-col items-center gap-1.5 flex-shrink-0"
                            style={{ minWidth: 72 }}
                          >
                            <motion.div
                              animate={
                                i === 0 ? {
                                  boxShadow: [
                                    `0 0 20px ${step.color}66`,
                                    `0 0 0px ${step.color}00`,
                                    `0 0 0px ${step.color}00`,
                                    `0 0 20px ${step.color}66`
                                  ]
                                } : i === 1 ? {
                                  boxShadow: [
                                    `0 0 0px ${step.color}00`,
                                    `0 0 0px ${step.color}00`,
                                    `0 0 20px ${step.color}88`,
                                    `0 0 8px ${step.color}44`,
                                    `0 0 20px ${step.color}88`
                                  ]
                                } : {
                                  boxShadow: [
                                    `0 0 0px ${step.color}00`,
                                    `0 0 20px ${step.color}88`,
                                    `0 0 0px ${step.color}00`
                                  ]
                                }
                              }
                              transition={
                                i === 0 ? {
                                  duration: 4.0,
                                  repeat: Infinity,
                                  times: [0, 0.15, 0.95, 1],
                                  ease: "easeInOut"
                                } : i === 1 ? {
                                  duration: 4.0,
                                  repeat: Infinity,
                                  times: [0, 0.45, 0.5, 0.75, 1],
                                  ease: "easeInOut"
                                } : {
                                  duration: 4.0,
                                  repeat: Infinity,
                                  times: [0, 0.95, 1],
                                  ease: "easeInOut"
                                }
                              }
                              className="w-11 h-11 rounded-xl flex items-center justify-center"
                              style={{ background: `${step.color}15`, border: `1.5px solid ${step.color}40`, position: 'relative' }}
                            >
                              <step.Icon className="w-5 h-5" style={{ color: step.color }} />
                            </motion.div>
                            <span className="text-[10px] font-semibold text-white text-center leading-tight">{step.label}</span>
                            <span className="text-[9px] text-gray-500 text-center leading-tight">{step.sub}</span>
                          </motion.div>
                          {i < 2 && (
                            <div className="flex-1 flex items-center justify-center relative h-11 mx-1 overflow-hidden">
                              {/* Connector Line */}
                              <div className="w-full h-px relative" style={{ background: 'rgba(99,102,241,0.2)' }}>
                                <div
                                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rotate-45 border-t border-r"
                                  style={{ borderColor: i === 0 ? '#06b6d4' : '#3b82f6', opacity: 0.6 }}
                                />
                              </div>

                              {/* Flowing Elements */}
                              {i === 0 ? (
                                <motion.div
                                  className="absolute flex items-center justify-center -translate-y-1/2"
                                  style={{ top: '50%' }}
                                  animate={{
                                    left: ['-20%', '100%'],
                                    opacity: [0, 1, 1, 0],
                                    scale: [0.9, 1.2, 1.2, 0.9]
                                  }}
                                  transition={{
                                    duration: 2.0,
                                    repeat: Infinity,
                                    repeatDelay: 2.0,
                                    ease: "easeInOut",
                                    times: [0, 0.1, 0.95, 1]
                                  }}
                                >
                                  <FileText className="w-5 h-5" style={{ color: '#06b6d4', filter: 'drop-shadow(0 0 4px #06b6d4)' }} />
                                </motion.div>
                              ) : (
                                <motion.div
                                  className="absolute flex items-center justify-center -translate-y-1/2"
                                  style={{ top: '50%' }}
                                  animate={{
                                    left: ['0%', '115%'],
                                    opacity: [0, 1, 1, 0],
                                    scale: [0.9, 1.2, 1.2, 0.9],
                                  }}
                                  transition={{
                                    delay: 2.0,
                                    duration: 2.0,
                                    repeat: Infinity,
                                    repeatDelay: 2.0,
                                    ease: "easeInOut",
                                    times: [0, 0.05, 0.9, 1]
                                  }}
                                >
                                  <Mic className="w-5 h-5" style={{ color: '#3b82f6', filter: 'drop-shadow(0 0 5px #3b82f6)' }} />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Capabilities */}
                    <div className="mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(6,182,212,0.5)' }}>Capabilities</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: '100+ Ultra-realistic voices', dot: '#3b82f6' },
                          { label: 'Podcast-quality audio', dot: '#6366f1' },
                          { label: 'Multi-language support', dot: '#38bdf8' },
                          { label: 'Instant Voice Hub sync', dot: '#06b6d4' },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.1)',
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.dot }} />
                            <span className="text-xs text-gray-300 font-medium whitespace-nowrap">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Animated Workflow — Content Repurposer */}
                {tool.title === 'Content Repurposer' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-5"
                  >
                    {/* Workflow row */}
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: 'rgba(6,182,212,0.6)' }}>Process Flow</p>
                    <div className="flex items-center w-full mb-5">
                      {[
                        { Icon: Video, label: 'Source', sub: 'Long video', color: '#8b5cf6' },
                        { Icon: Scissors, label: 'Configure', sub: 'Set clips', color: '#a78bfa' },
                        { Icon: Sparkles, label: 'Clips', sub: 'AI Viral extraction', color: '#06b6d4' },
                      ].map((step, i) => (
                        <React.Fragment key={i}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                            className="flex flex-col items-center gap-1.5 flex-shrink-0"
                            style={{ minWidth: 72 }}
                          >
                            <motion.div
                              animate={
                                i === 0 ? {
                                  boxShadow: [
                                    `0 0 20px ${step.color}66`,
                                    `0 0 0px ${step.color}00`,
                                    `0 0 0px ${step.color}00`,
                                    `0 0 20px ${step.color}66`
                                  ]
                                } : i === 1 ? {
                                  boxShadow: [
                                    `0 0 0px ${step.color}00`,
                                    `0 0 0px ${step.color}00`,
                                    `0 0 20px ${step.color}88`,
                                    `0 0 8px ${step.color}44`,
                                    `0 0 20px ${step.color}88`
                                  ]
                                } : {
                                  boxShadow: [
                                    `0 0 0px ${step.color}00`,
                                    `0 0 20px ${step.color}88`,
                                    `0 0 0px ${step.color}00`
                                  ]
                                }
                              }
                              transition={
                                i === 0 ? {
                                  duration: 4.0,
                                  repeat: Infinity,
                                  times: [0, 0.15, 0.95, 1],
                                  ease: "easeInOut"
                                } : i === 1 ? {
                                  duration: 4.0,
                                  repeat: Infinity,
                                  times: [0, 0.45, 0.5, 0.75, 1],
                                  ease: "easeInOut"
                                } : {
                                  duration: 4.0,
                                  repeat: Infinity,
                                  times: [0, 0.95, 1],
                                  ease: "easeInOut"
                                }
                              }
                              className="w-11 h-11 rounded-xl flex items-center justify-center"
                              style={{ background: `${step.color}15`, border: `1.5px solid ${step.color}40`, position: 'relative' }}
                            >
                              <step.Icon className="w-5 h-5" style={{ color: step.color }} />
                            </motion.div>
                            <span className="text-[10px] font-semibold text-white text-center leading-tight">{step.label}</span>
                            <span className="text-[9px] text-gray-500 text-center leading-tight">{step.sub}</span>
                          </motion.div>
                          {i < 2 && (
                            <div className="flex-1 flex items-center justify-center relative h-11 mx-1 overflow-hidden">
                              {/* Connector Line */}
                              <div className="w-full h-px relative" style={{ background: 'rgba(99,102,241,0.2)' }}>
                                <div
                                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rotate-45 border-t border-r"
                                  style={{ borderColor: i === 0 ? '#8b5cf6' : '#a78bfa', opacity: 0.6 }}
                                />
                              </div>

                              {/* Flowing Elements */}
                              {i === 0 ? (
                                <motion.div
                                  className="absolute flex items-center justify-center -translate-y-1/2"
                                  style={{ top: '50%' }}
                                  animate={{
                                    left: ['-20%', '100%'],
                                    opacity: [0, 1, 1, 0],
                                    scale: [0.9, 1.2, 1.2, 0.9]
                                  }}
                                  transition={{
                                    duration: 2.0,
                                    repeat: Infinity,
                                    repeatDelay: 2.0,
                                    ease: "easeInOut",
                                    times: [0, 0.1, 0.95, 1]
                                  }}
                                >
                                  <Video className="w-5 h-5" style={{ color: '#8b5cf6', filter: 'drop-shadow(0 0 4px #8b5cf6)' }} />
                                </motion.div>
                              ) : (
                                <motion.div
                                  className="absolute flex items-center justify-center -translate-y-1/2"
                                  style={{ top: '50%' }}
                                  animate={{
                                    left: ['0%', '115%'],
                                    opacity: [0, 1, 1, 0],
                                    scale: [0.9, 1.2, 1.2, 0.9],
                                  }}
                                  transition={{
                                    delay: 2.0,
                                    duration: 2.0,
                                    repeat: Infinity,
                                    repeatDelay: 2.0,
                                    ease: "easeInOut",
                                    times: [0, 0.05, 0.9, 1]
                                  }}
                                >
                                  <Scissors className="w-5 h-5" style={{ color: '#a78bfa', filter: 'drop-shadow(0 0 5px #a78bfa)' }} />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Capabilities */}
                    <div className="mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(6,182,212,0.5)' }}>Capabilities</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Viral Moment Detection', dot: '#8b5cf6' },
                          { label: 'Auto-Scaling (9:16)', dot: '#a78bfa' },
                          { label: 'AI Smart Captions', dot: '#06b6d4' },
                          { label: 'Multi-Format Export', dot: '#38bdf8' },
                          { label: 'Social Platform Sync', dot: '#8b5cf6' },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.1)',
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.dot }} />
                            <span className="text-xs text-gray-300 font-medium whitespace-nowrap">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Animated Workflow — Publisher */}
                {tool.title === 'Publisher' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-5"
                  >
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: 'rgba(6,182,212,0.6)' }}>One-Click Distribution</p>

                    <div className="flex items-center justify-between gap-2 mb-8">
                      {/* Step 1: Connect */}
                      <div className="flex flex-col items-center gap-2">
                        <motion.div
                          animate={{ boxShadow: ['0 0 0px #06b6d400', '0 0 15px #06b6d466', '0 0 0px #06b6d400'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#06b6d415] border border-[#06b6d440]"
                        >
                          <Share2 className="w-5 h-5 text-[#06b6d4]" />
                        </motion.div>
                        <span className="text-[9px] font-bold text-gray-400">Connect</span>
                      </div>

                      {/* Connector 1 */}
                      <div className="flex-1 h-px bg-gray-800 relative">
                        <motion.div
                          animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                        />
                      </div>

                      {/* Step 2: AI Captions */}
                      <div className="flex flex-col items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#a78bfa15] border border-[#a78bfa40]"
                        >
                          <div className="relative">
                            <MessageSquare className="w-5 h-5 text-[#a78bfa]" />
                            <Sparkles className="w-2.5 h-2.5 text-[#a78bfa] absolute -top-1 -right-1" />
                          </div>
                        </motion.div>
                        <span className="text-[9px] font-bold text-gray-400">Captions</span>
                      </div>

                      {/* Connector 2 */}
                      <div className="flex-1 h-px bg-gray-800 relative">
                        <motion.div
                          animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.75, ease: "linear" }}
                          className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-purple-400 rounded-full"
                        />
                      </div>

                      {/* Step 3: Publish Button (Central Action) */}
                      <div className="relative">
                        <motion.div
                          animate={{
                            boxShadow: ['0 0 0px #06e2ff00', '0 0 30px #06e2ff88', '0 0 0px #06e2ff00'],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                          className="w-12 h-12 rounded-full flex items-center justify-center bg-[#06e2ff20] border-2 border-[#06e2ff60] cursor-default"
                        >
                          <Zap className="w-6 h-6 text-[#06e2ff] fill-[#06e2ff20]" />
                        </motion.div>

                        {/* Branded Icons Bursting Out */}
                        {[
                          { Icon: Youtube, color: '#FF0000', angle: -60, delay: 0 },
                          { Icon: Instagram, color: '#E4405F', angle: -20, delay: 0.1 },
                          { Icon: Linkedin, color: '#0077B5', angle: 20, delay: 0.2 },
                          { Icon: Twitter, color: '#1DA1F2', angle: 60, delay: 0.3 }
                        ].map((social, si) => (
                          <motion.div
                            key={si}
                            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                            animate={{
                              opacity: [0, 1, 1, 0],
                              scale: [0, 1.2, 1, 0],
                              x: [0, Math.cos(social.angle * Math.PI / 180) * 45],
                              y: [0, Math.sin(social.angle * Math.PI / 180) * 45]
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              repeatDelay: 0.5,
                              delay: social.delay + 1, // Start after central pulse
                              ease: "easeOut"
                            }}
                            className="absolute inset-0 m-auto w-7 h-7 rounded-lg flex items-center justify-center pointer-events-none"
                            style={{ background: `${social.color}20`, border: `1px solid ${social.color}40`, zIndex: 20 }}
                          >
                            <social.Icon className="w-4 h-4" style={{ color: social.color }} />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'One Click - All Socials', dot: '#ec4899' },
                          { label: 'AI Branded Captions', dot: '#a78bfa' },
                          { label: 'Connect 10+ Platforms', dot: '#3b82f6' },
                          { label: 'Smart Distribution', dot: '#06b6d4' },
                        ].map((item, i) => (
                          <div key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <span className="w-1 h-1 rounded-full" style={{ background: item.dot }} />
                            <span className="text-[10px] font-medium text-gray-300">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Animated Workflow — Speech to Video only */}
                {tool.title === 'Speech to Video' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-5"
                  >
                    {/* Workflow row */}
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: 'rgba(6,182,212,0.6)' }}>Process</p>
                    <div className="flex items-center w-full mb-5">
                      {[
                        { Icon: Mic, label: 'Text / Audio', sub: 'Script or voice file', color: '#3b82f6' },
                        { Icon: Zap, label: 'AI Engine', sub: 'Voice + visual sync', color: '#a78bfa' },
                        { Icon: Video, label: 'Video Ready', sub: 'Export in seconds', color: '#06b6d4' },
                      ].map((step, i) => (
                        <React.Fragment key={i}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                            className="flex flex-col items-center gap-1.5 flex-shrink-0"
                            style={{ minWidth: 72 }}
                          >
                            <motion.div
                              animate={
                                i === 0 ? {
                                  boxShadow: [
                                    `0 0 20px ${step.color}66`, // Glow at start
                                    `0 0 0px ${step.color}00`,  // Fade as icon leaves
                                    `0 0 0px ${step.color}00`,  // Wait
                                    `0 0 20px ${step.color}66`  // Return for restart
                                  ]
                                } : i === 1 ? {
                                  boxShadow: [
                                    `0 0 0px ${step.color}00`,  // Wait
                                    `0 0 0px ${step.color}00`,  // wait
                                    `0 0 20px ${step.color}88`, // Glow when icon arrives (2s)
                                    `0 0 8px ${step.color}44`,  // Pulse
                                    `0 0 20px ${step.color}88`  // Pulse end
                                  ]
                                } : {
                                  boxShadow: [
                                    `0 0 0px ${step.color}00`,  // Wait
                                    `0 0 20px ${step.color}88`, // Glow when icon arrives (4s)
                                    `0 0 0px ${step.color}00`   // Fade
                                  ]
                                }
                              }
                              transition={
                                i === 0 ? {
                                  duration: 4.0,
                                  repeat: Infinity,
                                  times: [0, 0.15, 0.95, 1],
                                  ease: "easeInOut"
                                } : i === 1 ? {
                                  duration: 4.0,
                                  repeat: Infinity,
                                  times: [0, 0.45, 0.5, 0.75, 1],
                                  ease: "easeInOut"
                                } : {
                                  duration: 4.0,
                                  repeat: Infinity,
                                  times: [0, 0.95, 1],
                                  ease: "easeInOut"
                                }
                              }
                              className="w-11 h-11 rounded-xl flex items-center justify-center"
                              style={{ background: `${step.color}15`, border: `1.5px solid ${step.color}40`, position: 'relative' }}
                            >
                              <step.Icon className="w-5 h-5" style={{ color: step.color }} />
                            </motion.div>
                            <span className="text-[10px] font-semibold text-white text-center leading-tight">{step.label}</span>
                            <span className="text-[9px] text-gray-500 text-center leading-tight">{step.sub}</span>
                          </motion.div>
                          {i < 2 && (
                            <div className="flex-1 flex items-center justify-center relative h-11 mx-1 overflow-hidden">
                              {/* Connector Line */}
                              <div className="w-full h-px relative" style={{ background: 'rgba(99,102,241,0.2)' }}>
                                {/* Arrowhead at the end */}
                                <div
                                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rotate-45 border-t border-r"
                                  style={{ borderColor: i === 0 ? '#3b82f6' : '#a78bfa', opacity: 0.6 }}
                                />
                              </div>

                              {/* Flowing Elements - Sequential Cycle: 4s total */}
                              {i === 0 ? (
                                // Input Flow: Single large FileText icon (Starts at 0s, ends at 2s)
                                <motion.div
                                  className="absolute flex items-center justify-center -translate-y-1/2"
                                  style={{
                                    top: '50%'
                                  }}
                                  animate={{
                                    left: ['-20%', '100%'],
                                    opacity: [0, 1, 1, 0],
                                    scale: [0.9, 1.2, 1.2, 0.9]
                                  }}
                                  transition={{
                                    duration: 2.0,
                                    repeat: Infinity,
                                    repeatDelay: 2.0, // Wait for output segment to finish
                                    ease: "easeInOut",
                                    times: [0, 0.1, 0.95, 1]
                                  }}
                                >
                                  <FileText className="w-5 h-5" style={{ color: '#3b82f6', filter: 'drop-shadow(0 0 4px #3b82f6)' }} />
                                </motion.div>
                              ) : (
                                // Output Flow: Single large Video icon (Starts at 2s, ends at 4s)
                                <motion.div
                                  className="absolute flex items-center justify-center -translate-y-1/2"
                                  style={{
                                    top: '50%'
                                  }}
                                  animate={{
                                    left: ['0%', '115%'],
                                    opacity: [0, 1, 1, 0],
                                    scale: [0.9, 1.2, 1.2, 0.9],
                                    rotate: [0, 15, -15, 0]
                                  }}
                                  transition={{
                                    delay: 2.0, // Start after input finishes
                                    duration: 2.0,
                                    repeat: Infinity,
                                    repeatDelay: 2.0, // Wait for input segment to restart
                                    ease: "easeInOut",
                                    times: [0, 0.05, 0.9, 1]
                                  }}
                                >
                                  <Video className="w-5 h-5" style={{ color: '#a78bfa', filter: 'drop-shadow(0 0 5px #a78bfa)' }} />
                                </motion.div>
                              )}
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Capabilities */}
                    <div className="mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(6,182,212,0.5)' }}>Capabilities</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Text-to-video generation', dot: '#06b6d4' },
                          { label: 'Auto captions & subtitles', dot: '#a78bfa' },
                          { label: '5 video templates', dot: '#3b82f6' },
                          { label: 'Digital avatar mode', dot: '#6366f1' },
                          { label: 'Voice synthesis', dot: '#38bdf8' },
                          { label: 'One-click export', dot: '#06b6d4' },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.1)',
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.dot }} />
                            <span className="text-xs text-gray-300 font-medium whitespace-nowrap">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Bottom row */}
              <div className="flex items-center gap-4 mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onExploreTool}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${tool.accent}, ${tool.accent}bb)`, boxShadow: `0 4px 20px ${tool.accent}45` }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-150%', '150%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <span className="relative">Try it now</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </motion.button>

                {/* Dot indicators */}
                <div className="flex gap-1.5">
                  {SIDEBAR_TOOLS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTool(i)}
                      className="rounded-full transition-all duration-300"
                      style={{ width: activeTool === i ? 22 : 6, height: 6, background: activeTool === i ? tool.accent : 'rgba(255,255,255,0.15)' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ShowcaseCarousel({ cards }) {
  const [active, setActive] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const INTERVAL = 4000;

  React.useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
    }, 30);
    const advance = setTimeout(() => {
      setActive(prev => (prev + 1) % cards.length);
    }, INTERVAL);
    return () => { clearInterval(tick); clearTimeout(advance); };
  }, [active, cards.length]);

  const card = cards[active];

  return (
    <section className="py-14 relative bg-gradient-to-b from-[#0a0e27] via-[#050510] to-[#0a0e27] overflow-hidden">
      {/* Ambient glow behind active card */}
      <motion.div
        key={active}
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${card.accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8 px-6 relative z-10"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 text-[11px] font-bold tracking-[0.18em] uppercase"
          style={{
            background: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(59,130,246,0.1))',
            boxShadow: 'inset 0 0 0 1px rgba(6,182,212,0.35)',
            color: '#67e8f9',
          }}
        >
          Platform in Action
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
          See IncuBrix in Action
        </h2>
        <p className="text-gray-400 mt-1.5 text-sm">Four tools. One seamless content operation.</p>
      </motion.div>

      {/* Tab selectors */}
      <div className="flex justify-center gap-2 flex-wrap mb-8 px-4 relative z-10">
        {cards.map((c, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black tracking-[0.12em] uppercase transition-all duration-300"
            style={
              i === active
                ? {
                  background: `${c.accent}25`,
                  border: `1.5px solid ${c.accent}`,
                  color: c.accent,
                  boxShadow: `0 0 16px ${c.accent}40`,
                }
                : {
                  background: 'rgba(255,255,255,0.04)',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  color: '#6b7280',
                }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: i === active ? c.accent : '#374151' }}
            />
            {c.badge}
          </button>
        ))}
      </div>

      {/* Main card */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: `1px solid ${card.accent}35`,
            boxShadow: `0 0 60px ${card.accent}20, 0 20px 60px rgba(0,0,0,0.6)`,
          }}
        >
          {/* Pulsing accent glow ring */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl pointer-events-none z-20"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ border: `1px solid ${card.accent}50` }}
          />

          {/* Image */}
          <div style={{ aspectRatio: '16/7', overflow: 'hidden', position: 'relative' }}>
            <motion.img
              key={card.img}
              src={card.img}
              alt={card.imgAlt}
              className="w-full h-full object-cover"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: 'easeOut' }}
            />
            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, #050510 0%, rgba(5,5,16,0.6) 40%, transparent 80%)`,
              }}
            />
          </div>

          {/* Tool badge */}
          <div className="absolute top-4 left-4 z-30">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-black tracking-[0.14em] uppercase text-white"
              style={{
                background: 'rgba(5,5,16,0.88)',
                border: `1.5px solid ${card.accent}`,
                backdropFilter: 'blur(16px)',
                boxShadow: `0 0 20px ${card.accent}60`,
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: card.accent, boxShadow: `0 0 8px ${card.accent}` }}
              />
              {card.badge}
            </span>
          </div>

          {/* Bottom caption */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
            <h3 className="text-white font-bold text-xl md:text-2xl leading-snug mb-1.5">{card.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-lg">{card.caption}</p>
          </div>
        </motion.div>

        {/* Progress bar + dot indicators */}
        <div className="mt-5 flex flex-col items-center gap-3">
          {/* Thin auto-progress bar */}
          <div className="w-full max-w-xs h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-none"
              style={{ width: `${progress}%`, background: card.accent }}
            />
          </div>
          {/* Dots */}
          <div className="flex gap-2">
            {cards.map((c, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 24 : 6,
                  height: 6,
                  background: i === active ? c.accent : 'rgba(255,255,255,0.2)',
                  boxShadow: i === active ? `0 0 8px ${c.accent}` : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isBetaOpen, setIsBetaOpen] = React.useState(false);
  const { isAuthenticated, setAuthModalOpen, theme } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBetaClick = () => {
    setIsBetaOpen(true);
  };

  const handleDemoClick = () => {
    setIsModalOpen(true);
  };

  const handleExploreTool = () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
    }
  };

  const platformTools = [
    {
      icon: Mic,
      title: 'Text to Speech',
      description: 'Transform written content into natural AI voices',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Video,
      title: 'Speech to Video',
      description: 'Turn audio into engaging video presentations',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Pencil,
      title: 'Scribe',
      description: 'AI-powered content intelligence and portfolio strategy',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Scissors,
      title: 'Content Repurposer',
      description: 'Extract viral moments from long-form videos',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Share2,
      title: 'Publisher',
      description: 'One-click multi-platform social media publishing',
      gradient: 'from-pink-500 to-cyan-500'
    },
  ];

  const contentFlow = [
    { icon: Sparkles, label: 'Idea', color: 'from-cyan-400 to-cyan-600' },
    { icon: FileText, label: 'Post', color: 'from-blue-400 to-blue-600' },
    { icon: Video, label: 'Video', color: 'from-indigo-400 to-indigo-600' },
    { icon: Mic, label: 'Podcast', color: 'from-purple-400 to-purple-600' },
    { icon: Share2, label: 'Publish', color: 'from-cyan-400 to-cyan-600' }
  ];

  const creators = [
    { label: 'Thought Leaders', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', active: true, badge: 'BETA' },
    { label: 'Podcasters', img: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=300&q=80', active: true, badge: 'BETA' },
    { label: 'YouTubers', img: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&q=80', active: false, badge: 'COMING SOON' },
    { label: 'Educators', img: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=300&q=80', active: false, badge: 'COMING SOON' },
    { label: 'Solopreneurs', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80', active: false, badge: 'COMING SOON' }
  ];

  return (
    <div className="bg-background text-foreground overflow-hidden transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-14 pb-6 px-6">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 30, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
              x: [0, -40, 0],
              y: [0, -60, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[180px]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Hero Visual Overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-20 mix-blend-overlay">
          <motion.img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            alt="AI Network"
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 30, repeat: Infinity }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center pt-10 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="flex justify-center mb-7"
            >
              <span
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
                style={{
                  background: theme === 'light'
                    ? 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(99,102,241,0.08))'
                    : 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(99,102,241,0.1))',
                  border: theme === 'light' ? '1.5px solid rgba(6,182,212,0.5)' : '1px solid rgba(6,182,212,0.35)',
                  color: theme === 'light' ? '#0e7490' : '#67e8f9',
                  boxShadow: theme === 'light' ? 'none' : '0 0 24px rgba(6,182,212,0.15)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                AI-Powered Creator Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-extrabold mb-6 tracking-tight text-center"
              style={{ lineHeight: 1.08, fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 1, ease: "easeOut" }}
            >
              <span
                className="block"
                style={{ letterSpacing: '-0.02em', color: theme === 'light' ? '#0f172a' : '#ffffff' }}
              >
                Create With Purpose.
              </span>
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #22d3ee 0%, #a5f3fc 40%, #818cf8 80%, #22d3ee 100%)',
                  backgroundSize: '200% auto',
                  letterSpacing: '-0.02em',
                }}
              >
                Grow Your Influence.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className={`text-base md:text-lg mb-10 font-normal max-w-xl mx-auto leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 1 }}
            >
              Plan, create, manage, and publish content.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 1 }}
            >
              {/* Primary CTA: Join Free Beta */}
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 blur-lg"
                  animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.04, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <Button
                  onClick={handleBetaClick}
                  className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 text-white px-10 py-5 text-base font-bold rounded-2xl shadow-2xl shadow-cyan-500/40 border border-cyan-300/30"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                  />
                  <span className="relative flex items-center gap-2">
                    Join Free Beta Access
                  </span>
                </Button>
              </motion.div>

              {/* Secondary CTA: Schedule Demo */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleDemoClick}
                  variant="ghost"
                  className="text-cyan-300 hover:text-white hover:bg-cyan-500/15 px-7 py-5 text-sm font-semibold rounded-2xl border border-cyan-400/30 hover:border-cyan-400/60 transition-all"
                >
                  Schedule a Demo <ArrowRight className="ml-1.5 w-4 h-4 inline" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>


        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center mt-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Sidebar Tools Panel */}
      <SidebarToolsPanel onExploreTool={handleExploreTool} />

      {/* Feature Showcase — Spotlight Carousel */}
      {(() => {
        const showcaseCards = [
          {
            badge: 'TEXT TO SPEECH',
            accent: '#06b6d4',
            title: 'Turn Words into Voices & Videos',
            caption: 'Paste a script — get a studio-quality voiceover and an auto-generated video in minutes.',
            img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&q=85',
            imgAlt: 'Professional podcasting microphone in a recording studio',
          },
          {
            badge: 'DASHBOARD',
            accent: '#38bdf8',
            title: 'All Your Metrics, One View',
            caption: 'Track reach, engagement, and growth across every platform — no tab-switching required.',
            img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85',
            imgAlt: 'Analytics dashboard with charts and performance metrics',
          },
          {
            badge: 'SCRIBE',
            accent: '#c084fc',
            title: 'Your AI Editorial Brain',
            caption: 'Scribe scans your content portfolio, surfaces gaps, and auto-plans your next 2 weeks.',
            img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=85',
            imgAlt: 'Content creator working on a laptop with a content calendar',
          },
          {
            badge: 'PUBLISHER',
            accent: '#fb7185',
            title: 'One Click, Every Platform',
            caption: 'Hit publish once — LinkedIn, YouTube, Instagram, and more all go live simultaneously.',
            img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=85',
            imgAlt: 'Social media multi-platform publishing on a phone and laptop',
          },
        ];
        return <ShowcaseCarousel cards={showcaseCards} />;
      })()}

      {/* Content Flow — static, always-visible workflow strip */}
      <div className={`py-7 relative border-y transition-colors duration-300 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#07091c] border-white/5'
        }`}>
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-center gap-3 flex-wrap">
          {contentFlow.map((item, idx) => {
            const Icon = item.icon;
            const iconColor = item.color.includes('cyan') ? '#06b6d4'
              : item.color.includes('blue') ? '#60a5fa'
                : item.color.includes('indigo') ? '#818cf8'
                  : item.color.includes('purple') ? '#a78bfa'
                    : '#06b6d4';
            const bgColor = item.color.includes('cyan') ? '#06b6d4'
              : item.color.includes('blue') ? '#3b82f6'
                : item.color.includes('indigo') ? '#6366f1'
                  : item.color.includes('purple') ? '#8b5cf6'
                    : '#06b6d4';
            return (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-full shrink-0"
                  style={{
                    background: theme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)',
                    border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${bgColor}25` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: iconColor }} />
                  </div>
                  <span className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>{item.label}</span>
                </motion.div>
                {idx < contentFlow.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 + 0.05 }}
                    className={`text-base shrink-0 select-none ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}
                  >→</motion.span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>


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
                whileHover={{ y: -10 }}
                className="group relative rounded-[2rem] overflow-hidden cursor-pointer h-[320px] sm:h-[400px] lg:h-[450px] shadow-2xl"
              >
                {/* Background Image with Parallax-like effect */}
                <motion.img
                  src={item.img}
                  alt={item.type}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-125"
                />

                {/* Multi-layered Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay`} />

                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/10 group-hover:border-white/30 transition-colors duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-white/20 transition-all duration-500 group-hover:-translate-y-2`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
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


      <ScheduleDemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <BetaSignupModal
        isOpen={isBetaOpen}
        onClose={() => setIsBetaOpen(false)}
        onSuccess={() => { }}
      />
    </div >
  );
}