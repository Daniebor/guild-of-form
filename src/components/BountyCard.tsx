'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { dailyQuests } from '@/lib/data/quests';
import { DailyQuest } from '@/lib/types';
import { ClipboardList, Bone, Clock, BarChart, ArrowRight } from 'lucide-react';

export default function BountyCard() {
  const { activePath, addXp } = useUserStore();
  const [quest, setQuest] = useState<DailyQuest | null>(null);

  const getNewQuest = () => {
    const availableQuests = dailyQuests.filter(q => q.category === activePath || q.category === 'foundation');
    if (availableQuests.length === 0) {
      setQuest(null);
      return;
    }
    const randomQuest = availableQuests[Math.floor(Math.random() * availableQuests.length)];
    setQuest(randomQuest);
  };

  useEffect(() => {
    getNewQuest();
  }, [activePath]);

  const handleComplete = () => {
    if (quest) {
      addXp(quest.xp);
      getNewQuest();
    }
  };

  if (!quest) {
    return (
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <ClipboardList className="text-primary" />
                Daily Bounty
            </h3>
            <span className="text-xs text-text-muted">Resets in ...</span>
        </div>
        <div className="group relative w-full overflow-hidden rounded-xl border border-border-dark bg-card-dark p-6 text-center">
             <p className="text-text-muted">No bounties available for your current path.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <ClipboardList className="text-primary" />
                Daily Bounty
            </h3>
            <span className="text-xs text-text-muted">Resets in 12h 45m</span>
        </div>
        <div className="group relative w-full overflow-hidden rounded-xl border border-border-dark bg-card-dark shadow-2xl transition-all hover:border-primary/40 hover:shadow-[0_0_20px_rgba(245,159,10,0.1)]">
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="shrink-0 relative">
                    <div className="size-20 rounded-xl bg-[#1e1a14] border border-border-dark flex items-center justify-center shadow-inner group-hover:border-primary/50 transition-colors">
                        <Bone className="text-4xl text-text-muted group-hover:text-primary transition-colors" />
                    </div>
                    <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-500 to-amber-700 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg border border-yellow-400/30">
                        +{quest.xp} XP
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{quest.text}</h4>
                    <p className="text-text-muted text-sm leading-relaxed max-w-xl">
                        A daily challenge to hone your skills and earn experience.
                    </p>
                    <div className="flex gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                            <Clock className="w-4 h-4" />
                            <span>~15-30 mins</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                            <BarChart className="w-4 h-4" />
                            <span>{quest.category}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-auto mt-4 md:mt-0">
                    <button 
                        onClick={handleComplete}
                        className="w-full md:w-auto min-w-[160px] cursor-pointer relative overflow-hidden rounded-lg bg-primary hover:bg-primary-dark text-black font-bold text-sm px-6 py-3 transition-all transform active:scale-95 shadow-[0_0_15px_rgba(245,159,10,0.3)] hover:shadow-[0_0_20px_rgba(245,159,10,0.6)] flex items-center justify-center gap-2 group/btn">
                        <span>Submit Work</span>
                        <ArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
}