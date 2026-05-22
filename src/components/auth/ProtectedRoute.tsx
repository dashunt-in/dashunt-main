'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white overflow-hidden relative">
        {/* Glow backdrop circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative flex flex-col items-center">
          {/* Outer Cyber Radar Ring */}
          <div className="relative w-24 h-24 rounded-full border border-indigo-500/30 flex items-center justify-center animate-[spin_6s_linear_infinite]">
            <div className="absolute w-20 h-20 rounded-full border border-dashed border-teal-500/40 animate-[spin_3s_linear_infinite_reverse]"></div>
            
            {/* Compass Needle */}
            <div className="absolute top-1 bottom-1 w-0.5 bg-gradient-to-t from-transparent via-indigo-400 to-indigo-500 rounded-full"></div>
            <div className="absolute left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-teal-500/10 rounded-full"></div>
            
            {/* North Indicator */}
            <span className="absolute -top-3 text-[9px] font-mono text-indigo-400 font-bold select-none tracking-widest">N</span>
          </div>

          {/* Glowing Center Dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_#14b8a6] z-10"></div>

          {/* Premium Loading Text */}
          <div className="mt-8 flex flex-col items-center gap-1.5 text-center">
            <h3 className="text-sm font-semibold tracking-widest text-indigo-200 uppercase font-mono animate-pulse">
              Initializing Dashunt Guard
            </h3>
            <p className="text-xs text-gray-500 font-mono tracking-wider">
              Securing GPS Connection...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Prevent flash of content before redirecting if not authenticated
  if (!user) {
    return null;
  }

  return <>{children}</>;
}

