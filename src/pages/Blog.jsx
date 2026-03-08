import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      title: 'How AI is Transforming Content Creation',
      excerpt: 'Discover how artificial intelligence is revolutionizing the way creators produce and distribute content.',
      date: 'Feb 5, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80'
    },
    {
      title: 'The Future of Creator Monetization',
      excerpt: 'Exploring new revenue streams and opportunities for content creators in 2026 and beyond.',
      date: 'Feb 1, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80'
    },
    {
      title: '10 Tips for Scaling Your Content Production',
      excerpt: 'Proven strategies to create more content without burning out or sacrificing quality.',
      date: 'Jan 28, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80'
    }
  ];

  return (
    <div className="bg-[#0a0e27] text-white min-h-screen">
      <section className="py-12 px-6 overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0e27] to-black">
          <motion.div 
            className="absolute top-1/4 left-1/3 w-[490px] h-[490px] bg-gradient-to-br from-cyan-500/30 to-blue-500/25 rounded-full blur-[125px]"
            animate={{ 
              scale: [1, 1.4, 1.1, 1],
              opacity: [0.4, 0.6, 0.5, 0.4],
              x: [0, 100, -50, 0],
              y: [0, -60, 40, 0],
              rotate: [0, 90, 270, 360]
            }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/3 w-[530px] h-[530px] bg-gradient-to-br from-purple-500/28 to-pink-500/30 rounded-full blur-[135px]"
            animate={{ 
              scale: [1.4, 1, 1.5, 1.4],
              opacity: [0.6, 0.3, 0.7, 0.6],
              x: [0, -90, 70, 0],
              y: [0, 80, -60, 0],
              rotate: [360, 180, 90, 0]
            }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[410px] h-[410px] bg-gradient-to-br from-indigo-500/22 to-teal-500/25 rounded-full blur-[105px]"
            animate={{ 
              scale: [1.1, 1.4, 0.9, 1.1],
              opacity: [0.3, 0.5, 0.4, 0.3],
              rotate: [0, 180, 270, 360]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Insights, tips, and updates from the IncuBrix team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <Card key={idx} className="bg-[#151d45] border-cyan-500/20 overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400">{post.excerpt}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}