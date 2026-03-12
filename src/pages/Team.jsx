import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

export default function Team() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const team = [
    {
      name: 'Kamraj Subramanian',
      position: 'Founder & CEO',
      linkedin: 'https://www.linkedin.com/in/kamraj/',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69885fbb6c1ecea9608e302c/980ba62e5_Kamraj.png',
      bio: 'Visionary entrepreneur passionate about empowering creators with AI-driven tools to scale their content and business'
    },
    {
      name: 'Michael Rodriguez',
      position: 'CTO & Co-Founder',
      linkedin: 'https://linkedin.com',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
      bio: 'AI/ML expert with 10+ years in building scalable platforms'
    },
    {
      name: 'Emily Watson',
      position: 'Head of Product',
      linkedin: 'https://linkedin.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      bio: 'Creator turned product leader, deeply understands creator needs'
    },
    {
      name: 'David Kim',
      position: 'Head of Engineering',
      linkedin: 'https://linkedin.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Infrastructure architect specializing in scalable AI systems'
    },
    {
      name: 'Jessica Martinez',
      position: 'Head of Design',
      linkedin: 'https://linkedin.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      bio: 'Award-winning designer focused on creator-first experiences'
    },
    {
      name: 'Alex Thompson',
      position: 'Head of Growth',
      linkedin: 'https://linkedin.com',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      bio: 'Growth strategist with deep expertise in creator communities'
    }
  ];

  return (
    <div className="bg-[#0a0e27] text-white min-h-screen">
      <section className="py-12 px-6 overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0e27] to-black">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-gradient-to-br from-cyan-500/30 to-blue-500/26 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.3, 1.1, 1],
              opacity: [0.4, 0.6, 0.5, 0.4],
              x: [0, 90, -50, 0],
              y: [0, -50, 40, 0],
              rotate: [0, 90, 180, 360]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[530px] h-[530px] bg-gradient-to-br from-purple-500/26 to-pink-500/28 rounded-full blur-[130px]"
            animate={{
              scale: [1.3, 1, 1.5, 1.3],
              opacity: [0.6, 0.3, 0.7, 0.6],
              x: [0, -90, 70, 0],
              y: [0, 80, -50, 0],
              rotate: [360, 240, 120, 0]
            }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-[410px] h-[410px] bg-gradient-to-br from-indigo-500/24 to-teal-500/26 rounded-full blur-[110px]"
            animate={{
              scale: [1.1, 1.4, 0.9, 1.1],
              opacity: [0.3, 0.5, 0.4, 0.3],
              x: [0, 70, -70, 0],
              rotate: [0, 180, 360, 0]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Meet the team building the future of creator operations
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {team.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                  >
                    <Card className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/20 overflow-hidden hover:border-cyan-500/60 transition-all group relative h-full">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300"
                      />
                      <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500"
                      />
                      <div className="aspect-square overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2456] to-[#0f1535]" />
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover relative z-10 mix-blend-lighten"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-40 z-20" />
                      </div>
                      <div className="p-6 relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-cyan-400 font-semibold mb-3">{member.position}</p>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{member.bio}</p>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          <span className="border-b border-cyan-400/0 group-hover/link:border-cyan-400/100 transition-all">
                            LinkedIn Profile
                          </span>
                        </a>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:opacity-80 transition-opacity z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-12 px-6 bg-[#0f1535] relative overflow-hidden">
        <div className="absolute inset-0">
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
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Want to Join Our Team?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We're always looking for talented individuals passionate about the creator economy
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => window.open('https://www.linkedin.com/company/incubrix/jobs', '_blank')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-12 py-6 text-lg font-semibold rounded-xl shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70"
            >
              Join the Team
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}