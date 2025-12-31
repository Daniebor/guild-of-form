"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import { supabase } from "@/lib/supabase";
import { ForgeHeader } from "@/components/layout/ForgeHeader";
import { Button } from "@/components/ui/Button";
import { User, LogOut, Trash2, Shield, Flame, Star, ChevronLeft, Award } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { xp, streak, completedNodes, resetProgress } = useUserStore();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "Architect");
      }
      setLoading(false);
    };
    getUser();
  }, []);

  // Simple Rank Calculation
  const getRank = (xp: number) => {
    if (xp >= 5000) return { title: "Grand Architect", color: "text-blueFlame" };
    if (xp >= 2500) return { title: "Master Sculptor", color: "text-amber-400" };
    if (xp >= 1000) return { title: "Journeyman", color: "text-amber-600" };
    if (xp >= 300) return { title: "Apprentice", color: "text-slate-200" };
    return { title: "Novice", color: "text-slate-500" };
  };

  const rank = getRank(xp);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // Hard reload to clear state
  };

  const handleHardReset = async () => {
    const confirmText = "DELETE";
    const input = prompt(`This will wipe ALL progress from the Cloud. Type "${confirmText}" to confirm.`);
    
    if (input === confirmText) {
      // 1. Reset Local Store
      resetProgress();
      
      // 2. Reset Supabase (if logged in)
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('profiles').update({
          xp: 0,
          streak: 0,
          completed_nodes: [],
          unlocked_chapters: ['chapter-1']
        }).eq('id', user.id);
      }

      window.location.reload();
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-void text-slate-200 pb-20">
      <ForgeHeader />

      <main className="max-w-2xl mx-auto px-6 pt-12 space-y-12">
        
        {/* Navigation */}
        <Link href="/map" className="inline-flex items-center text-slate-500 hover:text-amber-500 transition-colors">
          <ChevronLeft size={16} className="mr-1" /> Return to Map
        </Link>

        {/* Identity Card */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-500 shadow-xl">
            <User size={48} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-wide">{email?.split('@')[0]}</h1>
            <p className={`text-sm font-mono uppercase tracking-widest mt-2 ${rank.color}`}>
              {rank.title}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 flex flex-col items-center gap-2">
            <Flame className="text-amber-500" size={24} />
            <span className="text-2xl font-bold text-white">{streak}</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500">Day Streak</span>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 flex flex-col items-center gap-2">
            <Star className="text-amber-500" size={24} />
            <span className="text-2xl font-bold text-white">{xp}</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500">Total XP</span>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 flex flex-col items-center gap-2">
            <Award className="text-blue-500" size={24} />
            <span className="text-2xl font-bold text-white">{completedNodes.length}</span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500">Rituals Done</span>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-6 pt-8 border-t border-slate-800">
          <h2 className="text-lg font-serif text-slate-400">Settings</h2>
          
          <Button 
            onClick={handleLogout} 
            variant="ghost" 
            className="w-full justify-start gap-3 border-slate-800 hover:border-slate-600 hover:bg-slate-800"
          >
            <LogOut size={18} /> Sign Out
          </Button>

          <div className="pt-8">
            <h3 className="text-xs font-mono uppercase text-red-900 mb-4 tracking-widest font-bold">Danger Zone</h3>
            <Button 
              onClick={handleHardReset} 
              variant="danger" 
              className="w-full justify-start gap-3"
            >
              <Trash2 size={18} /> Reset Character Progress
            </Button>
            <p className="text-xs text-red-900/60 mt-3 pl-1">
              This action cannot be undone. All XP and progress will be lost forever.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}