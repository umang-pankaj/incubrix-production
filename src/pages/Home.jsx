import React, { useEffect } from 'react';
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
  Search,
  MessageSquare,
  Lightbulb,
  Target,
  Briefcase,
  Monitor,
  PenTool,
  BarChart3
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ScheduleDemoModal from '../components/ScheduleDemoModal';
import BetaSignupModal from '../components/BetaSignupModal';
import { useAuth } from '@/lib/AuthContext';

const SIDEBAR_TOOLS = [
  { 
    id: 'insights',
    icon: Search, 
    title: 'Content Insights', 
    accent: '#06b6d4',
    tools: [
      { name: 'Scribe', icon: Pencil, desc: 'AI editorial brain for portfolio strategy.' }
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
      { name: 'Publisher', icon: Share2, desc: 'One-click social distribution.' }
    ]
  },
  { 
    id: 'performance',
    icon: BarChart3, 
    title: 'Content Performance', 
    accent: '#ec4899',
    badge: 'COMING SOON',
    tools: [
      { name: 'Unified Analytics Dashboard', icon: Search, desc: 'Real-time growth insights.' }
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
      'top-left': 'top-0 left-0 -translate-x-[15%] -translate-y-12',
      'top-right': 'top-0 right-0 translate-x-[15%] -translate-y-12 text-right',
      'bottom-left': 'bottom-0 left-0 -translate-x-[15%] translate-y-12',
      'bottom-right': 'bottom-0 right-0 translate-x-[15%] translate-y-12 text-right'
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
        {/* Scribe Connector */}
        <LeadLine color="cyan" isActive={activeIndex === 0} x1="10%" y1="10%" x2="20%" y2="40%" />
        <BlueprintLabel 
          position="top-left"
          label="Scribe"
          detail="AI Content Strategy & Strategic Growth Insights"
          isActive={activeIndex === 0}
          onHover={() => setActiveIndex(0)}
          color="cyan"
        />

        {/* Speech to Video Connector */}
        <LeadLine color="blue" isActive={activeIndex === 2} x1="90%" y1="10%" x2="80%" y2="50%" />
        <BlueprintLabel 
          position="top-right"
          label="Speech to Video"
          detail="Automate Visuals & Viral Video Generation"
          isActive={activeIndex === 2}
          onHover={() => setActiveIndex(2)}
          color="blue"
        />

        {/* Text to Speech Connector */}
        <LeadLine color="purple" isActive={activeIndex === 1} x1="10%" y1="90%" x2="45%" y2="58%" />
        <BlueprintLabel 
          position="bottom-left"
          label="Text to Speech"
          detail="Natural AI Voices & Studio-Grade AI Narration"
          isActive={activeIndex === 1}
          onHover={() => setActiveIndex(1)}
          color="purple"
        />

        {/* Publisher Connector */}
        <LeadLine color="emerald" isActive={activeIndex === 3} x1="90%" y1="90%" x2="60%" y2="85%" />
        <BlueprintLabel 
          position="bottom-right"
          label="Publisher"
          detail="One-Click Publishing & Global Audience Reach"
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
              className="w-full h-full object-cover opacity-80"
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
  const category = SIDEBAR_TOOLS[activeTool];
  const { theme } = useAuth();

  // Reset subtool when category changes
  React.useEffect(() => {
    setActiveSubTool(0);
  }, [activeTool]);

  const toolFeatures = {
    'Scribe': ['Content Intelligence', 'Portfolio Indexer', 'AI Content Planner'],
    'Text to Speech': ['Natural AI voices', 'Multi-language support', 'Studio-quality output'],
    'Speech to Video': ['Auto video generation', 'Sync audio to visuals', 'One-click export'],
    'Content Repurposer': ['Clip viral moments', 'AI-powered editing', 'Multi-format export'],
    'Publisher': ['One-click multi-platform publish', 'Peak-time scheduling', 'Unified analytics'],
  };

  const activeToolData = category.id === 'performance' ? null : category.tools[activeSubTool];

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
          <div className="w-full lg:w-[360px] shrink-0 rounded-3xl p-6 flex lg:flex-col lg:justify-start gap-4 overflow-x-auto lg:overflow-visible"
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
                  className={`relative flex items-center gap-4 px-6 py-8 rounded-2xl transition-all duration-300 min-w-[200px] lg:min-w-0 w-full group ${t.badge ? 'cursor-default opacity-60' : 'cursor-pointer'}`}
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
                  <div className="flex flex-col items-start translate-y-[1px]">
                    <span className={`text-[17px] font-black leading-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                      {t.title}
                    </span>
                  </div>
                  {t.badge && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-[10px] font-black text-white px-2.5 py-1 rounded-lg shadow-lg border border-white/20 z-20 tracking-tight">
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
                <div className="flex-1 flex flex-col items-center justify-center relative">
                  {/* Decorative Background Elements */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <div className="w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
                      <div className="absolute top-[20%] left-[10%] w-32 h-20 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm" />
                      <div className="absolute top-[30%] right-[15%] w-40 h-24 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm" />
                      <div className="absolute bottom-[20%] left-[20%] w-48 h-32 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm" />
                      <div className="absolute bottom-[25%] right-[10%] w-24 h-16 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm" />
                    </div>
                  </div>

                  <div className="relative z-10 text-center px-6">
                  <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest"
            >
              Core Capabilities
            </motion.div>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="mb-8"
                    >
                      <h4 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                        Unified Analytics Dashboard
                      </h4>
                      <p className="text-gray-400 max-w-lg mx-auto leading-relaxed text-lg font-medium opacity-80">
                        The heartbeat of your content strategy. Track growth, revenue, and audience engagement across 12+ platforms in one stunning interface.
                      </p>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/40 text-pink-300 font-bold text-sm tracking-widest uppercase shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)]"
                    >
                      Coming Soon
                    </motion.div>

                    {/* Feature Pills */}
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                      {['Real-time Insights', 'ROI Tracking', 'Audience Demographics', 'Predictive Growth'].map((label, idx) => (
                        <div key={idx} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-wider backdrop-blur-md">
                          {label}
                        </div>
                      ))}
                    </div>
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
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
                          {React.createElement(activeToolData.icon, { className: 'w-5 h-5', style: { color: category.accent } })}
                        </div>
                      <h4 className="text-2xl font-black text-white">{activeToolData.name}</h4>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[11px] font-black tracking-[0.2em] text-cyan-400/80 uppercase">Key Capabilities</p>
                        <div className="grid grid-cols-1 gap-3">
                          {(toolFeatures[activeToolData.name] || []).map((f, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/5 border border-white/5 group hover:border-white/10 transition-colors"
                            >
                              <div className="w-1.5 h-1.5 rounded-full" style={{ background: category.accent }} />
                              <span className="text-xs text-gray-300 font-medium">{f}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 rounded-3xl bg-black/20 border border-white/5 p-8 flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                         <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `radial-gradient(circle at center, ${category.accent} 0%, transparent 75%)` }} />
                      </div>
                      
                      {activeToolData.name === 'Text to Speech' && (
                        <div className="relative w-full aspect-video flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            {[1, 2, 3].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                                className="absolute rounded-full border border-cyan-500"
                                style={{ width: i * 120, height: i * 120 }}
                              />
                            ))}
                          </div>
                          <div className="relative z-10 flex items-center gap-8">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-16 h-20 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2 p-3"
                            >
                              <div className="h-1.5 w-full bg-white/20 rounded-full" />
                              <div className="h-1.5 w-2/3 bg-white/20 rounded-full" />
                              <div className="h-1.5 w-3/4 bg-white/20 rounded-full" />
                            </motion.div>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <ArrowRight className="w-6 h-6 text-cyan-500/50" />
                            </motion.div>
                            <div className="relative">
                              <Mic className="w-12 h-12 text-cyan-400" />
                              <div className="absolute -inset-4 border border-cyan-500/30 rounded-full animate-ping" />
                            </div>
                          </div>
                        </div>
                      )}

                      {activeToolData.name === 'Speech to Video' && (
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

                      {activeToolData.name === 'Scribe' && (
                        <div className="relative w-full aspect-video flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#070b1f] rounded-[2rem] border border-white/5 overflow-hidden">
                          {/* Background Grid */}
                          <div className="absolute inset-0 opacity-10" 
                            style={{ backgroundImage: 'radial-gradient(#22d3ee 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} 
                          />
                          
                          <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* Neural Network Pulse Rings */}
                            {[1, 2, 3].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ 
                                  scale: [1, 1.6],
                                  opacity: [0.5, 0]
                                }}
                                transition={{ 
                                  duration: 3, 
                                  repeat: Infinity, 
                                  delay: i * 1,
                                  ease: "easeOut" 
                                }}
                                className="absolute rounded-full border border-cyan-500/30"
                                style={{ width: 80, height: 80 }}
                              />
                            ))}

                            {/* Center "Brain" Node */}
                            <motion.div 
                              animate={{ 
                                boxShadow: ['0 0 20px rgba(34,211,238,0.2)', '0 0 40px rgba(34,211,238,0.5)', '0 0 20px rgba(34,211,238,0.2)']
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center z-20 shadow-2xl relative"
                            >
                              <Zap className="w-10 h-10 text-white animate-pulse" />
                              
                              {/* Orbiting Data Particles */}
                              {[...Array(6)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  animate={{ rotate: 360 }}
                                  transition={{ 
                                    duration: 4 + i, 
                                    repeat: Infinity, 
                                    ease: "linear" 
                                  }}
                                  className="absolute w-full h-full"
                                >
                                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 blur-[1px]" />
                                </motion.div>
                              ))}
                            </motion.div>

                            {/* Floating "Idea" Nodes being scanned */}
                            {[
                              { Icon: FileText, top: '15%', left: '20%' },
                              { Icon: Video, top: '20%', right: '15%' },
                              { Icon: Mic, bottom: '25%', left: '15%' },
                              { Icon: Share2, bottom: '20%', right: '20%' }
                            ].map((node, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                  opacity: [0, 1, 0.4],
                                  scale: [0.8, 1, 0.9],
                                  y: [0, -10, 0]
                                }}
                                transition={{ 
                                  duration: 4, 
                                  repeat: Infinity, 
                                  delay: i * 0.7,
                                  ease: "easeInOut" 
                                }}
                                className="absolute p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                                style={{ top: node.top, left: node.left, right: node.right, bottom: node.bottom }}
                              >
                                <node.Icon className="w-5 h-5 text-gray-400" />
                                
                                {/* Scanning Laser Line */}
                                <motion.div 
                                  animate={{ x: ['-100%', '200%'] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                                />
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Bottom Stats/Feedback overlay */}
                          <div className="absolute bottom-6 left-6 right-6 flex justify-between gap-3">
                            {['Analyzing Trends', 'Indexing Portfolio', 'Drafting Strategy'].map((text, i) => (
                              <motion.div
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1 h-1 rounded-full bg-cyan-500" />
                                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{text}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeToolData.name === 'Content Repurposer' && (
                        <div className="flex flex-col items-center gap-6 w-full">
                           <div className="relative">
                              {/* Long form container */}
                              <div className="w-64 h-32 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center relative">
                                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                                 <motion.div 
                                   animate={{ x: [-100, 100] }}
                                   transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                   className="absolute h-full w-[2px] bg-pink-500/50"
                                 />
                                 <Video className="w-8 h-8 text-white/10" />
                              </div>
                              
                              <motion.div 
                                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="absolute -bottom-4 right-1/2 translate-x-1/2 bg-pink-600 rounded-full p-2 shadow-xl border-2 border-white/20"
                              >
                                 <Scissors className="w-4 h-4 text-white" />
                              </motion.div>
                           </div>

                           <div className="flex justify-center gap-3">
                              {[1, 2, 3].map(i => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 1.5 + (i * 0.2), repeat: Infinity, repeatDelay: 3 }}
                                  className="w-14 h-24 rounded-lg border border-pink-500/20 bg-pink-500/10 flex items-center justify-center"
                                >
                                  <Video className="w-4 h-4 text-pink-400/30" />
                                </motion.div>
                              ))}
                           </div>
                        </div>
                      )}

                      {activeToolData.name === 'Publisher' && (
                        <div className="relative w-full aspect-video flex items-center justify-center">
                           <div className="relative w-40 h-40 flex items-center justify-center">
                              <motion.div 
                                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }} 
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center z-10 shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] backdrop-blur-sm"
                              >
                                 <Share2 className="w-10 h-10 text-blue-400" />
                              </motion.div>
                              
                              {[
                                { Icon: Youtube, color: '#ff0000', angle: 0 },
                                { Icon: Instagram, color: '#e4405f', angle: 90 },
                                { Icon: ({ className, style }) => (
                                  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                  </svg>
                                ), color: '#ffffff', angle: 180 },
                                { Icon: Linkedin, color: '#0077b5', angle: 270 }
                              ].map((item, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ 
                                    x: [0, Math.cos(item.angle * Math.PI / 180) * 80],
                                    y: [0, Math.sin(item.angle * Math.PI / 180) * 80],
                                    opacity: [0, 1, 0.8],
                                    scale: [0.5, 1.2, 1]
                                  }}
                                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                                  className="absolute p-3 rounded-xl bg-white/5 border border-white/10"
                                >
                                   <item.Icon className="w-6 h-6" style={{ color: item.color }} />
                                </motion.div>
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
                    Explore {activeToolData.name}
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
      <section className="relative h-[105vh] lg:h-[115vh] -mt-20 flex items-center justify-center pt-20 px-6 overflow-hidden">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(10,14,39,0.4)_100%)] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              {/* Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="flex justify-center lg:justify-start mb-7"
              >
                <div
                  className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[11px] font-black tracking-[0.3em] uppercase relative overflow-hidden group transition-all duration-500"
                  style={{
                    background: theme === 'light'
                      ? 'rgba(255, 255, 255, 0.7)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: '1.5px solid rgba(34, 211, 238, 0.4)',
                    color: theme === 'light' ? '#0e7490' : '#67e8f9',
                    backdropFilter: 'blur(20px)',
                    boxShadow: theme === 'light' 
                      ? '0 10px 25px -5px rgba(6, 182, 212, 0.1)' 
                      : '0 0 30px rgba(34, 211, 238, 0.15)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="relative z-10">CREATOR GROWTH PLATFORM</span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="font-extrabold mb-6 tracking-tight"
                style={{ lineHeight: 1.05, fontSize: 'clamp(2.6rem, 5vw, 4.5rem)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 1, ease: "easeOut" }}
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
                className={`text-base md:text-lg mb-10 font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 1 }}
              >
                Plan, create, manage, and publish content.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 1 }}
              >
              {/* Primary CTA: Start Your Journey */}
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >

                <Button
                  onClick={handleBetaClick}
                  className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 text-white px-10 py-5 text-base font-bold rounded-2xl shadow-2xl shadow-cyan-500/40 border border-cyan-300/30"
                >
                  <span className="relative flex items-center gap-2">
                    Start Your Journey
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
            accent: '#c084fc', // purple from Scribe
            title: 'Your AI Editorial Brain',
            caption: 'Scan your content portfolio, surface gaps, and auto-plan your content strategy with deep intelligence.',
            img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=85',
            imgAlt: 'Content creator working on a laptop with a content calendar',
          },
          {
            badge: 'CONTENT CREATION',
            accent: '#06b6d4', // cyan from Text to Voice
            title: 'Turn Words into Voices & Videos',
            caption: 'From studio-quality AI voiceovers to automated social videos, create highly-engaging content in minutes.',
            img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&q=85',
            imgAlt: 'Professional podcasting microphone in a recording studio',
          },
          {
            badge: 'CONTENT PUBLISHING',
            accent: '#fb7185', // pink from Publisher
            title: 'One Click, Every Platform',
            caption: 'Hit publish once — LinkedIn, YouTube, Instagram, and more all go live simultaneously to maximize reach.',
            img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=85',
            imgAlt: 'Social media multi-platform publishing on a phone and laptop',
          },
          {
            badge: 'CONTENT PERFORMANCE',
            accent: '#38bdf8', // blue from Dashboard
            title: 'All Your Metrics, One View',
            caption: 'Track reach, engagement, and growth across every platform with unified analytics — no tab-switching required.',
            img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85',
            imgAlt: 'Analytics dashboard with charts and performance metrics',
          },
        ];
        return <ShowcaseCarousel cards={showcaseCards} />;
      })()}

      <div className={`py-10 relative border-y transition-colors duration-300 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#07091c] border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-4 flex-nowrap overflow-x-auto no-scrollbar scroll-smooth">
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl shrink-0 cursor-default group"
                  style={{
                    background: theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.03)',
                    border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: theme === 'light' ? '0 4px 6px -1px rgba(0,0,0,0.05)' : '0 10px 30px -10px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12"
                    style={{ background: `${bgColor}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: iconColor }} />
                  </div>
                  <span className={`text-[15px] font-bold tracking-tight ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>
                    {item.label}
                  </span>
                </motion.div>
                {idx < contentFlow.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                    className={`flex items-center text-xl font-light ${theme === 'light' ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    <ArrowRight className="w-5 h-5 opacity-40" />
                  </motion.div>
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