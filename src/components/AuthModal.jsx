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
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#151d45] border-cyan-500/20 text-white max-w-2xl w-full">
        <DialogHeader>
          {/* Logo */}
          <div className="flex flex-col items-center pt-4 pb-2">
            <div className="w-16 h-16 transform transition-transform duration-300">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(0,217,255,0.4)]">
                <path d="M28 20C23 20 23 20 23 25V75C23 80 23 80 28 80L52 65V35L28 20Z" fill="#0080ff" />
                <path d="M62 35L82 48C86 50 86 50 82 52L62 65V35Z" fill="#00ffff" />
                <circle cx="57" cy="12" r="5" fill="#00ffff" />
                <path d="M52 25C52 20 54 18 57 18C60 18 62 20 62 25V35H52V25Z" fill="#00ffff" />
                <rect x="52" y="35" width="10" height="30" fill="#050a24" />
                <rect x="52" y="65" width="10" height="10" fill="#00ffff" />
                <path d="M52 75L57 85L62 75H52Z" fill="#004080" />
              </svg>
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