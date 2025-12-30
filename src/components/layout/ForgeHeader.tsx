"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/store/userStore";
import { Flame, Star } from "lucide-react";
import Link from "next/link";

export const ForgeHeader = () => {
  // Hydration fix: Zustand persist reads from localStorage, which isn't available on the server.
  // We wait until the component is mounted on the client to render the stats.
  const [mounted, setMounted] = useState(false);
  const { xp, streak } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine Fire Color based on 'Heat' levels
  const getFireColor = () => {
    if (streak > 59) return "text-blueFlame drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"; // Star-Heart
    if (streak > 14) return "text-amber-blaze drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"; // Inferno
    if (streak > 3) return "text-amber drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]"; // Kindled
    return "text-slate-500"; // Cold Iron
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-void/90 backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Home Link */}
        <Link href="/map" className="flex items-center gap-2 group">
           <span className="font-serif font-bold text-lg md:text-xl text-slate-100 group-hover:text-amber transition-colors tracking-widest">
             THE SCULPTOR'S SAGA
           </span>
        </Link>

        {/* Stats Container */}
        {mounted ? (
          <div className="flex items-center gap-6 animate-in fade-in duration-500">
            {/* Streak Indicator */}
            <div className="flex items-center gap-2 group cursor-help" title="Forge Heat (Daily Streak)">
              <Flame className={`w-5 h-5 transition-colors duration-500 ${getFireColor()}`} />
              <div className="flex flex-col md:flex-row md:items-baseline">
                <span className={`font-mono font-bold leading-none ${streak > 0 ? 'text-slate-100' : 'text-slate-500'}`}>
                  {streak} 
                </span>
                <span className="hidden md:inline-block text-[10px] text-slate-500 uppercase tracking-wider ml-1">
                  Days
                </span>
              </div>
            </div>

            {/* XP Indicator */}
            <div className="flex items-center gap-2" title="Total Experience">
              <Star className="w-4 h-4 text-amber fill-amber/20" />
              <span className="font-mono font-bold text-slate-100 leading-none">
                {xp.toLocaleString()} <span className="text-[10px] text-slate-500 uppercase">XP</span>
              </span>
            </div>
          </div>
        ) : (
          /* Skeleton Loading State for hydration */
          <div className="flex gap-4 opacity-50">
            <div className="w-12 h-6 bg-slate-800 rounded animate-pulse" />
            <div className="w-16 h-6 bg-slate-800 rounded animate-pulse" />
          </div>
        )}
      </div>
    </header>
  );
};