"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/store/userStore";
import { supabase } from "@/lib/supabase";
import { Flame, Star, User } from "lucide-react";
import Link from "next/link";
import { AuthModal } from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/Button";

export const ForgeHeader = () => {
  const [mounted, setMounted] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const { xp, streak, syncWithSupabase } = useUserStore();

  useEffect(() => {
    setMounted(true);
    
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        syncWithSupabase(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        syncWithSupabase(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [syncWithSupabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const getFireColor = () => {
    if (streak > 59) return "text-blueFlame drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]";
    if (streak > 14) return "text-amber-blaze drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]";
    if (streak > 3) return "text-amber drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]";
    return "text-slate-500";
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-void/90 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
             <span className="font-serif font-bold text-lg md:text-xl text-slate-100 group-hover:text-amber transition-colors tracking-widest">
               THE SCULPTOR'S SAGA
             </span>
          </Link>

          {mounted ? (
            <div className="flex items-center gap-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 group cursor-help" title="Forge Heat">
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

              <div className="flex items-center gap-2" title="XP">
                <Star className="w-4 h-4 text-amber fill-amber/20" />
                <span className="font-mono font-bold text-slate-100 leading-none">
                  {xp.toLocaleString()} <span className="text-[10px] text-slate-500 uppercase">XP</span>
                </span>
              </div>

              {/* Auth Button */}
              {session ? (
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Logout"
                >
                  <User size={18} />
                </button>
              ) : (
                <Button 
                  onClick={() => setIsAuthOpen(true)} 
                  size="sm" 
                  variant="ghost"
                  className="hidden md:inline-flex"
                >
                  Login
                </Button>
              )}
            </div>
          ) : (
            <div className="flex gap-4 opacity-50">
              <div className="w-12 h-6 bg-slate-800 rounded animate-pulse" />
              <div className="w-16 h-6 bg-slate-800 rounded animate-pulse" />
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};