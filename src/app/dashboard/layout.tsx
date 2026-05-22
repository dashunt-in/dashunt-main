'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Compass, LogOut, Menu, X, User as UserIcon, Shield, Trophy } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/authService';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { appUser } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const toastId = toast.loading('Terminating secure terminal session...');
    try {
      await authService.logout();
      toast.success('Session ended. Stay safe, hunter.', { id: toastId });
      router.push('/sign-in');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to logout.', { id: toastId });
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
        {/* Neon accent grid header border */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-teal-400 w-full"></div>
        
        {/* Dashboard Shell Navigation */}
        <header className="border-b border-white/10 bg-gray-900/60 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo / Brand */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-gradient-to-tr from-indigo-600 to-teal-400 rounded-lg flex items-center justify-center border border-white/10">
                  <Compass className="h-5.5 w-5.5 text-white animate-pulse" />
                </div>
                <Link href="/dashboard" className="text-xl font-bold tracking-wider text-glow font-sans text-white">
                  DASHUNT
                </Link>
              </div>

              {/* Desktop Nav Items */}
              <nav className="hidden md:flex items-center gap-6 font-mono text-sm">
                <Link href="/dashboard" className="text-indigo-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  Terminal
                </Link>
                <span className="text-gray-600">|</span>
                <span className="text-gray-500 hover:text-gray-300 cursor-not-allowed transition-colors select-none" title="Gameplay systems coming soon!">
                  Hunts
                </span>
                <span className="text-gray-500 hover:text-gray-300 cursor-not-allowed transition-colors select-none" title="Leaderboards coming soon!">
                  Leaderboard
                </span>
              </nav>

              {/* User Actions Panel */}
              <div className="hidden md:flex items-center gap-4">
                {/* User details capsule */}
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-gray-900 border border-white/5 font-mono text-xs">
                  <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 border border-indigo-500/30">
                    <UserIcon className="h-3 w-3" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-200 truncate max-w-[120px]">
                      {appUser?.name || 'Hunter'}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Shield className="h-2.5 w-2.5 text-teal-400" />
                      <span className="text-[9px] uppercase text-teal-400 font-bold tracking-widest">
                        {appUser?.role || 'user'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/30 text-rose-400 transition-all cursor-pointer font-mono text-xs hover:-translate-y-0.5 active:translate-y-0"
                  title="Secure Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>

              {/* Mobile menu trigger */}
              <div className="flex md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-400 hover:text-white p-2 rounded-lg"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>

            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-900 border-b border-white/10 px-4 pt-2 pb-4 space-y-4 font-mono text-sm">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-indigo-300 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
              >
                Dashboard Terminal
              </Link>
              
              <div className="border-t border-white/5 pt-3">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-950/60 border border-white/5">
                  <UserIcon className="h-4 w-4 text-indigo-400" />
                  <div>
                    <div className="font-semibold text-gray-200 text-xs">
                      {appUser?.name || 'Hunter'}
                    </div>
                    <div className="text-[10px] uppercase text-teal-400 font-bold tracking-widest mt-0.5">
                      Role: {appUser?.role || 'user'}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-bold"
              >
                <LogOut className="h-4 w-4" />
                Secure Log Out
              </button>
            </div>
          )}
        </header>

        {/* Dashboard Pages */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
