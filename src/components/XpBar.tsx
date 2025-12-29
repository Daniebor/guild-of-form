'use client';

import { motion } from 'framer-motion';
import { useUserStore, getLevel, getRankTitle } from '@/store/userStore';

export default function XpBar() {
    const { xp } = useUserStore();
    const level = getLevel(xp);
    const rankTitle = getRankTitle(level);
    const xpForThisLevel = 1000;
    const xpForCurrentLevel = (level - 1) * 1000;
    const currentLevelXp = xp - xpForCurrentLevel;
    const progress = (currentLevelXp / xpForThisLevel) * 100;

    return (
        <section className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-primary font-bold tracking-wider text-xs uppercase mb-1">Current Rank</p>
                    <h3 className="text-2xl font-bold text-white">{rankTitle}</h3>
                </div>
                <p className="text-text-muted text-sm font-medium"><span className="text-white">{currentLevelXp}</span> / {xpForThisLevel} XP</p>
            </div>
            <div className="relative h-6 w-full bg-[#322d24] rounded-full overflow-hidden shadow-inner border border-white/5">
                <motion.div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-800 via-yellow-600 to-primary rounded-full"
                    style={{
                        boxShadow: '0 0 15px rgba(245, 159, 10, 0.4)'
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                </motion.div>
            </div>
            <div className="flex justify-between text-xs text-text-muted">
                <span>Level {level}</span>
                <span>Level {level + 1}</span>
            </div>
        </section>
    );
}