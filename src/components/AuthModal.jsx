import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { createPageUrl } from '../utils';

export default function AuthModal({ open, onOpenChange }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(true);
  const { loginWithGoogle, loginWithLinkedIn } = useAuth();

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

  const handleLinkedInSignIn = async () => {
    if (!agreed) {
      setError('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await loginWithLinkedIn();
    } catch (err) {
      setError('LinkedIn Sign-In failed. Please try again.');
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      setError('');
      setLoading(false);
      setAgreed(true);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#151d45] border-cyan-500/20 text-white max-w-2xl w-full">
        <DialogHeader>
          {/* Logo */}
          <div className="flex flex-col items-center pt-4 pb-2">
            <div className="w-16 h-16 transform transition-transform duration-300">
              <img src="/logo.jpeg" alt="IncuBrix" className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(0,217,255,0.4)]" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold text-center">
            Welcome to IncuBrix
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-6 px-4">
          <p className="text-gray-400 text-center text-base">
            Sign in to access your AI-powered creator workspace.
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {/* Google Sign In */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-10 text-xl bg-white hover:bg-gray-100 text-gray-800 font-bold shadow-lg shadow-cyan-500/10 rounded-2xl"
            >
              <svg className="w-8 h-8 mr-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>
          </motion.div>

          {/* LinkedIn Sign In */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleLinkedInSignIn}
              disabled={loading}
              className="w-full py-10 text-xl font-bold shadow-lg rounded-2xl text-white"
              style={{ backgroundColor: '#0A66C2' }}
            >
              <svg className="w-8 h-8 mr-4" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Continue with LinkedIn
            </Button>
          </motion.div>

          {/* Checkbox + Terms */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-0.5">
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
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${agreed
                  ? 'bg-cyan-500 border-cyan-500'
                  : 'bg-transparent border-gray-500 group-hover:border-cyan-400'
                  }`}
              >
                {agreed && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-400 leading-relaxed">
              By continuing, I agree to the{' '}
              <Link
                to={createPageUrl('Terms')}
                onClick={() => onOpenChange(false)}
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to={createPageUrl('Privacy')}
                onClick={() => onOpenChange(false)}
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>
      </DialogContent>
    </Dialog>
  );
}