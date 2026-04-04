import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, User, Settings, Sparkles, Info, CreditCard, Moon, Sun, Monitor, UserCircle, Camera, Upload, Rocket, Calendar, Pencil, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/lib/AuthContext';
import { toast, Toaster } from "sonner";
import BetaSignupModal from '@/components/BetaSignupModal';
import { motion } from 'framer-motion';

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, setAuthModalOpen, logout, authModalOpen, setIsAccountDropdownOpen, theme, toggleTheme } = useAuth();
  const fileInputRef = useRef(null);
  // Profile states - initialized as empty/default and synced via useEffect
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isBetaEnrolled, setIsBetaEnrolled] = useState(false);
  const [betaModalOpen, setBetaModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const scrollTimerRef = useRef(null);

  // Click-based dropdown state
  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
  const [isFooterDropdownOpen, setIsFooterDropdownOpen] = useState(false);
  const [isSocialDropdownOpen, setIsSocialDropdownOpen] = useState(false);
  const [isCreatorStudioDropdownOpen, setIsCreatorStudioDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const headerDropdownRef = useRef(null);
  const footerDropdownRef = useRef(null);
  const socialDropdownRef = useRef(null);
  const creatorStudioDropdownRef = useRef(null);
  const resourcesDropdownRef = useRef(null);

  // Sync combined open state with AuthContext (used by ChatWidget)
  useEffect(() => {
    setIsAccountDropdownOpen(isHeaderDropdownOpen || isFooterDropdownOpen);
  }, [isHeaderDropdownOpen, isFooterDropdownOpen, setIsAccountDropdownOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerDropdownRef.current && !headerDropdownRef.current.contains(e.target)) {
        setIsHeaderDropdownOpen(false);
      }
      if (footerDropdownRef.current && !footerDropdownRef.current.contains(e.target)) {
        setIsFooterDropdownOpen(false);
      }
      if (socialDropdownRef.current && !socialDropdownRef.current.contains(e.target)) {
        setIsSocialDropdownOpen(false);
      }
      if (creatorStudioDropdownRef.current && !creatorStudioDropdownRef.current.contains(e.target)) {
        setIsCreatorStudioDropdownOpen(false);
      }
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(e.target)) {
        setIsResourcesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      if (!fileName.endsWith('.jpg') && !fileName.endsWith('.jpeg')) {
        toast.error("jpg/jpeg format only");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (typeof base64String === 'string') {
          setProfilePhoto(base64String);
          if (user?.email) {
            localStorage.setItem(`${user.email}_profilePhoto`, base64String);
          }
          toast.success("Profile photo updated!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Safe loading effect (no side effects that save data)
  useEffect(() => {
    if (user?.email) {
      const email = user.email;
      setProfilePhoto(localStorage.getItem(`${email}_profilePhoto`) || null);
      setIsBetaEnrolled(localStorage.getItem(`${email}_isBetaEnrolled`) === 'true');
    } else {
      // Clear data on logout
      setProfilePhoto(null);
      setIsBetaEnrolled(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleActivity = () => {
      // If we are at the very top, always show header
      if (window.scrollY < 20) {
        setIsHeaderVisible(true);
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        return;
      }

      // On any activity (scroll/mouse), briefly hide header if we're scrolling
      // But if it's just mouse move, we might want to show it.
      // Logical compromise: Show on mouse move, Hide on scroll start, Show on scroll stop.
      setIsHeaderVisible(false);

      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      
      scrollTimerRef.current = setTimeout(() => {
        setIsHeaderVisible(true);
      }, 800);
    };

    const handleMouseMove = () => {
      setIsHeaderVisible(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      
      // Still set a timer to hide it if they stop moving and start scrolling again later
      scrollTimerRef.current = setTimeout(() => {
        // Only hide if we are actually scrolling (handled by scroll listener)
      }, 800);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      handleActivity();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  const navLinks = [
    { name: 'Pricing', path: 'Pricing' },
    { name: 'Contact Us', path: 'NeedHelp' }
  ];

  const handleNavClick = (path) => {
    if (currentPageName === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <style>{`
        :root {
          --navy-900: #0a0e27;
          --navy-800: #0f1535;
          --navy-700: #151d45;
          --cyan-500: #00d9ff;
          --cyan-400: #3de5ff;
          --blue-500: #0080ff;
          --background: 232 58% 10%;
          --foreground: 210 40% 98%;
        }
        .light {
          --background: 0 0% 100%;
          --foreground: 222.2 84% 4.9%;
          --navy-900: #ffffff;
          --navy-800: #f8f8f8;
          --navy-700: #e0e0e0;
          --cyan-500: #0080ff;
          --cyan-400: #0066cc;
          --blue-500: #0056b3;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.4);
        }
        @keyframes pulse-vibrant {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-vibrant {
          animation: pulse-vibrant 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: isHeaderVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled
        ? (theme === 'dark' ? 'bg-[#0a0e27]/95 backdrop-blur-lg border-b border-white/5' : 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm')
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to={createPageUrl('Home')}
              onClick={() => handleNavClick('Home')}
              className="flex items-center space-x-2.5 group"
            >
              <div className="h-10 flex-shrink-0">
                <img src="/logo.jpeg" alt="IncuBrix" className="h-full w-auto object-contain" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 xl:space-x-8">

              {/* Resources Dropdown */}
              <div className="relative" ref={resourcesDropdownRef}>
                <button
                  onClick={() => setIsResourcesDropdownOpen(prev => !prev)}
                  className={`flex items-center gap-1 text-xs xl:text-sm font-medium transition-colors hover:text-[#00d9ff] ${isResourcesDropdownOpen ? 'text-[#00d9ff]' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Resources
                  <svg className={`w-3 h-3 transition-transform duration-200 ${isResourcesDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`absolute left-0 mt-3 w-[180px] bg-[#0a0e27]/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-200 z-50 ${isResourcesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}>
                  <div className="py-2">
                    {[
                      { label: 'About Us', path: 'About' },
                      { label: 'How IncuBrix Works', path: 'HowItWorks' }
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={createPageUrl(item.path)}
                        onClick={() => {
                          handleNavClick(item.path);
                          setIsResourcesDropdownOpen(false);
                        }}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Creator Studio Dropdown */}
              <div className="relative" ref={creatorStudioDropdownRef}>
                <button
                  onClick={() => setIsCreatorStudioDropdownOpen(prev => !prev)}
                  className={`flex items-center gap-1 text-xs xl:text-sm font-medium transition-colors hover:text-[#00d9ff] ${isCreatorStudioDropdownOpen ? 'text-[#00d9ff]' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  Creator Studio
                  <svg className={`w-3 h-3 transition-transform duration-200 ${isCreatorStudioDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`absolute left-0 mt-3 w-[230px] bg-[#0a0e27]/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-200 z-50 ${isCreatorStudioDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}>
                  <div className="py-2">
                    {[
                      { label: 'Content Insights' },
                      { label: 'Content Creation' },
                      { label: 'Content Publishing' },
                      { label: 'Content Performance', badge: 'SOON' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setIsCreatorStudioDropdownOpen(false);
                          if (!isAuthenticated) {
                            toast.error('Sign in first to enter creator studio', {
                              description: 'You need an account to explore these modules.',
                              duration: 4000
                            });
                            setAuthModalOpen(true);
                          } else {
                            // Do nothing for authenticated users as requested
                          }
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 transition-colors group text-left"
                      >
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto text-[9px] font-black bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white px-2 py-0.5 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.4)] animate-pulse-vibrant border border-white/20 uppercase tracking-tighter">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Remaining Links (Pricing, Contact Us) */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={createPageUrl(link.path)}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-xs xl:text-sm font-medium transition-colors hover:text-[#00d9ff] ${currentPageName === link.path ? 'text-[#00d9ff]' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                  {link.name}
                </Link>
              ))}



              {/* Social Dropdown Button */}
              <div className="relative" ref={socialDropdownRef}>
                <button
                  onClick={() => setIsSocialDropdownOpen(prev => !prev)}
                  className={`flex items-center gap-1 px-2 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all border ${isSocialDropdownOpen
                    ? 'bg-white/10 border-cyan-500/40 text-white'
                    : 'border-white/10 text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/5'
                    }`}
                  title="Follow us"
                >
                  {/* Share / community icon */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                  </svg>
                  Community
                  <svg className={`w-3 h-3 transition-transform duration-200 ${isSocialDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Social Dropdown Panel */}
                <div className={`absolute right-0 mt-3 w-auto bg-[#111827] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-200 z-50 ${isSocialDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}>
                  <div className="flex flex-row items-center gap-4 p-4">
                    {[
                      {
                        label: 'Follow us on LinkedIn',
                        href: 'https://linkedin.com/company/incubrix',
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        ),
                        color: 'text-blue-400',
                      },
                      {
                        label: 'Follow on Instagram',
                        href: 'https://www.instagram.com/incubrix_official?igsh=Y2ZpNms4MWRuc2Vs',
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        ),
                        color: 'text-pink-400',
                      },
                      {
                        label: 'Follow on Facebook',
                        href: 'https://www.facebook.com/people/IncuBrix/61583095167915/#',
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                          </svg>
                        ),
                        color: 'text-blue-500',
                      },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsSocialDropdownOpen(false)}
                        className={`hover:scale-110 transition-transform ${item.color}`}
                        title={item.label}
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Book a Demo Button */}
              <button
                onClick={() => {
                  if (location.pathname !== '/') {
                    window.location.href = '/#book-demo';
                  } else {
                    document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-xs xl:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/10"
              >
                <Calendar className="w-4 h-4" />
                Book a demo
              </button>

              {user ? (
                <div className="relative" ref={headerDropdownRef}>
                  <Button
                    onClick={() => setIsHeaderDropdownOpen(prev => !prev)}
                    className="bg-gradient-to-r from-[#00d9ff] to-[#0080ff] hover:opacity-90 text-white font-semibold px-6"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {(user.name ? user.name.split(' ')[0] : (user.email ? user.email.split('@')[0] : 'Account'))}
                  </Button>
                  <div className={`absolute right-0 mt-4 w-[320px] ${theme === 'dark'
                    ? 'bg-gradient-to-br from-[#111a4a] via-[#0a0e27] to-[#05091d] border-cyan-400/30'
                    : 'bg-white border-gray-200 shadow-xl'
                    } border rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(6,182,212,0.1)] transition-all z-50 overflow-y-auto max-h-[calc(100vh-120px)] custom-scrollbar backdrop-blur-xl ${isHeaderDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    <div className="p-6">
                      {/* Brand/Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handlePhotoClick}
                            className="relative group/avatar"
                          >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover/avatar:opacity-80 transition-opacity overflow-hidden">
                              {profilePhoto ? (
                                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                              ) : (
                                (user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U'))
                              )}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity z-10">
                              <Camera className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0f173d] border border-cyan-500/30 rounded-full flex items-center justify-center shadow-lg">
                              <Upload className="w-3 h-3 text-cyan-400" />
                            </div>
                          </button>
                          <div className="flex flex-col text-left">
                            <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-extrabold text-lg leading-tight tracking-tight`}>{user.name || 'User'}</span>
                            <span className="text-cyan-400/60 text-xs truncate max-w-[150px] font-semibold">{user.email}</span>
                          </div>
                        </div>
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />



                      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -mx-6 mb-4" />

                      {/* Pricing Plan Section */}
                      <div className={`mb-4 ${theme === 'dark' ? 'bg-[#0a0e27]/50' : 'bg-gray-50'} p-4 rounded-2xl border ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'}`}>
                        <div className="flex items-center justify-between mb-4 px-1">
                          <div className="flex items-center">
                            <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-bold text-sm tracking-tight`}>{(user?.plan || 'Free') + ' Plan'}</span>
                          </div>
                          <Link to={`/Pricing?highlight=${user?.plan || 'Free'}#plans`} className="text-[10px] text-cyan-400/60 hover:text-cyan-400 uppercase font-bold tracking-widest transition-colors">Details</Link>
                        </div>
                        <Link to="/Pricing#plans" className="block">
                          <button className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl text-white font-black text-xs transition-all shadow-lg shadow-cyan-500/30">
                            Upgrade Now
                          </button>
                        </Link>
                      </div>



                      <div className={`h-px ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent' : 'bg-gray-200'} -mx-6 mb-4`} />

                      <div className="flex justify-center pt-2">
                        <button
                          onClick={() => { logout(); toast.success("Logged out successfully"); }}
                          className="px-8 py-2.5 rounded-xl border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white font-bold text-xs transition-all shadow-lg hover:shadow-red-500/20"
                        >
                          Logout
                        </button>
                      </div>

                      {/* Dropdown Footer Links */}
                      <div className={`flex items-center justify-center gap-5 text-[10px] ${theme === 'dark' ? 'text-gray-500 border-cyan-500/10' : 'text-gray-400 border-gray-200'} font-bold border-t pt-5`}>
                        <Link to="/Terms" className="hover:text-cyan-400 transition-colors uppercase">TERMS</Link>
                        <Link to="/Privacy" className="hover:text-cyan-400 transition-colors uppercase">PRIVACY</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-gradient-to-r from-[#00d9ff] to-[#0080ff] hover:opacity-90 text-white font-semibold px-6"
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0f1535] border-t border-white/5">
            <div className="px-6 py-4 space-y-3">

              {/* Mobile Resources Accordion */}
              <div>
                <button
                  onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                  className="w-full flex items-center justify-between py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Resources
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isMobileResourcesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileResourcesOpen && (
                  <div className="pl-4 py-2 space-y-3 border-l border-white/10 ml-2 mt-1">
                    {[
                      { label: 'About Us', path: 'About' },
                      { label: 'How IncuBrix Works', path: 'HowItWorks' }
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={createPageUrl(item.path)}
                        onClick={() => {
                          handleNavClick(item.path);
                          setMobileMenuOpen(false);
                        }}
                        className={`block text-sm font-medium transition-colors ${currentPageName === item.path ? 'text-[#00d9ff]' : 'text-gray-400 hover:text-gray-200'}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Fixed Creator Studio Text (No sub-navigation on mobile for now since it's a showcase) */}
              <div className="block py-2 text-base font-medium text-gray-300">
                Creator Studio
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={createPageUrl(link.path)}
                  onClick={() => {
                    handleNavClick(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`block py-2 text-base font-medium transition-colors ${currentPageName === link.path ? 'text-[#00d9ff]' : 'text-gray-300'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="bg-[#0f1535] rounded-lg p-3 mb-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-black shrink-0 overflow-hidden">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span>{user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      logout();
                      toast.success("Logged out successfully", {
                        description: "You have been logged out.",
                      });
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-500/20 border border-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-[#00d9ff] to-[#0080ff] hover:opacity-90 text-white font-semibold"
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              )}
            </div>
          </div>
        )}
      </motion.nav>

      {/* Auth Modal */}
      <AuthModal open={isAuthenticated ? false : (currentPageName === 'Auth' || authModalOpen)} onOpenChange={setAuthModalOpen} />
      <BetaSignupModal
        isOpen={betaModalOpen}
        onClose={() => setBetaModalOpen(false)}
        onSuccess={() => {
          setIsBetaEnrolled(true);
          if (user?.email) localStorage.setItem(`${user.email}_isBetaEnrolled`, 'true');
          setBetaModalOpen(false);
          toast.success("Successfully enrolled in Beta!");
        }}
      />
      <Toaster richColors position="top-center" theme={theme === 'light' ? 'light' : 'dark'} />

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className={`${theme === 'dark' ? 'bg-[#0f1535]' : 'bg-gray-50'} border-t ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'} mt-12 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex flex-col">
                <Link
                  to={createPageUrl('Home')}
                  onClick={() => handleNavClick('Home')}
                  className="flex items-center space-x-2.5 mb-6 group"
                >
                  <div className="h-10 flex-shrink-0">
                    <img src="/logo.jpeg" alt="IncuBrix" className="h-full w-auto object-contain" />
                  </div>
                </Link>
              <div className="space-y-4 text-sm text-gray-400">
                <p className="max-w-xs leading-relaxed">
                  4 TAMPINES STREET 73,<br />
                  Singapore 528824
                </p>
                <p className="font-medium text-gray-200">
                  IncuBrix Pte. Ltd.
                </p>
                <p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=support@incubrix.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm transition-colors hover:text-[#00d9ff] ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    support@incubrix.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Resources */}
            <div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={createPageUrl('About') + '?f=about'} onClick={() => handleNavClick('About')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'About' && location.search.includes('f=about') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('HowItWorks') + '?f=hiw'} onClick={() => handleNavClick('HowItWorks')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'HowItWorks' && location.search.includes('f=hiw') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    How IncuBrix Works
                  </Link>
                </li>
              </ul>
            </div>

            {/* IncuBrix Creator Studio */}
            <div className="col-span-1">
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                IncuBrix Creator Studio
              </h3>
              <ul className="space-y-2">
                {[
                  { name: 'Content Insights', query: 'insights' },
                  { name: 'Content Creation', query: 'creation' },
                  { name: 'Content Publishing', query: 'publishing' },
                  { name: 'Content Performance', query: 'performance' },
                ].map((tool) => (
                  <li key={tool.query}>
                    <button
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast.error('Sign in first to enter creator studio', {
                            description: 'You need an account to explore these modules.',
                            duration: 4000
                          });
                          setAuthModalOpen(true);
                        }
                      }}
                      className="text-sm text-gray-400 hover:text-[#00d9ff] transition-colors text-left"
                    >
                      {tool.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={createPageUrl('HowItWorks') + '#demo'} onClick={() => handleNavClick('HowItWorks')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'HowItWorks' && location.hash === '#demo' ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Demo
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('NeedHelp') + '?f=cu'} onClick={() => handleNavClick('NeedHelp')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'NeedHelp' && location.search.includes('f=cu') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('NeedHelp') + '#faq'} onClick={() => handleNavClick('NeedHelp')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'NeedHelp' && location.hash === '#faq' ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={createPageUrl('Privacy') + '?f=prv'} onClick={() => handleNavClick('Privacy')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'Privacy' && location.search.includes('f=prv') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('Terms') + '?f=trm'} onClick={() => handleNavClick('Terms')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'Terms' && location.search.includes('f=trm') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('Team') + '?f=tm'} onClick={() => handleNavClick('Team')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'Team' && location.search.includes('f=tm') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Team
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-8 border-t border-white/5 flex justify-center space-x-8">
            <a href="https://linkedin.com/company/incubrix" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors" title="Follow us on LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="https://www.instagram.com/incubrix_official?igsh=Y2ZpNms4MWRuc2Vs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors" title="Follow on Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="https://www.facebook.com/people/IncuBrix/61583095167915/#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" title="Follow on Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-center text-gray-400 text-sm">
              © 2026 IncuBrix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}