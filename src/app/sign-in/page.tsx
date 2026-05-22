'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Mail, Lock, ArrowRight, Compass } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function SignInPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user is already authenticated, redirect them to dashboard directly
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);
    const trimmedEmail = email.trim();
    const trimmedPassword = password;

    if (!trimmedEmail || !trimmedPassword) {
      setError('Please fill in all credentials.');
      toast.error('Credentials cannot be empty');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Authenticating security clearance...');

    try {
      await authService.login({ email: trimmedEmail, password: trimmedPassword });
      toast.success('Clearance granted! Welcome hunter.', { id: toastId });
      router.push('/dashboard');
    } catch (err: any) {
      const errMsg = err?.message || 'Failed to authenticate.';
      setError(errMsg);
      toast.error(errMsg, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-pulse text-indigo-400 font-mono tracking-widest uppercase">
          Verifying Session State...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 sm:px-6 relative overflow-hidden">
      {/* Background neon grid / glowing particles */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 relative">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-indigo-600 to-teal-400 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-white/10 mb-4 group hover:rotate-12 transition-transform duration-300">
            <Compass className="h-9 w-9 text-white group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans sm:text-4xl text-glow">
            DASHUNT
          </h1>
          <p className="mt-2 text-sm text-gray-400 font-mono">
            GPS Treasure Hunting Command Terminal
          </p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-xl font-bold text-indigo-200 mb-6 font-sans">
            Authentication Required
          </h2>

          <form className="space-y-5" onSubmit={handleSignIn}>
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-lg p-3.5 text-center font-mono">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="hunter@dashunt.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-900/60 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all glow-indigo font-mono text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 font-mono">
                  Access Key
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-gray-900/60 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all glow-indigo font-mono text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <Button
              type="submit"
              className="w-full mt-4 h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 border border-indigo-400/20 rounded-xl text-sm font-semibold tracking-widest text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all font-mono uppercase"
              isLoading={isSubmitting}
            >
              {!isSubmitting && (
                <>
                  Establish Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
              {isSubmitting && 'Authenticating...'}
            </Button>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="text-center font-mono">
          <p className="text-sm text-gray-500">
            First time in the field?{' '}
            <Link
              href="/signup"
              className="text-indigo-400 hover:text-indigo-300 transition-colors font-semibold underline underline-offset-4"
            >
              Register coordinates
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
