import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, User, Settings, Sparkles, Info, CreditCard, Moon, Sun, Monitor, UserCircle, Camera, Upload, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/lib/AuthContext';
import { toast, Toaster } from "sonner";
import BetaSignupModal from '@/components/BetaSignupModal';

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, setAuthModalOpen, logout, authModalOpen, setIsAccountDropdownOpen, theme, toggleTheme } = useAuth();
  const fileInputRef = useRef(null);
  // Profile states - initialized as empty/default and synced via useEffect
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [bio, setBio] = useState('Founder @ IncuBrix | Content Creator');
  const [nickname, setNickname] = useState('');
  const [useNicknameAsDisplay, setUseNicknameAsDisplay] = useState(false);
  const [isBetaEnrolled, setIsBetaEnrolled] = useState(false);
  const [betaModalOpen, setBetaModalOpen] = useState(false);
  const location = useLocation();

  // Click-based dropdown state
  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
  const [isFooterDropdownOpen, setIsFooterDropdownOpen] = useState(false);
  const [isSocialDropdownOpen, setIsSocialDropdownOpen] = useState(false);
  const headerDropdownRef = useRef(null);
  const footerDropdownRef = useRef(null);
  const socialDropdownRef = useRef(null);

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

  const handleBioChange = (e) => {
    const val = e.target.value;
    const wordCount = val.trim() === '' ? 0 : val.trim().split(/\s+/).length;
    if (wordCount <= 100) {
      setBio(val);
      if (user?.email) {
        localStorage.setItem(`${user.email}_bio`, val);
      }
    } else {
      const words = val.trim().split(/\s+/).slice(0, 100).join(" ");
      setBio(words);
      if (user?.email) {
        localStorage.setItem(`${user.email}_bio`, words);
      }
      toast.error("Bio restricted to 100 words", { id: 'bio-limit' });
    }
  };

  // Safe loading effect (no side effects that save data)
  useEffect(() => {
    if (user?.email) {
      const email = user.email;
      setProfilePhoto(localStorage.getItem(`${email}_profilePhoto`) || null);
      setBio(localStorage.getItem(`${email}_bio`) || 'Founder @ IncuBrix | Content Creator');
      setNickname(localStorage.getItem(`${email}_nickname`) || '');
      setUseNicknameAsDisplay(localStorage.getItem(`${email}_useNicknameAsDisplay`) === 'true');
      setIsBetaEnrolled(localStorage.getItem(`${email}_isBetaEnrolled`) === 'true');
    } else {
      // Clear data on logout
      setProfilePhoto(null);
      setBio('Founder @ IncuBrix | Content Creator');
      setNickname('');
      setUseNicknameAsDisplay(false);
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: 'Home' },
    { name: 'How It Works', path: 'HowItWorks' },
    { name: 'Pricing', path: 'Pricing' },
    { name: 'Blogs', path: 'Blog' },
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
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
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
              <div className="relative w-10 h-10 transform group-hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(0,217,255,0.4)]">
                  {/* Left Blue Part */}
                  <path d="M28 20C23 20 23 20 23 25V75C23 80 23 80 28 80L52 65V35L28 20Z" fill="#0080ff" />
                  {/* Right Cyan Part */}
                  <path d="M62 35L82 48C86 50 86 50 82 52L62 65V35Z" fill="#00ffff" />
                  {/* Vertical 'i' Stem components */}
                  <circle cx="57" cy="12" r="5" fill="#00ffff" />
                  <path d="M52 25C52 20 54 18 57 18C60 18 62 20 62 25V35H52V25Z" fill="#00ffff" />
                  <rect x="52" y="35" width="10" height="30" fill="#050a24" />
                  <rect x="52" y="65" width="10" height="10" fill="#00ffff" />
                  <path d="M52 75L57 85L62 75H52Z" fill="#004080" />
                </svg>
              </div>
              <span className={`text-2xl font-black tracking-tight leading-none mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                IncuBrix
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={createPageUrl(link.path)}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-sm font-medium transition-colors hover:text-[#00d9ff] ${currentPageName === link.path ? 'text-[#00d9ff]' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              {/* Social Dropdown Button */}
              <div className="relative" ref={socialDropdownRef}>
                <button
                  onClick={() => setIsSocialDropdownOpen(prev => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all border ${isSocialDropdownOpen
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
                <div className={`absolute right-0 mt-3 w-[220px] bg-[#111827] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-200 z-50 ${isSocialDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}>
                  {[
                    {
                      label: 'Subscribe on YouTube',
                      href: 'https://youtube.com',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      ),
                      color: 'text-red-400',
                    },
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
                      label: 'Follow us on X',
                      href: 'https://twitter.com',
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                      color: 'text-gray-200',
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
                  ].map((item, idx, arr) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsSocialDropdownOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-gray-200 hover:bg-white/8 hover:text-white transition-colors ${idx < arr.length - 1 ? 'border-b border-white/5' : ''
                        }`}
                    >
                      <span className={item.color}>{item.icon}</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {user ? (
                <div className="relative" ref={headerDropdownRef}>
                  <Button
                    onClick={() => setIsHeaderDropdownOpen(prev => !prev)}
                    className="bg-gradient-to-r from-[#00d9ff] to-[#0080ff] hover:opacity-90 text-white font-semibold px-6"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {(useNicknameAsDisplay && nickname) ? nickname : (user.name ? user.name.split(' ')[0] : (user.email ? user.email.split('@')[0] : 'Account'))}
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
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover/avatar:opacity-80 transition-opacity">
                              {user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
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

                      {/* My Profile Section */}
                      <button
                        onClick={() => setIsBioExpanded(!isBioExpanded)}
                        className={`w-full flex items-center justify-center gap-2 py-3 ${theme === 'dark' ? 'bg-[#0f173d] border-cyan-500/20 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-2xl font-bold text-sm hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all mb-4`}
                      >
                        <UserCircle className="w-4 h-4 text-cyan-400" />
                        My Profile
                      </button>

                      {isBioExpanded && (
                        <div className={`mb-6 p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#0a0e27]/50 border-white/5' : 'bg-gray-50/50 border-gray-200'} transition-all animate-in slide-in-from-top-2 duration-300`}>
                          <div className="mb-4">
                            <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-cyan-400/60' : 'text-cyan-600/60'} mb-2 text-left`}>Nickname</p>
                            <input
                              type="text"
                              value={nickname}
                              onChange={(e) => {
                                const val = e.target.value;
                                setNickname(val);
                                if (user?.email) localStorage.setItem(`${user.email}_nickname`, val);
                              }}
                              className={`w-full bg-transparent border-b ${theme === 'dark' ? 'border-white/10 text-white' : 'border-gray-200 text-gray-900'} focus:border-cyan-500 focus:ring-0 text-sm p-0 pb-1 font-medium outline-none`}
                              placeholder="Enter nickname..."
                            />
                            <div className="flex items-start gap-2 mt-2">
                              <input
                                type="checkbox"
                                id="use-nickname-toggle"
                                checked={useNicknameAsDisplay}
                                onChange={(e) => {
                                  const val = e.target.checked;
                                  setUseNicknameAsDisplay(val);
                                  if (user?.email) localStorage.setItem(`${user.email}_useNicknameAsDisplay`, String(val));
                                }}
                                className="mt-0.5 h-3 w-3 rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-500/50 cursor-pointer"
                              />
                              <label htmlFor="use-nickname-toggle" className="text-[9px] text-cyan-400/60 text-left leading-tight cursor-pointer select-none">
                                Use this nickname as your display name on the account section on the home page.
                              </label>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-cyan-400/60' : 'text-cyan-600/60'} text-left`}>Your Bio</p>
                              <span className={`text-[9px] font-bold ${bio.trim() === '' ? 0 : bio.trim().split(/\s+/).length >= 95 ? 'text-red-400' : 'text-gray-500'}`}>
                                {bio.trim() === '' ? 0 : bio.trim().split(/\s+/).length}/100 Words
                              </span>
                            </div>
                            <textarea
                              value={bio}
                              onChange={handleBioChange}
                              className={`w-full bg-transparent border-none focus:ring-0 text-sm p-0 resize-none ${theme === 'dark' ? 'text-white' : 'text-gray-900'} min-h-[60px] font-medium leading-relaxed`}
                              placeholder="Add your bio here..."
                            />
                            <div className="flex justify-between items-center mt-4">
                              <span className="text-[10px] text-gray-500 font-bold uppercase">Click to edit</span>
                              <button
                                onClick={() => {
                                  setIsBioExpanded(false);
                                  toast.success("Profile updated!");
                                }}
                                className="px-4 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white text-[10px] font-bold uppercase transition-all shadow-lg hover:shadow-cyan-500/20"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Free Beta Access Section */}
                      <div className={`mb-4 p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#0a0e27]/30 border-cyan-500/10' : 'bg-gray-50/50 border-gray-200'} flex items-center justify-between`}>
                        <div className="flex flex-col text-left">
                          <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-bold text-xs uppercase tracking-wider`}>Free Beta Access</span>
                          <span className="text-[10px] text-gray-500 font-semibold">{isBetaEnrolled ? 'Enrollment Active' : 'Not Enrolled'}</span>
                        </div>
                        <button
                          onClick={() => {
                            if (!isBetaEnrolled) {
                              setBetaModalOpen(true);
                            } else {
                              setIsBetaEnrolled(false);
                              if (user?.email) localStorage.setItem(`${user.email}_isBetaEnrolled`, 'false');
                              toast.info("Beta access disabled");
                            }
                          }}
                          className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${isBetaEnrolled ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-gray-700'}`}
                        >
                          <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 ${isBetaEnrolled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                      </div>

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

                      {/* Appearance */}
                      <div className={`mb-4 p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#0a0e27]/30 border-cyan-500/10' : 'bg-gray-50/50 border-gray-200'} flex items-center justify-between`}>
                        <div className="flex flex-col text-left">
                          <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-bold text-xs uppercase tracking-wider`}>Appearance</span>
                          <span className="text-[10px] text-gray-500 font-semibold">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                        </div>
                        <button
                          onClick={toggleTheme}
                          className={`relative flex items-center gap-1 p-1 rounded-xl border transition-all duration-300 ${theme === 'dark'
                            ? 'bg-[#0f173d] border-cyan-500/20'
                            : 'bg-white border-gray-200'
                            }`}
                        >
                          <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all duration-200 ${theme === 'dark'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                            : 'text-gray-400'
                            }`}>
                            <Moon className="w-3 h-3" />
                            Dark
                          </span>
                          <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all duration-200 ${theme === 'light'
                            ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-md'
                            : 'text-gray-500'
                            }`}>
                            <Sun className="w-3 h-3" />
                            Light
                          </span>
                        </button>
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
                        <Link to="/Blog" className="hover:text-cyan-400 transition-colors uppercase">BLOGS</Link>
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
              className="lg:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0f1535] border-t border-white/5">
            <div className="px-6 py-4 space-y-3">
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
      </nav>

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
      <Toaster position="top-center" theme={theme === 'light' ? 'light' : 'dark'} />

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
                  <div className="w-10 h-10">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <path d="M28 20C23 20 23 20 23 25V75C23 80 23 80 28 80L52 65V35L28 20Z" fill="#0080ff" />
                      <path d="M62 35L82 48C86 50 86 50 82 52L62 65V35Z" fill="#00ffff" />
                      <circle cx="57" cy="12" r="5" fill="#00ffff" />
                      <path d="M52 25C52 20 54 18 57 18C60 18 62 20 62 25V35H52V25Z" fill="#00ffff" />
                      <rect x="52" y="35" width="10" height="30" fill="#050a24" />
                      <rect x="52" y="65" width="10" height="10" fill="#00ffff" />
                      <path d="M52 75L57 85L62 75H52Z" fill="#004080" />
                    </svg>
                  </div>
                  <span className="text-2xl font-black text-white tracking-tight leading-none mb-0.5">
                    IncuBrix
                  </span>
                </Link>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                  The all-in-one AI platform for creators. Turn ideas into high-quality content instantly.
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <p>IncuBrix Pte. Ltd.</p>
                <p>Singapore</p>
                <p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@incubrix.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    contact@incubrix.com
                  </a>
                </p>
              </div>
              {user ? (
                <div className="relative" ref={footerDropdownRef}>
                  <Button
                    onClick={() => setIsFooterDropdownOpen(prev => !prev)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white text-sm flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    {(useNicknameAsDisplay && nickname) ? nickname : (user.name ? user.name.split(' ')[0] : (user.email ? user.email.split('@')[0] : 'Account'))}
                  </Button>
                  {/* Footer Dropdown on Click - Positioned BELOW the button and simplified to only Logout */}
                  <div className={`absolute left-0 top-full mt-2 w-[180px] bg-gradient-to-br from-[#111a4a] via-[#0a0e27] to-[#05091d] border border-cyan-400/30 rounded-2xl shadow-2xl transition-all z-50 backdrop-blur-xl ${isFooterDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 pointer-events-none'}`}>
                    <div className="p-4 flex flex-col items-center">
                      <button
                        onClick={() => { logout(); setIsFooterDropdownOpen(false); toast.success("Logged out successfully"); }}
                        className="w-full py-2 rounded bg-red-900 hover:bg-red-800 text-white transition-colors text-xs font-semibold"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white text-sm flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Get Started
                </Button>
              )}
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
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('Blog') + '?f=blg'} onClick={() => handleNavClick('Blog')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'Blog' && location.search.includes('f=blg') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link to={createPageUrl('Home') + '?f=tts'} onClick={() => handleNavClick('Home')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'Home' && location.search.includes('f=tts') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Text to Speech
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('Home') + '?f=stv'} onClick={() => handleNavClick('Home')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'Home' && location.search.includes('f=stv') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Speech to Video
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('Home') + '?f=scribe'} onClick={() => handleNavClick('Home')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'Home' && location.search.includes('f=scribe') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Scribe ⭐
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('Home') + '?f=cr'} onClick={() => handleNavClick('Home')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'Home' && location.search.includes('f=cr') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Content Repurposer
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl('Home') + '?f=pub'} onClick={() => handleNavClick('Home')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'Home' && location.search.includes('f=pub') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Publisher
                  </Link>
                </li>
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
                <li>
                  <Link to={createPageUrl('Safety') + '?f=sft'} onClick={() => handleNavClick('Safety')} className={`text-sm transition-colors hover:text-[#00d9ff] ${currentPageName === 'Safety' && location.search.includes('f=sft') ? 'text-[#00d9ff] font-semibold' : 'text-gray-400'}`}>
                    Safety
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
          <div className="mt-8 pt-8 border-t border-white/5 flex justify-center space-x-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://linkedin.com/company/incubrix" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
            <a href="https://www.instagram.com/incubrix_official?igsh=Y2ZpNms4MWRuc2Vs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
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