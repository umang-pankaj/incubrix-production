import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Video, Mic, TrendingUp, Scissors, Share2, Pencil } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function Dashboard() {
  const { theme } = useAuth();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-[#0a0e27] text-white' : 'bg-[#f8fafc] text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome to IncuBrix</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Your creator dashboard</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Sparkles, label: 'Content Created', value: '0' },
            { icon: Video, label: 'Videos Generated', value: '0' },
            { icon: Mic, label: 'Audio Files', value: '0' },
            { icon: TrendingUp, label: 'Growth Score', value: '0%' }
          ].map((stat, idx) => (
            <Card key={idx} className={`p-6 transition-colors ${isDark ? 'bg-[#151d45] border-cyan-500/20' : 'bg-white border-gray-200 shadow-sm'}`}>
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="w-5 h-5 text-cyan-500" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</span>
              </div>
              <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Mic, title: 'Text to Speech', desc: 'Turn written content into natural AI voices.', color: '#06b6d4', bg: '#06b6d415' },
            { icon: Video, title: 'Speech to Video', desc: 'Create videos from audio or scripts.', color: '#3b82f6', bg: '#3b82f615' },
            { icon: Pencil, title: 'Scribe', desc: 'AI content strategy and portfolio intelligence.', color: '#a78bfa', bg: '#a78bfa15' },
            { icon: Scissors, title: 'Content Repurposer', desc: 'Extract viral clips from long form videos.', color: '#8b5cf6', bg: '#8b5cf615' },
            { icon: Share2, title: 'Publisher', desc: 'One-click multi-platform social publishing.', color: '#06b6d4', bg: '#06b6d415' }
          ].map((tool, idx) => (
            <Card key={idx} className={`p-6 transition-all cursor-pointer group ${isDark ? 'bg-[#151d45] border-cyan-500/20 hover:border-cyan-500/40' : 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-cyan-300'}`}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: tool.bg, border: `1.5px solid ${tool.color}30` }}
              >
                <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{tool.title}</h3>
              <p className={`mb-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{tool.desc}</p>
              <Button variant="ghost" className="text-cyan-500 hover:text-cyan-400 p-0 font-semibold text-sm">
                Start Your Journey →
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}