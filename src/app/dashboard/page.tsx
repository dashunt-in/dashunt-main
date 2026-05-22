'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { Compass, Trophy, Activity, Calendar, Shield, Mail, User as UserIcon, Terminal, Radio } from 'lucide-react';

export default function DashboardPage() {
  const { appUser } = useAuth();

  const getJoinedDate = () => {
    if (!appUser?.createdAt) return 'Awaiting authorization...';
    try {
      // Safely support both firestore Timestamp class and serialized timestamps
      const date = typeof appUser.createdAt.toDate === 'function' 
        ? appUser.createdAt.toDate() 
        : new Date(appUser.createdAt.seconds ? appUser.createdAt.seconds * 1000 : appUser.createdAt);
      
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return 'Active Service';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Welcome Banner Commander Card */}
      <div className="relative overflow-hidden glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
        {/* Subtle grid background pattern and gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-teal-400 font-bold uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              GPS Field Connection Active
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl text-glow">
              Welcome back, {appUser?.name || 'Hunter'}
            </h1>
            <p className="text-sm text-gray-400 font-mono">
              Secure console active. Ready for navigation coordinates.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap gap-3 font-mono text-xs">
            <div className="px-3.5 py-2 rounded-xl bg-gray-900/80 border border-white/5 flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-400" />
              <div>
                <span className="text-gray-500 block text-[9px] uppercase tracking-widest">Role Clearance</span>
                <span className="text-teal-400 font-bold uppercase tracking-wider">{appUser?.role || 'User'}</span>
              </div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-gray-900/80 border border-white/5 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-indigo-400" />
              <div>
                <span className="text-gray-500 block text-[9px] uppercase tracking-widest">Enlistment Date</span>
                <span className="text-gray-200 font-semibold">{getJoinedDate()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1: Joined Hunts */}
        <Card className="glass-panel border-white/10 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-mono text-gray-400 uppercase tracking-wider">
              Assigned Coordinates
            </CardTitle>
            <Compass className="h-5 w-5 text-indigo-400" />
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-4xl font-extrabold text-white tracking-tight">
              {appUser?.joinedHuntsCount ?? 0}
            </div>
            <p className="text-xs text-gray-500 font-mono">
              Active GPS hunts joined in the field
            </p>
          </CardContent>
        </Card>

        {/* Metric 2: Progress Percentage */}
        <Card className="glass-panel border-white/10 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-mono text-gray-400 uppercase tracking-wider">
              Mission Progress
            </CardTitle>
            <Activity className="h-5 w-5 text-teal-400" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <div className="text-4xl font-extrabold text-white tracking-tight">
                {appUser?.progress ?? 0}%
              </div>
              <span className="text-xs font-mono text-teal-400 font-semibold">Ready</span>
            </div>
            {/* Progress track */}
            <div className="w-full bg-gray-900 rounded-full h-1.5 border border-white/5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-teal-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${appUser?.progress ?? 0}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Simulation Rank */}
        <Card className="glass-panel border-white/10 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-mono text-gray-400 uppercase tracking-wider">
              Enlistment Rank
            </CardTitle>
            <Trophy className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-4xl font-extrabold text-white tracking-tight">
              Recruit
            </div>
            <p className="text-xs text-gray-500 font-mono">
              Participating globally in active grids
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Grid: Profile Console & Grid Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="lg:col-span-1 glass-panel rounded-2xl border border-white/10 p-6 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/5">
            <Terminal className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold font-sans text-white">Hunter Credentials</h2>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <span className="text-gray-500 block uppercase tracking-wider">Callsign</span>
              <div className="flex items-center gap-2.5 px-3 py-2 bg-gray-900 rounded-xl border border-white/5 text-gray-200">
                <UserIcon className="h-4 w-4 text-indigo-400" />
                <span>{appUser?.name || 'Awaiting Sync'}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-gray-500 block uppercase tracking-wider">Email Address</span>
              <div className="flex items-center gap-2.5 px-3 py-2 bg-gray-900 rounded-xl border border-white/5 text-gray-200 truncate" title={appUser?.email ?? ''}>
                <Mail className="h-4 w-4 text-indigo-400" />
                <span className="truncate">{appUser?.email || 'Awaiting Sync'}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-gray-500 block uppercase tracking-wider">Security ID</span>
              <div className="flex items-center gap-2.5 px-3 py-2 bg-gray-900/60 rounded-xl border border-white/5 text-gray-400 truncate">
                <span className="text-[10px] truncate select-all">{appUser?.uid || 'Awaiting Auth'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Feed Console */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-white/10 p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <div className="flex items-center gap-2.5">
                <Radio className="h-5 w-5 text-teal-400 animate-pulse" />
                <h2 className="text-lg font-bold font-sans text-white">Tactical Feed Console</h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 font-semibold uppercase tracking-widest animate-pulse">
                Live Feed
              </span>
            </div>
            
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-indigo-200 flex items-start gap-2.5">
                <span className="text-indigo-400 font-bold select-none">[09:21:40]</span>
                <p>System initialized successfully. Security clearances loaded for {appUser?.name || 'Hunter'}.</p>
              </div>

              <div className="p-3 bg-gray-900 rounded-xl border border-white/5 text-gray-400 flex items-start gap-2.5">
                <span className="text-gray-500 font-bold select-none">[09:21:43]</span>
                <p>GPS tracking active. System waiting for game administrators to publish hunts.</p>
              </div>
              
              <div className="p-3 bg-gray-900 rounded-xl border border-white/5 text-gray-400 flex items-start gap-2.5">
                <span className="text-gray-500 font-bold select-none">[09:22:05]</span>
                <p>Payment systems and global leaderboards locked. Security clearance active.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-gray-500">
            <span>DASHUNT OS v1.0.0</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
              Secure Socket Verified
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
