import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Eye, AlertCircle, CheckCircle, UserCheck, FileCheck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Safety() {
  const navigate = useNavigate();
  const safetyFeatures = [
    {
      icon: Shield,
      title: 'Content Moderation',
      description: 'AI-powered content filtering to ensure safe and appropriate content generation',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Lock,
      title: 'Data Encryption',
      description: 'End-to-end encryption for all your content and personal information',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Eye,
      title: 'Privacy Controls',
      description: 'Full control over who can see and access your content',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: AlertCircle,
      title: 'Abuse Prevention',
      description: 'Automated systems to detect and prevent platform abuse',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: UserCheck,
      title: 'Identity Verification',
      description: 'Secure authentication systems to protect your account',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: FileCheck,
      title: 'Content Ownership',
      description: 'Your content belongs to you - we never claim rights to what you create',
      gradient: 'from-rose-500 to-orange-500'
    }
  ];

  const certifications = [
    { name: 'SOC 2 Type II', status: 'Certified' },
    { name: 'GDPR Compliant', status: 'Full Compliance' },
    { name: 'CCPA Compliant', status: 'Full Compliance' },
    { name: 'ISO 27001', status: 'In Progress' }
  ];

  return (
    <div className="bg-[#0a0e27] text-white min-h-screen">
      <section className="py-8 px-6 overflow-hidden relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0e27] to-black">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[490px] h-[490px] bg-gradient-to-br from-cyan-500/28 to-teal-500/25 rounded-full blur-[125px]"
            animate={{
              scale: [1, 1.4, 1.1, 1],
              opacity: [0.4, 0.6, 0.5, 0.4],
              x: [0, 100, -50, 0],
              y: [0, -60, 50, 0],
              rotate: [0, 120, 240, 360]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] bg-gradient-to-br from-blue-500/25 to-purple-500/28 rounded-full blur-[135px]"
            animate={{
              scale: [1.4, 1, 1.5, 1.4],
              opacity: [0.6, 0.3, 0.7, 0.6],
              x: [0, -90, 70, 0],
              y: [0, 80, -60, 0],
              rotate: [360, 180, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-br from-indigo-500/22 to-pink-500/24 rounded-full blur-[110px]"
            animate={{
              scale: [1.1, 1.4, 0.9, 1.1],
              opacity: [0.3, 0.5, 0.4, 0.3],
              rotate: [0, 180, 270, 360]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="max-w-6xl mx-auto text-center mb-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/50"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <ShieldCheck className="w-14 h-14 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Safety & Security First
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Your trust and safety are our top priorities. We use enterprise-grade security to protect your content and data.
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Safety Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {safetyFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/20 p-8 h-full hover:border-cyan-500/60 transition-all group relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative z-10">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-4xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Certifications & Compliance
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-[#151d45] border-cyan-500/20 p-6 text-center hover:border-cyan-500/60 transition-all">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                    <p className="text-sm text-cyan-400">{cert.status}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Commitment Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-[#151d45] to-[#0a0e27] border-cyan-500/40 p-10 relative overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Our Safety Commitment
                  </span>
                </h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    At IncuBrix, we take safety seriously. We use advanced AI and human moderation to ensure
                    our platform remains safe, respectful, and productive for all creators.
                  </p>
                  <p>
                    We comply with all relevant data protection regulations including GDPR and CCPA, and we
                    regularly audit our security practices to ensure your data remains protected.
                  </p>
                  <p>
                    Our dedicated security team monitors the platform 24/7, and we conduct regular penetration
                    testing and security audits to stay ahead of potential threats.
                  </p>
                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=contact@incubrix.com', '_blank')}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-6 text-lg"
                    >
                      Report Safety Concern
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}