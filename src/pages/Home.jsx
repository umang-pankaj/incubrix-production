import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Sparkles,
  Video,
  Mic,
  FileText,
  FileVideo,
  FileAudio,
  Share2,
  Scissors,
  Pencil,
  Zap,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Search,
  MessageSquare,
  Lightbulb,
  Target,
  Briefcase,
  Monitor,
  PenTool,
  BarChart3,
  Headphones,
  Rocket,
  CheckCircle2,
  User,
  Facebook,
  Twitch
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ScheduleDemoModal from '../components/ScheduleDemoModal';
import BetaSignupModal from '../components/BetaSignupModal';
import { useAuth } from '@/lib/AuthContext';
import { toast } from 'sonner';

const SIDEBAR_TOOLS = [
  { 
    id: 'insights',
    icon: Search, 
    title: 'Content Insights', 
    accent: '#06b6d4',
    tools: [
      { 
        name: 'Content Insights', 
        icon: Search, 
        desc: 'Unlock what to improve, what’s missing, and what’s next' 
      }
    ]
  },
  { 
    id: 'creation',
    icon: Sparkles, 
    title: 'Content Creation', 
    accent: '#06b6d4',
    tools: [
      { name: 'Text to Speech', icon: Mic, desc: 'Generate natural, studio-quality AI voices in seconds.' },
      { name: 'Speech to Video', icon: Video, desc: 'Transform audio or text into engaging social videos.' },
      { name: 'Content Repurposer', icon: Scissors, desc: 'Turn long-form content into viral short-form clips.' }
    ]
  },
  { 
    id: 'publishing',
    icon: Share2, 
    title: 'Content Publishing', 
    accent: '#3b82f6',
    tools: [
      { name: 'Publisher', icon: Share2, desc: 'Distribute content seamlessly across all platforms' }
    ]
  },
  { 
    id: 'performance',
    icon: BarChart3, 
    title: 'Content Performance', 
    accent: '#ec4899',
    badge: 'COMING SOON',
    tools: [
      { name: 'Unified Analytics Dashboard', icon: Search, desc: 'Measure, analyze, and scale your content with data' }
    ]
  },
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
    img: '/assets/audience/coaches.png',
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
    img: '/assets/audience/founders.png',
    comingSoon: true
  },
  {
    type: 'Content Creators',
    icon: PenTool,
    color: 'from-rose-400 to-red-500',
    desc: 'Create more in less time across every platform',
    img: '/assets/audience/creators.png',
    comingSoon: true
  }
];

const DashboardPreview = ({ theme }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isDark = theme === 'dark';

  const BlueprintLabel = ({ label, detail, isActive, onHover, color, position }) => {
    const posStyles = {
      'top-left': 'top-0 left-0 -translate-y-12 lg:-translate-x-[15%]',
      'top-right': 'top-0 right-0 -translate-y-12 lg:translate-x-[15%] text-right',
      'bottom-left': 'bottom-0 left-0 translate-y-12 lg:-translate-x-[15%]',
      'bottom-right': 'bottom-0 right-0 translate-y-12 lg:translate-x-[15%] text-right'
    };

    return (
      <motion.div 
        initial={false}
        animate={{ 
          opacity: isActive ? 1 : 0.3,
          scale: isActive ? 1 : 0.9,
          y: isActive ? 0 : (position.includes('top') ? 10 : -10)
        }}
        onMouseEnter={onHover}
        className={`absolute ${posStyles[position]} z-50 flex flex-col group/bp cursor-pointer max-w-[240px] pointer-events-auto`}
      >
        <div className={`px-5 py-3.5 rounded-2xl border bg-slate-900/95 backdrop-blur-2xl border-${color}-400/30 shadow-2xl transition-all duration-700 ${isActive ? `border-${color}-400/80 shadow-${color}-500/20` : 'hover:border-white/20'}`}>
          <div className={`flex items-center gap-2 mb-1.5 ${position.includes('right') ? 'justify-end' : ''}`}>
             {!position.includes('right') && <div className={`w-2 h-2 rounded-full ${isActive ? `bg-${color}-400` : 'bg-gray-500'}`} />}
             <p className={`text-[12px] font-black uppercase tracking-[0.2em] ${isActive ? `text-${color}-400` : 'text-gray-400'}`}>{label}</p>
             {position.includes('right') && <div className={`w-2 h-2 rounded-full ${isActive ? `bg-${color}-400` : 'bg-gray-500'}`} />}
          </div>
          <p className="text-[13px] font-semibold text-white/95 leading-snug tracking-tight">{detail}</p>
        </div>
      </motion.div>
    );
  };

  const ResultVisual = ({ type, isActive, color }) => {
    if (!isActive) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`absolute z-30 pointer-events-none p-3 rounded-xl bg-${color}-400/10 border border-${color}-400/30 backdrop-blur-md shadow-lg shadow-${color}-500/10`}
        style={{
          top: type === 'insight' ? '25%' : type === 'audio' ? '42%' : type === 'video' ? '38%' : '72%',
          left: type === 'insight' ? '15%' : type === 'audio' ? '45%' : type === 'video' ? '82%' : '58%',
        }}
      >
        {type === 'insight' && (
          <div className="flex items-end gap-1 h-8">
            {[30, 60, 45, 80, 55, 100].map((h, i) => (
              <motion.div 
                key={i} 
                animate={{ height: [`${h}%`, `${h+10}%`, `${h}%`] }} 
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                className={`w-1.5 bg-${color}-400 rounded-t-sm`} 
              />
            ))}
          </div>
        )}
        {type === 'audio' && (
          <div className="flex items-center gap-1 w-12 h-8">
             {[40, 90, 60, 100, 30, 80].map((h, i) => (
               <motion.div 
                 key={i} 
                 animate={{ scaleY: [1, 1.5, 1] }} 
                 transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                 className={`w-1 h-full bg-${color}-400 rounded-full`} 
               />
             ))}
          </div>
        )}
        {type === 'video' && (
          <div className="relative w-10 h-8 rounded-md overflow-hidden bg-black/40 border border-white/20">
             <motion.div 
               animate={{ opacity: [0.3, 0.7, 0.3] }}
               transition={{ duration: 2, repeat: Infinity }}
               className={`absolute inset-0 bg-gradient-to-tr from-${color}-400/20 to-transparent`}
             />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/30 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-white border-b-[3px] border-b-transparent ml-0.5" />
             </div>
          </div>
        )}
        {type === 'reach' && (
          <div className="relative w-10 h-10 flex items-center justify-center">
             {[1, 2, 3].map((i) => (
               <motion.div 
                 key={i}
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: [0.5, 1.5, 0.5], opacity: [0, 0.5, 0] }}
                 transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                 className={`absolute inset-0 rounded-full border border-${color}-400/50`}
               />
             ))}
             <div className={`w-2 h-2 rounded-full bg-${color}-400`} />
          </div>
        )}
      </motion.div>
    );
  };

  const LeadLine = ({ isActive, color, x1, y1, x2, y2 }) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-40 overflow-visible">
      <motion.line
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isActive ? 1 : 0, 
          opacity: isActive ? 0.3 : 0 
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={`currentColor`}
        strokeWidth="1"
        strokeDasharray="4 4"
        className={`text-${color}-400`}
      />
    </svg>
  );

  return (
    <div className="relative py-24 px-12 lg:px-24">
      {/* Blueprint Layer - Connectors and Labels */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        {/* Content Insights Connector */}
        <LeadLine color="cyan" isActive={activeIndex === 0} x1="10%" y1="10%" x2="20%" y2="40%" />
        <BlueprintLabel 
          position="top-left"
          label="Content Insights"
          detail="Unlock what to improve, what’s missing, and what’s next"
          isActive={activeIndex === 0}
          onHover={() => setActiveIndex(0)}
          color="cyan"
        />

        {/* Content Creation Connector */}
        <LeadLine color="blue" isActive={activeIndex === 2} x1="90%" y1="10%" x2="80%" y2="50%" />
        <BlueprintLabel 
          position="top-right"
          label="Content Creation"
          detail="Go from idea to ready-to-publish content instantly"
          isActive={activeIndex === 2}
          onHover={() => setActiveIndex(2)}
          color="blue"
        />

        {/* Content Performance Connector */}
        <LeadLine color="purple" isActive={activeIndex === 1} x1="10%" y1="90%" x2="45%" y2="58%" />
        <BlueprintLabel 
          position="bottom-left"
          label="Content Performance"
          detail="Measure, analyze, and scale your content with data"
          isActive={activeIndex === 1}
          onHover={() => setActiveIndex(1)}
          color="purple"
        />

        {/* Content Publishing Connector */}
        <LeadLine color="emerald" isActive={activeIndex === 3} x1="90%" y1="90%" x2="60%" y2="85%" />
        <BlueprintLabel 
          position="bottom-right"
          label="Content Publishing"
          detail="Distribute content seamlessly across all platforms"
          isActive={activeIndex === 3}
          onHover={() => setActiveIndex(3)}
          color="emerald"
        />
      </div>

      <motion.div
        style={{
          perspective: "1200px",
          rotateX,
          rotateY,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[850px] mx-auto group"
      >
        {/* Result Visuals Overlay */}
        <ResultVisual type="insight" isActive={activeIndex === 0} color="cyan" />
        <ResultVisual type="audio" isActive={activeIndex === 1} color="purple" />
        <ResultVisual type="video" isActive={activeIndex === 2} color="blue" />
        <ResultVisual type="reach" isActive={activeIndex === 3} color="emerald" />

        {/* Main Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`relative aspect-[16/10] rounded-[2.5rem] p-2 border ${isDark ? 'bg-[#0a0e27]/40 border-white/10' : 'bg-white/40 border-gray-200'} shadow-[0_60px_120px_rgba(0,0,0,0.7)] backdrop-blur-3xl`}
        >
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/5 bg-[#0a0e27]">
            <img 
              src="/assets/dashboard-showcase.png" 
              alt="IncuBrix Outcome Dashboard"
              className="w-full h-full object-contain opacity-80"
            />
            
            {/* Ambient Darken for contrast */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            
            {/* Dashboard Hotspots */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div 
                animate={{ scale: activeIndex === 0 ? [1, 1.4, 1] : 1, opacity: activeIndex === 0 ? 1 : 0.3 }}
                className="absolute top-[35%] left-[10%] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
              />
              <motion.div 
                animate={{ scale: activeIndex === 1 ? [1, 1.4, 1] : 1, opacity: activeIndex === 1 ? 1 : 0.3 }}
                className="absolute top-[52%] left-[42%] w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_15px_#a78bfa]"
              />
              <motion.div 
                animate={{ scale: activeIndex === 2 ? [1, 1.4, 1] : 1, opacity: activeIndex === 2 ? 1 : 0.3 }}
                className="absolute top-[48%] left-[78%] w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_15px_#3b82f6]"
              />
              <motion.div 
                animate={{ scale: activeIndex === 3 ? [1, 1.4, 1] : 1, opacity: activeIndex === 3 ? 1 : 0.3 }}
                className="absolute top-[82%] left-[55%] w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399]"
              />
            </div>
          </div>
        </motion.div>

        {/* Outer Glows */}
        <div className="absolute -inset-20 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      </motion.div>
    </div>
  );
};

function SidebarToolsPanel({ onExploreTool }) {
  const [activeTool, setActiveTool] = React.useState(0);
  const [activeSubTool, setActiveSubTool] = React.useState(0);
  const [ttsStep, setTtsStep] = React.useState(0); // 0: typing, 1: click, 2: synthesis
  const [insightsPhase, setInsightsPhase] = React.useState(0); // 0: Input, 1: Processing, 2: Output, 3: Final
  const [publisherPhase, setPublisherPhase] = React.useState(0); // 0: Card, 1: Icons, 2: Connect, 3: Publish, 4: Success
  const [performancePhase, setPerformancePhase] = React.useState(0); // 0: Icons, 1: Merge, 2: Metrics, 3: Insight, 4: Prediction
  const category = SIDEBAR_TOOLS[activeTool];
  const { theme } = useAuth();

  const toolFeatures = {
    'Content Insights': [
      { title: 'We analyze your content' },
      { title: 'We map your topics' },
      { title: "We find what's missing" },
      { title: 'We identify what\'s trending' }
    ],
    'Text to Speech': [
      { title: 'Input your idea or script' },
      { title: 'Customize voice & tone' },
      { title: 'Generate ready-to-publish audio' }
    ],
    'Speech to Video': [
      { title: 'Input text or audio' },
      { title: 'Select or refine clips' },
      { title: 'Generate ready-to-publish video' }
    ],
    'Content Repurposer': [
      { title: 'Upload long-form content' },
      { title: 'Auto-detect key moments' },
      { title: 'Generate ready-to-share clips' }
    ],
    'Publisher': [
      { title: 'Connect platforms' },
      { title: 'Create content' },
      { title: 'Publish or schedule' }
    ],
    'Unified Analytics Dashboard': [
      { title: 'Connect your platforms' },
      { title: 'Track performance in one place' },
      { title: 'Get insights & growth trends' }
    ],
  };

  const activeToolData = category.id === 'performance' ? null : (category.tools[activeSubTool] || category.tools[0]);

  // TTS animation cycle
  React.useEffect(() => {
    const duration = ttsStep === 0 ? 3000 : ttsStep === 1 ? 1500 : 5000;
    const timer = setTimeout(() => {
      setTtsStep((s) => (s + 1) % 3);
    }, duration);
    return () => clearTimeout(timer);
  }, [ttsStep]);
  
  // Content Insights animation cycle
  React.useEffect(() => {
    if (activeToolData?.name !== 'Content Insights') {
      setInsightsPhase(0);
      return;
    }
    
    const intervals = [3000, 3500, 4500, 6000]; // Durations: Input, Processing, Output, Final
    const timer = setTimeout(() => {
      setInsightsPhase((s) => (s + 1) % 4);
    }, intervals[insightsPhase]);
    return () => clearTimeout(timer);
  }, [insightsPhase, activeToolData?.name]);

  // Publisher animation cycle
  React.useEffect(() => {
    if (activeToolData?.name !== 'Publisher') {
      setPublisherPhase(0);
      return;
    }
    const interval = setInterval(() => {
      setPublisherPhase(prev => (prev + 1) % 5);
    }, 2200);
    return () => clearInterval(interval);
  }, [activeToolData?.name]);

  // Performance animation cycle
  React.useEffect(() => {
    if (category.id !== 'performance') {
      setPerformancePhase(0);
      return;
    }
    const interval = setInterval(() => {
      setPerformancePhase(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, [category.id]);

  // Reset subtool when category changes
  React.useEffect(() => {
    setActiveSubTool(0);
  }, [activeTool]);

  return (
    <section className={`py-20 px-6 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#07091c]' : 'bg-[#f8fafc]'}`}>
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 tracking-tight ${theme === 'dark' ? 'bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent' : 'text-gray-900'}`}>
            IncuBrix Creator Studio
          </h2>
          <p className={`text-lg md:text-xl font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Insights, Creation, Publishing and Performance — All in one Creator Studio
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-8 items-stretch"
        >
          {/* Sidebar */}
          <div className="w-full lg:w-[360px] shrink-0 rounded-3xl p-4 flex lg:flex-col lg:justify-between gap-3 overflow-x-auto lg:overflow-visible h-[650px]"
            style={{
              background: theme === 'dark' ? 'rgba(15, 21, 53, 0.4)' : '#ffffff',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)'
            }}>
            {SIDEBAR_TOOLS.map((t, idx) => {
              const Icon = t.icon;
              const isActive = activeTool === idx;
              return (
                <motion.button
                  key={idx}
                  onClick={() => setActiveTool(idx)}
                  whileHover={t.badge ? {} : { scale: 1.02, x: 4 }}
                  whileTap={t.badge ? {} : { scale: 0.98 }}
                  className={`group relative flex items-center gap-5 p-5 w-full rounded-[24px] text-left transition-all duration-500 border-2 flex-1 ${isActive ? 'bg-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]' : 'bg-transparent border-transparent hover:bg-white/5'} ${t.badge ? 'cursor-default opacity-60' : 'cursor-pointer'}`}
                  style={isActive
                    ? {
                        background: `linear-gradient(135deg, ${t.accent}25, ${t.accent}10)`,
                        border: `1.5px solid ${t.accent}40`,
                        boxShadow: `0 8px 20px -5px ${t.accent}30`
                      }
                    : {
                        border: '1.5px solid transparent',
                        background: 'transparent'
                      }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0"
                    style={{
                      background: isActive ? `${t.accent}33` : theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      border: isActive ? `1.5px solid ${t.accent}66` : '1.5px solid transparent',
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: isActive ? t.accent : '#64748b' }} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className={`text-[17px] font-black leading-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                      {t.title}
                    </span>
                  </div>
                  {t.badge && (
                    <div className="absolute top-[12px] right-[12px] bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-[9px] font-bold text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30 z-20 tracking-widest uppercase">
                      {t.badge}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Content Area */}
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex-1 rounded-[32px] overflow-hidden relative flex flex-col"
            style={{
              background: theme === 'dark' ? 'linear-gradient(145deg, #0f173a, #070b1f)' : '#fff',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 30px 60px -12px rgba(0,0,0,0.6)',
              minHeight: 650,
              height: 650,
            }}
          >
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }}
            />
            
            <div className="relative z-10 flex flex-col h-full p-8 md:p-10">
              {/* Category Header */}
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl"
                    style={{ background: `${category.accent}22`, border: `2px solid ${category.accent}40` }}>
                    {React.createElement(category.icon, { className: 'w-8 h-8', style: { color: category.accent } })}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white mb-1">{category.title}</h3>
                  </div>
                </div>
              </div>

              {category.id === 'performance' ? (
                <div className="flex-1 flex flex-col md:flex-row gap-12">
                  {/* Left Side: Info */}
                  <div className="flex-1">
                    <div className="space-y-4">
                      <p className="text-[11px] font-black tracking-[0.2em] text-cyan-400/80 uppercase">How It Works</p>
                      <div className="grid grid-cols-1 gap-3">
                        {(toolFeatures['Unified Analytics Dashboard'] || []).map((f, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 hover:bg-white/[0.08] transition-all duration-300"
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors shrink-0">
                               <span className="text-xs font-black text-cyan-400">{i + 1}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[15px] font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">{f.title}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/40 text-pink-300 font-bold text-sm tracking-widest uppercase shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)]"
                      >
                        Coming Soon
                      </motion.div>
                    </div>
                  </div>

                  {/* Right Side: Animation Box */}
                  <div className="flex-1 rounded-3xl bg-black/20 border border-white/5 p-8 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-20 transition-opacity">
                       <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `radial-gradient(circle at center, ${category.accent} 0%, transparent 75%)` }} />
                    </div>

                    <AnimatePresence mode="wait">
                      {/* Scene 1 & 2: Distributed Icons -> Merge */}
                      {(performancePhase === 0 || performancePhase === 1) && (
                        <motion.div 
                          key="icons-layer"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative w-full h-full flex items-center justify-center"
                        >
                          {[
                            { Icon: Youtube, color: '#ff0000', x: -120, y: -80 },
                            { Icon: Instagram, color: '#e4405f', x: 120, y: -60 },
                            { Icon: Twitch, color: '#9146ff', x: -100, y: 80 },
                            { Icon: Facebook, color: '#1877f2', x: 100, y: 90 },
                            { Icon: ({ className }) => (
                              <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                                <path d="M22.957 7.21c-.004-3.078-2.584-5.515-5.738-5.515-3.078 0-5.465 2.113-5.465 5.515 0 3.012 2.387 5.515 5.465 5.515 3.078 0 5.738-2.503 5.738-5.515zM2.852 22.5h2.162c.078 0 .145-.06.152-.137l.387-4.406c.004-.047.043-.082.09-.082h2.441c.078 0 .145.06.152.137l.387 4.406c.004.047.043.082.09.082h2.162c.086 0 .152-.07.145-.156l-.609-7.234a.148.148 0 0 0-.145-.137h-7a.148.148 0 0 0-.145.137l-.609 7.234c-.007.086.059.156.145.156z" />
                              </svg>
                            ), color: '#ff424d', x: 0, y: -120 }
                          ].map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ x: item.x, y: item.y, opacity: 0, scale: 0.5 }}
                              animate={{ 
                                x: performancePhase === 1 ? 0 : item.x, 
                                y: performancePhase === 1 ? 0 : item.y,
                                opacity: 1, 
                                scale: performancePhase === 1 ? 0.2 : 1,
                                filter: performancePhase === 1 ? 'blur(10px)' : 'blur(0px)'
                              }}
                              transition={{ duration: 0.8, ease: "circOut" }}
                              className="absolute p-4 rounded-2xl bg-white/5 border border-white/10 shadow-2xl"
                              style={{ color: item.color }}
                            >
                              <item.Icon className="w-8 h-8" />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {/* Scene 3, 4, 5: Dashboard Content */}
                      {performancePhase >= 2 && (
                        <motion.div 
                          key="dashboard-layer"
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="relative w-full max-w-[440px] h-[300px] rounded-[2.5rem] bg-[#050510]/80 border border-white/10 backdrop-blur-xl shadow-[0_0_100px_rgba(6,182,212,0.1)] p-8 flex flex-col gap-5"
                        >
                          {/* Top Metrics Row */}
                          <div className="grid grid-cols-3 gap-6">
                            {[
                              { label: 'Followers', value: '1.2M', color: '#06b6d4' },
                              { label: 'Views', value: '8.4M', color: '#ec4899' },
                              { label: 'Revenue', value: '$42.5K', color: '#10b981' }
                            ].map((stat, i) => (
                              <div key={i} className="flex flex-col gap-0.5">
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">{stat.label}</span>
                                <motion.span 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 + i * 0.1 }}
                                  className="text-xl font-black text-white leading-none"
                                  style={{ textShadow: `0 0 15px ${stat.color}40` }}
                                >
                                  {stat.value}
                                </motion.span>
                              </div>
                            ))}
                          </div>

                          {/* Charts Section */}
                          <div className="flex-1 relative bg-black/40 rounded-2xl border border-white/5 p-3 overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 400 150">
                              {[
                                { color: '#06b6d4', path: "M0 120 Q 50 110, 100 80 T 200 60 T 300 90 T 400 40", delay: 0 },
                                { color: '#ec4899', path: "M0 130 Q 80 120, 150 100 T 250 110 T 350 70 T 400 80", delay: 0.2 },
                                { color: '#8b5cf6', path: "M0 140 Q 60 130, 120 110 T 220 90 T 320 100 T 400 50", delay: 0.4 }
                              ].map((chart, i) => (
                                <motion.path
                                  key={i}
                                  d={chart.path}
                                  fill="none"
                                  stroke={chart.color}
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ duration: 1.5, delay: 0.5 + chart.delay, ease: "easeInOut" }}
                                />
                              ))}
                            </svg>

                            {/* Phase 3: Top Content Card */}
                            {performancePhase >= 3 && (
                               <motion.div 
                                 initial={{ x: 30, opacity: 0 }}
                                 animate={{ x: 0, opacity: 1 }}
                                 className="absolute bottom-3 right-3 w-28 h-18 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-2 flex flex-col gap-1 shadow-2xl"
                               >
                                 <div className="w-full h-6 rounded-md bg-white/10 overflow-hidden">
                                   <div className="w-full h-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20" />
                                 </div>
                                 <span className="text-[8px] font-bold text-white truncate">+24k Views</span>
                               </motion.div>
                            )}
                          </div>

                          {/* Scene 5: Prediction Element */}
                          {performancePhase === 4 && (
                            <motion.div 
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              className="absolute top-4 right-4 flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                            >
                               <Rocket className="w-2.5 h-2.5 text-emerald-400" />
                               <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">+15% Growth</span>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <>
                  {category.tools.length > 1 && (
                    <div className="flex gap-2 mb-8 p-1.5 rounded-2xl bg-black/20 self-start border border-white/5">
                      {category.tools.map((t, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSubTool(idx)}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${activeSubTool === idx ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex-1 flex flex-col md:flex-row gap-12">
                    <div className="flex-1">
                      {category.tools.length > 1 && (
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
                            {activeToolData?.icon && React.createElement(activeToolData.icon, { className: 'w-5 h-5', style: { color: category.accent } })}
                          </div>
                          <h4 className="text-2xl font-black text-white">{activeToolData?.name}</h4>
                        </div>
                      )}
                      <div className="space-y-4">
                        <p className="text-[11px] font-black tracking-[0.2em] text-cyan-400/80 uppercase">How It Works</p>
                        <div className="grid grid-cols-1 gap-3">
                          {(toolFeatures[activeToolData?.name] || []).map((f, i) => {
                            const isObj = typeof f === 'object';
                            const title = isObj ? f.title : (f.includes(': ') ? f.split(': ')[0] : f);
                            const desc = isObj ? f.desc : (f.includes(': ') ? f.split(': ')[1] : null);
                            const Icon = isObj ? f.icon : null;
                            
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 hover:bg-white/[0.08] transition-all duration-300"
                              >
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors shrink-0">
                                   <span className="text-xs font-black text-cyan-400">{i + 1}</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[15px] font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">{title}</span>
                                  {desc && <span className="text-[11px] text-gray-400 font-medium leading-relaxed opacity-80">{desc}</span>}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 rounded-3xl bg-black/20 border border-white/5 p-8 flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-20 transition-opacity">
                         <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `radial-gradient(circle at center, ${category.accent} 0%, transparent 75%)` }} />
                      </div>
                                           {activeToolData.name === 'Text to Speech' && (
                        <div className="relative w-full h-full flex items-center justify-center gap-6">
                          {/* Document card with text lines */}
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-20 h-24 rounded-2xl bg-[#1a2240] border border-white/10 flex flex-col items-start justify-center gap-2 px-3 py-3 shadow-xl"
                          >
                            {[70, 90, 55].map((w, i) => (
                              <motion.div
                                key={i}
                                className="h-1.5 rounded-full bg-white/20"
                                style={{ width: `${w}%` }}
                                animate={{ opacity: [0.4, 0.9, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                              />
                            ))}
                          </motion.div>

                          {/* Arrow */}
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="text-gray-500"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </motion.div>

                          {/* Mic icon */}
                          <motion.div
                            animate={{ scale: [1, 1.06, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <Mic className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_16px_rgba(6,182,212,0.5)]" />
                          </motion.div>
                        </div>
                      )}


                      {activeToolData?.name === 'Speech to Video' && (
                        <div className="relative w-full aspect-video flex items-center justify-center gap-6">
                           {/* Audio Waveform Side */}
                           <motion.div 
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             className="flex items-center gap-1"
                           >
                             {[...Array(5)].map((_, i) => (
                               <motion.div
                                 key={i}
                                 animate={{ height: [10, 30 + Math.random() * 20, 10] }}
                                 transition={{ 
                                   duration: 1.5, 
                                   repeat: Infinity, 
                                   delay: i * 0.1,
                                   ease: "easeInOut"
                                 }}
                                 className="w-1.5 bg-cyan-400 rounded-full"
                               />
                             ))}
                           </motion.div>

                           {/* Transformation Arrow */}
                           <motion.div
                             animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                           >
                             <ArrowRight className="w-6 h-6 text-blue-400" />
                           </motion.div>

                           {/* Video Result Side */}
                           <div className="w-48 h-32 rounded-xl border border-white/10 bg-black/40 relative overflow-hidden flex flex-col">
                              {/* Video Image/Scene */}
                              <motion.div 
                                animate={{ 
                                  background: [
                                    'linear-gradient(45deg, #0f172a, #1e293b)',
                                    'linear-gradient(45deg, #1e293b, #0e7490)',
                                    'linear-gradient(45deg, #0f172a, #1e293b)'
                                  ]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="flex-1 relative overflow-hidden flex items-center justify-center" 
                              >
                                <Video className="w-8 h-8 text-white/20" />
                                {/* Scanning Effect */}
                                <motion.div 
                                  animate={{ y: ['-100%', '100%'] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
                                />
                              </motion.div>
                              
                              {/* Video Controls / Timeline */}
                              <div className="h-8 bg-[#0f172a]/80 border-t border-white/5 flex items-center px-3 gap-2 backdrop-blur-sm">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div 
                                    animate={{ width: ['0%', '100%'] }} 
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" 
                                  />
                                </div>
                              </div>
                           </div>
                        </div>
                      )}

                      {activeToolData?.name === 'Content Insights' && (
                        <div className="relative w-full h-full flex items-center justify-center bg-[#050510] rounded-[2rem] overflow-hidden">
                          {/* Background Grid */}
                          <div className="absolute inset-0 opacity-10 pointer-events-none" 
                            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                          
                          <AnimatePresence mode="wait">
                            {/* Scene 1: Input */}
                            {insightsPhase === 0 && (
                              <motion.div 
                                key="scene1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                {/* Central Glowing Node */}
                                <motion.div 
                                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="absolute w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 blur-xl z-0" 
                                />
                                <Search className="w-8 h-8 text-cyan-400 z-10" />
                                
                                {/* Flying Icons */}
                                {[Youtube, FileVideo, FileAudio, FileText].map((Icon, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ 
                                      x: idx % 2 === 0 ? (idx === 0 ? -150 : 150) : (idx === 1 ? 150 : -150),
                                      y: idx < 2 ? -100 : 100,
                                      opacity: 0,
                                      scale: 0.5
                                    }}
                                    animate={{ x: 0, y: 0, opacity: [0, 1, 0.2], scale: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4, ease: "easeInOut" }}
                                    className="absolute p-3 rounded-xl bg-white/5 border border-white/10"
                                  >
                                    <Icon className="w-6 h-6 text-gray-400" />
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}

                            {/* Scene 2: Processing (AI Engine) */}
                            {insightsPhase === 1 && (
                              <motion.div 
                                key="scene2"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <motion.div 
                                  animate={{ 
                                    boxShadow: ['0 0 20px rgba(6,182,212,0.2)', '0 0 60px rgba(6,182,212,0.5)', '0 0 20px rgba(6,182,212,0.2)'],
                                    scale: [1, 1.05, 1]
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 flex items-center justify-center relative"
                                >
                                  <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20"
                                  />
                                  <Sparkles className="w-10 h-10 text-cyan-400" />
                                </motion.div>

                                {/* Floating Labels */}
                                {["Analyzing Content", "Clustering Topics", "Detecting Gaps"].map((text, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ 
                                      opacity: [0, 1, 0], 
                                      y: [-20, -60],
                                      x: idx === 0 ? -80 : idx === 1 ? 80 : 0
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, delay: idx * 1, ease: "easeOut" }}
                                    className="absolute text-[10px] font-black uppercase tracking-widest text-cyan-200/60 whitespace-nowrap"
                                  >
                                    {text}
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}

                            {/* Scene 3 & 4: Output / Final State */}
                            {(insightsPhase === 2 || insightsPhase === 3) && (
                              <motion.div 
                                key="scene3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 flex flex-col p-6 gap-3"
                              >
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-1 flex items-center gap-2"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                  Insights Generated
                                </motion.div>
                                
                                <div className="grid grid-cols-1 gap-3">
                                  {[
                                    { title: "Content Feedback", sub: "Improve engagement & retention", color: "cyan" },
                                    { title: "Content Gaps", sub: "Topics you haven't covered yet", color: "blue" },
                                    { title: "Trending Ideas", sub: "What to create next", color: "indigo" }
                                  ].map((card, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                      animate={{ 
                                        opacity: 1, 
                                        x: 0, 
                                        scale: 1,
                                      }}
                                      transition={{ delay: idx * 0.4, duration: 0.6 }}
                                      whileHover={{ scale: 1.02, x: 5, backgroundColor: "rgba(255,255,255,0.08)" }}
                                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-0.5 cursor-pointer transition-all duration-300 group"
                                      style={{
                                        boxShadow: insightsPhase === 3 ? `0 10px 30px -10px rgba(6,182,212,0.15)` : "none"
                                      }}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{card.title}</span>
                                        <div className={`w-1.5 h-1.5 rounded-full ${insightsPhase === 3 ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-gray-600'}`} />
                                      </div>
                                      <span className="text-[10px] text-gray-400 font-medium">{card.sub}</span>
                                    </motion.div>
                                  ))}
                                </div>

                                {insightsPhase === 3 && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-2 flex justify-center"
                                  >
                                    <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest animate-pulse">
                                      Ready to Use
                                    </div>
                                  </motion.div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {activeToolData?.name === 'Content Repurposer' && (
                        <div key="repurposer-animation-container" className="flex flex-col items-center gap-8 w-full">
                           <div className="relative group/repurpose">
                              {/* Main Video Source */}
                              <div className="w-72 h-40 rounded-2xl border border-white/10 bg-black/40 relative overflow-hidden shadow-2xl z-10">
                                 <img 
                                   src="/assets/repurposer/repurposer-base.png" 
                                   alt="Source Video" 
                                   className="w-full h-full object-cover opacity-60"
                                 />
                                 
                                 {/* Cutting Scan Line */}
                                 <motion.div 
                                   initial={{ x: 0 }}
                                   animate={{ x: [0, 288] }}
                                   transition={{ 
                                     duration: 6, 
                                     repeat: Infinity, 
                                     repeatDelay: 2, 
                                     ease: "linear" 
                                   }}
                                   style={{ left: 0 }}
                                   className="absolute inset-y-0 w-1 bg-gradient-to-b from-pink-500 via-rose-500 to-pink-500 shadow-[0_0_30px_rgba(244,63,94,2)] z-30"
                                 >
                                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-600 rounded-full p-2.5 shadow-2xl border-2 border-white/30">
                                     <Scissors className="w-4 h-4 text-white" />
                                   </div>
                                 </motion.div>

                                 {/* Scanning Effect Overlay */}
                                 <motion.div 
                                   animate={{ opacity: [0.1, 0.3, 0.1] }}
                                   transition={{ duration: 2, repeat: Infinity }}
                                   className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent pointer-events-none"
                                 />
                              </div>
                           </div>

                           {/* Generated Clips Breakdown */}
                           <div className="flex justify-center gap-4">
                              {[
                                { pos: 'left', dropAt: 0.25 },
                                { pos: 'center', dropAt: 0.5 },
                                { pos: 'right', dropAt: 0.75 }
                              ].map((clip, i) => (
                                <motion.div
                                  key={`clip-${i}`}
                                  initial={{ opacity: 0, y: -40 }}
                                  animate={{ 
                                    opacity: [0, 0, 1, 1, 0],
                                    y: [-40, -40, 0, 0, 0],
                                    scale: [0.8, 0.8, 1, 1, 0.9]
                                  }}
                                  transition={{ 
                                    duration: 8,
                                    times: [0, clip.dropAt - 0.05, clip.dropAt, 0.9, 1],
                                    repeat: Infinity,
                                    ease: "easeOut"
                                  }}
                                  className="w-20 h-32 rounded-xl border border-pink-500/30 bg-black/60 relative overflow-hidden shadow-lg group/clip"
                                >
                                  <img 
                                    src="/assets/repurposer/repurposer-base.png" 
                                    alt={`Clip ${i+1}`}
                                    className="w-full h-full object-cover opacity-80"
                                    style={{ 
                                      objectPosition: clip.pos === 'left' ? '20% 50%' : clip.pos === 'center' ? '50% 50%' : '80% 50%' 
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent" />
                                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[8px] font-black text-white/80 tracking-widest uppercase">
                                    <span>CLIP {i+1}</span>
                                    <Video className="w-2 h-2 text-pink-400" />
                                  </div>
                                </motion.div>
                              ))}
                           </div>
                        </div>
                      )}

                      {activeToolData?.name === 'Publisher' && (
                        <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#050518] rounded-[2.5rem] overflow-hidden p-8">
                           {/* Scene Background Grid */}
                           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                                style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />

                           <div className="relative w-full h-full flex items-center justify-center">
                              {/* Central Post Card (Phase 0+) */}
                              <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ 
                                   opacity: 1, 
                                   y: 0, 
                                   scale: publisherPhase === 3 ? [1, 1.05, 1] : 1,
                                   borderColor: publisherPhase === 4 ? 'rgba(34, 197, 94, 0.4)' : 'rgba(59, 130, 246, 0.2)'
                                }}
                                className="z-20 w-52 h-36 rounded-2xl bg-[#0a0e27] border border-blue-500/20 p-4 shadow-2xl flex flex-col gap-3 relative"
                              >
                                 <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                       <User className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1.5 mt-1.5">
                                       <motion.div 
                                         animate={{ width: publisherPhase === 0 ? ['0%', '70%'] : '70%' }}
                                         transition={{ duration: 1, ease: 'easeOut' }}
                                         className="h-1.5 rounded-full bg-white/10" 
                                       />
                                       <motion.div 
                                         animate={{ width: publisherPhase === 0 ? ['0%', '40%'] : '40%' }}
                                         transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                                         className="h-1 w-10 border border-white/5 rounded-full" 
                                       />
                                    </div>
                                 </div>
                                 <motion.div 
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: publisherPhase >= 0 ? 1 : 0 }}
                                   transition={{ delay: 1.2 }}
                                   className="flex-1 rounded-lg bg-blue-500/5 border border-white/5 flex items-center justify-center overflow-hidden relative"
                                 >
                                    <motion.div
                                      animate={{ 
                                         opacity: [0.1, 0.3, 0.1],
                                         scale: [1, 1.1, 1]
                                      }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                      className="absolute inset-0 bg-blue-500/10"
                                    />
                                    <Rocket className={`w-8 h-8 transition-colors duration-500 ${publisherPhase === 4 ? 'text-green-400' : 'text-blue-500/40'}`} />
                                 </motion.div>
                                 
                                 {/* Share Pulse (Phase 3) */}
                                 {publisherPhase === 3 && (
                                   <motion.div 
                                     initial={{ scale: 1, opacity: 0.5 }}
                                     animate={{ scale: 1.5, opacity: 0 }}
                                     transition={{ duration: 0.6, repeat: Infinity }}
                                     className="absolute inset-0 rounded-2xl border-2 border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                   />
                                 )}
                              </motion.div>

                              {/* Platform Icons (Phase 1+) */}
                              {[
                                { Icon: Youtube, color: '#ff0000', pos: { top: '10%', left: '10%' }, stream: { x1: '20%', y1: '20%', x2: '42%', y2: '42%' } },
                                { Icon: Instagram, color: '#e4405f', pos: { top: '10%', right: '10%' }, stream: { x1: '80%', y1: '20%', x2: '58%', y2: '42%' } },
                                { Icon: ({ className, style }) => (
                                  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                  </svg>
                                ), color: '#ffffff', pos: { bottom: '10%', left: '10%' }, stream: { x1: '20%', y1: '80%', x2: '42%', y2: '58%' } },
                                { Icon: Linkedin, color: '#0077b5', pos: { bottom: '10%', right: '10%' }, stream: { x1: '80%', y1: '80%', x2: '58%', y2: '58%' } }
                              ].map((item, i) => (
                                 <div key={i} className="absolute inset-0 pointer-events-none">
                                    {/* Connection Line (Phase 2+) */}
                                    {publisherPhase >= 2 && (
                                      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                        <motion.line
                                          x1={item.stream.x1} y1={item.stream.y1} 
                                          x2={item.stream.x2} y2={item.stream.y2}
                                          stroke={publisherPhase === 4 ? "#22c55e" : "#3b82f6"}
                                          strokeWidth="1.5"
                                          strokeDasharray="5,5"
                                          initial={{ opacity: 0, pathLength: 0 }}
                                          animate={{ 
                                             opacity: publisherPhase === 3 ? [0.2, 0.8, 0.2] : 0.4,
                                             pathLength: 1
                                          }}
                                          transition={{ duration: 1 }}
                                        />
                                        
                                        {/* Streaming Dot (Phase 2 & 3) */}
                                        {(publisherPhase === 2 || publisherPhase === 3) && (
                                          <motion.circle
                                            r="2.5"
                                            fill="#60a5fa"
                                            initial={{ cx: item.stream.x2, cy: item.stream.y2, opacity: 0 }}
                                            animate={{ 
                                               cx: [item.stream.x2, item.stream.x1],
                                               cy: [item.stream.y2, item.stream.y1],
                                               opacity: [0, 1, 0]
                                            }}
                                            transition={{ 
                                               duration: publisherPhase === 3 ? 0.4 : 0.8, 
                                               repeat: Infinity,
                                               ease: "linear",
                                               delay: i * 0.1
                                            }}
                                            style={{ filter: 'drop-shadow(0 0 4px #3b82f6)' }}
                                          />
                                        )}
                                      </svg>
                                    )}

                                    {/* Platform Icon Box */}
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                      animate={{ 
                                         opacity: publisherPhase >= 1 ? 1 : 0,
                                         scale: publisherPhase >= 1 ? 1 : 0.5,
                                         y: publisherPhase >= 1 ? 0 : 20,
                                         boxShadow: publisherPhase === 4 ? `0 0 30px -5px ${item.color}30` : 'none',
                                         borderColor: publisherPhase === 4 ? 'rgba(34, 197, 94, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                                      }}
                                      className={`absolute p-5 rounded-[1.25rem] bg-[#0f173d]/60 border shadow-2xl backdrop-blur-xl z-30 transition-colors duration-500`}
                                      style={item.pos}
                                    >
                                       <item.Icon className={`w-7 h-7 transition-colors duration-500`} style={{ color: publisherPhase === 4 ? '#22c55e' : item.color }} />
                                       
                                       {/* Success Status Text (Phase 4) */}
                                       {publisherPhase === 4 && (
                                         <motion.div
                                           initial={{ opacity: 0, y: 5 }}
                                           animate={{ opacity: 1, y: 0 }}
                                           className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                                         >
                                            <span className="text-[9px] font-black text-green-400 tracking-tighter uppercase">Posted</span>
                                         </motion.div>
                                       )}

                                       {/* Confirmation Chip (Phase 4) */}
                                       {publisherPhase === 4 && (
                                         <motion.div
                                           initial={{ scale: 0, rotate: -20 }}
                                           animate={{ scale: 1, rotate: 0 }}
                                           className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg"
                                         >
                                           <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                                         </motion.div>
                                       )}

                                       {/* Publish Flow Post (Phase 3) */}
                                       {publisherPhase === 3 && (
                                         <motion.div
                                            initial={{ scale: 0.2, opacity: 0, x: i % 2 === 0 ? 100 : -100, y: i < 2 ? 100 : -100 }}
                                            animate={{ scale: 1, opacity: [0, 1, 0], x: 0, y: 0 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: 'circOut' }}
                                            className="absolute inset-0 rounded-[1.25rem] border-2 border-blue-400 bg-blue-400/10"
                                         />
                                       )}
                                    </motion.div>
                                 </div>
                              ))}
                           </div>

                           {/* Phase Indicators */}
                           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-5">
                              {['Create', 'Connect', 'Target', 'Publish', 'Success'].map((label, i) => (
                                 <div key={i} className="flex flex-col items-center gap-1.5 min-w-[50px]">
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${publisherPhase >= i ? 'bg-blue-400 shadow-[0_0_10px_#3b82f6]' : 'bg-white/10'}`} />
                                    <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${publisherPhase === i ? 'text-blue-400 opacity-100 scale-110' : 'text-gray-600 opacity-30'}`}>
                                       {label}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5">
                <p className="text-xs text-gray-500 font-medium whitespace-nowrap">IncuBrix Creator Studio</p>
                {category.id !== 'performance' && (
                  <Button
                    onClick={onExploreTool}
                    className="bg-white hover:bg-gray-100 text-black px-10 py-6 rounded-2xl font-bold text-sm shadow-2xl flex items-center gap-2 group transition-all"
                  >
                    Explore {activeToolData?.name}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
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
        <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent tracking-tight">
          See IncuBrix in Action
        </h2>
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
              {card.comingSoon && (
                <span className="ml-2 flex items-center bg-white text-black text-[9px] font-black px-1.5 py-0.5 rounded-sm tracking-widest leading-none">
                  COMING SOON
                </span>
              )}
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
  const [isBetaOpen, setIsBetaOpen] = useState(false);
  const { isAuthenticated, setAuthModalOpen, theme } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBetaClick = () => {
    if (isAuthenticated) {
      setIsBetaOpen(true);
    } else {
      toast.error('Sign in first to enter creator studio', {
        description: 'You need an account to join the onboarding flow.',
        duration: 4000
      });
      setAuthModalOpen(true);
    }
  };

  const handleExploreTool = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
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
      icon: Search,
      title: 'Content Insights',
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
    { icon: Search, label: 'Get Content Insights', color: 'from-cyan-400 to-cyan-600' },
    { icon: Sparkles, label: 'Create Content', color: 'from-blue-400 to-blue-600' },
    { icon: Share2, label: 'Publish Everywhere', color: 'from-indigo-400 to-indigo-600' },
    { icon: BarChart3, label: 'Track & Grow', color: 'from-purple-400 to-purple-600' }
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
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-4 sm:px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
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
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <motion.img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            alt="AI Network"
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 30, repeat: Infinity }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">


          <div className="w-full grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              {/* Headline */}
              <motion.h1
                className="font-extrabold mb-6 md:mb-8 tracking-tight"
                style={{ lineHeight: 1.05, fontSize: 'clamp(2rem, 5.5vw, 5rem)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 1, ease: "easeOut" }}
              >
                <span
                  className="block"
                  style={{ letterSpacing: '-0.03em', color: theme === 'light' ? '#0f172a' : '#ffffff' }}
                >
                  Create With Purpose.
                </span>
                <span
                  className="block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #22d3ee 0%, #a5f3fc 40%, #818cf8 80%, #22d3ee 100%)',
                    backgroundSize: '200% auto',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Grow Your Influence.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className={`text-base md:text-lg lg:text-xl mb-8 md:mb-12 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                Plan, Create, Manage and Publish Content.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 1 }}
              >
              {/* Primary CTA: Get Started */}
              {!isAuthenticated && (
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                  
                  <Button
                    onClick={() => setAuthModalOpen(true)}
                    className="relative bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 text-white px-10 py-6 text-base font-bold rounded-2xl shadow-2xl shadow-cyan-500/20 border border-cyan-300/30"
                  >
                    <span className="relative flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </Button>
                </motion.div>
              )}
              </motion.div>
            </motion.div>
            
            {/* Right Column: Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <DashboardPreview theme={theme} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Sidebar Tools Panel */}
      <SidebarToolsPanel onExploreTool={handleExploreTool} />

      {/* Feature Showcase — Spotlight Carousel */}
      {(() => {
        const showcaseCards = [
          {
            badge: 'CONTENT INSIGHTS',
            accent: '#c084fc', // purple from Content Insights
            title: 'Turn Data into Your Next Breakthrough',
            caption: 'Uncover gaps, trends, and winning ideas—powered by your own content.',
            img: '/assets/how-it-works/step1-insights.png',
            imgAlt: 'Content Insights Interface',
          },
          {
            badge: 'CONTENT CREATION',
            accent: '#06b6d4', // cyan from Text to Voice
            title: 'From Idea to Content—In Minutes',
            caption: 'Create studio-quality audio and videos without the usual effort.',
            img: '/assets/how-it-works/step2-creation.png',
            imgAlt: 'Content Creation Tools',
          },
          {
            badge: 'CONTENT PUBLISHING',
            accent: '#fb7185', // pink from Publisher
            title: 'Publish Once. Reach Everywhere.',
            caption: 'Go live across platforms instantly—no extra steps, no repetition.',
            img: '/assets/how-it-works/step3-publishing.png',
            imgAlt: 'Multi-platform Publisher',
          },
          {
            badge: 'CONTENT PERFORMANCE',
            accent: '#38bdf8', // blue from Dashboard
            title: 'See What’s Working. Scale What Wins.',
            caption: 'Track growth, engagement, and revenue—all in one unified dashboard.',
            img: '/assets/how-it-works/step4-growth.png',
            imgAlt: 'Performance Analytics Dashboard',
            comingSoon: true,
          },
        ];
        return <ShowcaseCarousel cards={showcaseCards} />;
      })()}




      {/* Who IncuBrix is built for */}
      <section className="py-14 md:py-24 px-4 sm:px-6 bg-[#0a0e27] relative overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tight text-white leading-tight">
              Built for the <span className="text-cyan-400">Future</span> of Creators
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">Empowering creators to create better, grow faster, and reach wider with IncuBrix.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
            {creatorTypes.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={item.comingSoon ? {} : { y: -10 }}
                className={`${!item.comingSoon ? "group " : ""}relative rounded-[2rem] overflow-hidden ${!item.comingSoon ? "cursor-pointer" : "cursor-default border border-white/5 opacity-90"} h-[260px] sm:h-[320px] md:h-[380px] lg:h-[450px] shadow-2xl`}
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


      <BetaSignupModal
        isOpen={isBetaOpen}
        onClose={() => setIsBetaOpen(false)}
        onSuccess={() => { }}
      />
    </div >
  );
}
