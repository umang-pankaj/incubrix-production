import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Eye, EyeOff, ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { createPageUrl } from '../utils';

export default function AuthModal({ open, onOpenChange }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgot'
  const [forgotPasswordStep, setForgotPasswordStep] = useState('email'); // 'email', 'otp', 'reset'
  const [showOtpSentPopup, setShowOtpSentPopup] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const { loginWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    if (!agreed) {
      setError('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError('Google Sign-In failed. Please try again.');
      setLoading(false);
    }
  };


  React.useEffect(() => {
    if (open) {
      setError('');
      setLoading(false);
      setAgreed(true);
      setView('login');
      setForgotPasswordStep('email');
      setShowOtpSentPopup(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setOtp('');
      setShowOtpField(false);
      setError('');
    }
  }, [open]);

  useEffect(() => {
    if (error) {
      setIsShaking(true);
      const shakeTimer = setTimeout(() => setIsShaking(false), 500);
      const hideTimer = setTimeout(() => setError(''), 2000);
      return () => {
        clearTimeout(shakeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [error]);

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };
 
  const validateEmailFormat = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePasswordRules = (pass) => {
    return {
      length: pass.length >= 8,
      number: /\d/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass)
    };
  };

  const PasswordRules = ({ password, visible }) => {
    if (!visible && !password) return null;
    const rules = validatePasswordRules(password);
    
    const RuleItem = ({ label, met }) => (
      <div className={`flex items-center gap-2 text-[11px] transition-colors ${met ? 'text-emerald-400' : 'text-gray-500'}`}>
        <div className={`w-1 h-1 rounded-full ${met ? 'bg-emerald-400' : 'bg-gray-600'}`} />
        <span>{label}</span>
      </div>
    );

    return (
      <motion.div 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 space-y-2 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm shadow-inner"
      >
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <p className="text-[10px] uppercase font-black text-cyan-400/80">Security Requirements</p>
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          <RuleItem label="8+ Characters" met={rules.length} />
          <RuleItem label="Includes Number" met={rules.number} />
          <RuleItem label="Special Character (@#...)" met={rules.special} />
        </div>
      </motion.div>
    );
  };

  const handleSignIn = async () => {
    if (!email) {
      setError('Enter email address');
      return;
    }
    if (!validateEmailFormat(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Enter password');
      return;
    }
    setError('');
    setLoading(true);
    // Add signin logic here
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleSignUp = async () => {
    if (!email) {
      setError('Enter email address');
      return;
    }
    if (!validateEmailFormat(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Enter password');
      return;
    }
    if (!confirmPassword) {
      setError('Please confirm your password');
      return;
    }
    
    const rules = validatePasswordRules(password);
    if (!rules.length || !rules.number || !rules.special) {
      setError('Password must meet all requirements');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('Please accept the Terms and Privacy Policy.');
      return;
    }
    
    if (!showOtpField) {
      setError('');
      setShowOtpField(true);
      return;
    }

    if (!otp) {
      setError('Please enter the OTP sent to your email.');
      return;
    }

    setError('');
    setLoading(true);
    // Add signup logic here
    setTimeout(() => {
      setLoading(false);
      // setView('login'); or handle success
    }, 2000);
  };

  const handleForgotPassword = async () => {
    if (!validateEmailFormat(email)) {
      setError('invalid email');
      return;
    }
    setError('');
    setLoading(true);
    
    if (forgotPasswordStep === 'email') {
      // Simulate sending OTP
      setTimeout(() => {
        setLoading(false);
        setShowOtpSentPopup(true);
        setTimeout(() => {
          setShowOtpSentPopup(false);
          setForgotPasswordStep('otp');
        }, 2000);
      }, 1000);
    } else if (forgotPasswordStep === 'otp') {
      if (!otp) {
        setError('Please enter the OTP.');
        return;
      }
      setTimeout(() => {
        setLoading(false);
        setForgotPasswordStep('reset');
      }, 1000);
    } else if (forgotPasswordStep === 'reset') {
      if (!password || !confirmPassword) {
        setError('Please enter password and confirm password.');
        return;
      }
      const rules = validatePasswordRules(password);
      if (!rules.length || !rules.number || !rules.special) {
        setError('Password must meet all requirements');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setTimeout(() => {
        setLoading(false);
        setView('login');
        setError('');
      }, 1000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#151d45] border-cyan-500/20 text-white max-w-[900px] w-[95vw] p-0 overflow-hidden shadow-2xl rounded-3xl border-0">
        <div className="flex flex-col md:flex-row w-full min-h-[600px] md:h-auto md:min-h-[700px] max-h-[95vh]">
          {/* Left Panel - Branding */}
          <div className="hidden md:flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#151d45] to-[#0f172a] relative overflow-hidden p-10 border-r border-cyan-500/10">
            {/* Simple abstract background shapes */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center max-w-[280px]">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-28 h-28 mb-10 relative group"
              >
                <div className="absolute inset-0 bg-cyan-400/20 rounded-3xl blur-2xl group-hover:bg-cyan-400/40 transition-all duration-700" />
                <img 
                  src="/assets/incubrix-logo.jpg" 
                  alt="IncuBrix" 
                  className="w-full h-full object-contain rounded-2xl relative z-10 shadow-2xl"
                />
              </motion.div>
              <h2 className="text-3xl font-black tracking-tight text-white mb-2">IncuBrix</h2>
              <div className="h-0.5 w-12 bg-cyan-500/40 mb-4 rounded-full" />
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="w-full md:w-[480px] flex flex-col p-8 md:p-10 relative bg-[#151d45] border-l border-white/5">
            {view !== 'login' && (
              <button 
                onClick={() => setView('login')}
                className="absolute top-6 left-6 p-2 text-gray-400 hover:text-white transition-colors group flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-medium">Back</span>
              </button>
            )}

            <div className={`${view !== 'login' ? 'mt-6' : ''} mb-6 text-left space-y-1.5`}>
              <h2 className="text-2xl font-bold text-white">
                {view === 'login' && "Welcome to IncuBrix"}
                {view === 'signup' && "Create Account"}
                {view === 'forgot' && "Reset Password"}
              </h2>
              <p className="text-gray-400 text-sm">
                {view === 'login' && "Sign in to access your workspace."}
                {view === 'signup' && ""}
                {view === 'forgot' && (
                  forgotPasswordStep === 'email' ? "Enter your email to receive an OTP." :
                  forgotPasswordStep === 'otp' ? `Enter the OTP sent to ${email}` :
                  "Enter your new password below."
                )}
              </p>
            </div>

            <div className="space-y-4 flex-1 flex flex-col">
              {/* OTP Sent Popup */}
              {showOtpSentPopup && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4 text-center backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                >
                  <p className="text-cyan-300 text-sm font-semibold flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    OTP has been sent to {email}
                  </p>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div 
                  variants={shakeVariants}
                  animate={isShaking ? "shake" : ""}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2 mb-2"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{error}</p>
                </motion.div>
              )}

              {/* Main Content Area */}
              {view === 'login' ? (
                <>
                  {/* Social Sign In */}
                  <div className="space-y-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <button 
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black py-4 px-4 rounded-xl font-semibold transition-all shadow-lg disabled:opacity-70"
                      >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                      </button>
                    </motion.div>

                  </div>

                  {/* Divider */}
                  <div className="relative py-1 mt-4 mb-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-700/50" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-[#151d45] px-4 text-gray-500 font-medium tracking-wide uppercase">or</span>
                    </div>
                  </div>

                  {/* Email & Password Input for Login */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[13px] font-medium text-gray-400 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-gray-400 mb-1.5">Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                          placeholder="••••••••"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                        >
                          {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="mt-2 text-right">
                        <button 
                          type="button" 
                          onClick={() => {
                            setView('forgot');
                            setForgotPasswordStep('email');
                          }}
                          className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 text-center">
                      <button 
                        type="button"
                        disabled={loading}
                        className="w-full py-4 text-[15px] font-semibold bg-white/10 hover:bg-white/15 border border-white/5 text-white rounded-xl transition-all mb-4 active:scale-[0.98] disabled:opacity-50"
                        onClick={handleSignIn}
                      >
                        {loading ? "Processing..." : "Continue"}
                      </button>
                      <p className="text-sm text-gray-400">
                        Don't have an account?{' '}
                        <button 
                          type="button" 
                          className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                          onClick={() => setView('signup')}
                        >
                          Sign Up
                        </button>
                      </p>
                    </div>
                  </div>
                </>
              ) : view === 'forgot' ? (
                <div className="space-y-4">
                  {forgotPasswordStep === 'email' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <label className="block text-[13px] font-medium text-gray-400 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </motion.div>
                  )}

                  {forgotPasswordStep === 'otp' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <label className="block text-[13px] font-medium text-gray-400 mb-1.5">Enter OTP</label>
                      <input 
                        type="text" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Enter 6-digit OTP"
                      />
                    </motion.div>
                  )}

                      <div>
                        <label className="block text-[13px] font-medium text-gray-400 mb-1.5">New Password</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="••••••••"
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </div>
                        <PasswordRules password={password} visible={isPasswordFocused} />
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-gray-400 mb-1.5">Confirm New Password</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full bg-black/20 border ${password && confirmPassword ? (password === confirmPassword ? 'border-emerald-500/50' : 'border-red-500/50') : 'border-gray-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors`}
                            placeholder="••••••••"
                          />
                          {password && confirmPassword && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              {password === confirmPassword ? 
                                <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-tighter">Match</span> : 
                                <span className="text-red-400 text-[10px] font-bold uppercase tracking-tighter">No Match</span>
                              }
                            </div>
                          )}
                        </div>
                      </div>

                  <div className="pt-4">
                    <button 
                      type="button"
                      disabled={loading}
                      className="w-full py-4 text-[15px] font-semibold bg-white/10 hover:bg-white/15 border border-white/5 text-white rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
                      onClick={handleForgotPassword}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        forgotPasswordStep === 'email' ? "Continue" :
                        forgotPasswordStep === 'otp' ? "Verify OTP" :
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="block text-[13px] font-medium text-gray-400 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                        placeholder="name@example.com"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="mb-1.5">
                        <label className="block text-[13px] font-medium text-gray-400">Password</label>
                      </div>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => setIsPasswordFocused(false)}
                          className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                          placeholder="••••••••"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                        >
                          {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                      <PasswordRules password={password} visible={isPasswordFocused} />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-[13px] font-medium text-gray-400 mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full bg-black/20 border ${password && confirmPassword ? (password === confirmPassword ? 'border-emerald-500/50' : 'border-red-500/50') : 'border-gray-700'} rounded-xl px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                          placeholder="••••••••"
                        />
                        {password && confirmPassword && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            {password === confirmPassword ? 
                              <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border border-emerald-500/20">Match</span> : 
                              <span className="bg-red-500/10 text-red-400 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border border-red-500/20">No Match</span>
                            }
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {showOtpField && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <label className="block text-[13px] font-medium text-gray-400 mb-1.5">Enter OTP</label>
                        <input 
                          type="text" 
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="w-full bg-black/20 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                          placeholder="123456"
                        />
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="pt-2"
                    >
                      <button 
                        type="button"
                        disabled={loading}
                        className="w-full py-4 text-[15px] font-semibold bg-white/10 hover:bg-white/15 border border-white/5 text-white rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
                        onClick={handleSignUp}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          showOtpField ? "Sign Up" : "Verify email"
                        )}
                      </button>
                    </motion.div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Links & Consent */}
            <div className="mt-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      if (e.target.checked) setError('');
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      agreed
                        ? 'bg-cyan-500 border-cyan-500'
                        : 'bg-transparent border-gray-500 group-hover:border-cyan-400'
                    }`}
                  >
                    {agreed && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[12px] text-gray-500 leading-snug">
                  By proceeding, you agree to our{' '}
                  <Link to={createPageUrl('Terms')} onClick={() => onOpenChange(false)} className="text-gray-300 font-medium hover:text-white transition-colors">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link to={createPageUrl('Privacy')} onClick={() => onOpenChange(false)} className="text-gray-300 font-medium hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}