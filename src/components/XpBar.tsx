'use client';

import { motion } from 'framer-motion';
import { useUserStore, getLevel } from '../store/userStore';

export default function XpBar() {
  const { xp } = useUserStore();
  const level = getLevel(xp);
  const xpForNextLevel = 1000;
  const xpForCurrentLevel = (level - 1) * 1000;
  const currentLevelXp = xp - xpForCurrentLevel;
  const progress = (currentLevelXp / xpForNextLevel) * 100;

  return (
    <div className="relative w-full bg-dungeon-wall rounded-full h-8 border-2 border-stone overflow-hidden">
      <motion.div
        className="bg-primary h-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: [0.17, 0.67, 0.83, 0.67] }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-text-main font-bold" style={{ textShadow: '1px 1px 2px black' }}>
          {currentLevelXp} / {xpForNextLevel} XP
        </span>
      </div>
    </div>
  );
}