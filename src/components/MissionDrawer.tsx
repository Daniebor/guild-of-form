'use client';

import { Chapter } from '@/lib/types';
import { X, ExternalLink, Brush, Box } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MissionDrawerProps {
  chapter: Chapter | null;
  onClose: () => void;
}

export default function MissionDrawer({ chapter, onClose }: MissionDrawerProps) {
  const { completedMissionIds } = useUserStore();

  if (!chapter) return null;

  const missionIdsInChapter = chapter.missions.map(m => m.id);
  const areAllMissionsCompleted = missionIdsInChapter.every(id => completedMissionIds.includes(id));
  
  return (
    <AnimatePresence>
      {chapter && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none h-screen items-end">
            <div 
                className="absolute inset-0 pointer-events-auto" 
                onClick={onClose}
            ></div>

            <motion.div
                className="glass-panel w-full max-w-2xl rounded-t-2xl p-1 pointer-events-auto shadow-2xl shadow-black relative z-50 bg-[#141414]/90 backdrop-blur-xl border-t border-[#333]"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing" onClick={onClose}>
                    <div className="w-12 h-1.5 rounded-full bg-gray-600/50"></div>
                </div>

                <div className="px-6 pb-8 pt-2 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-primary text-sm font-bold uppercase tracking-widest mb-1">Current Chapter</h3>
                            <h2 className="text-white text-2xl font-bold leading-tight">{chapter.title}</h2>
                            <p className="text-text-muted text-sm mt-1">{chapter.goal}</p>
                        </div>
                        <div className="size-12 rounded-lg bg-[#2a2418] border border-primary/20 flex items-center justify-center text-primary">
                            <Box className="size-6" />
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        <h4 className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">Objectives</h4>
                        
                        {chapter.missions.map(mission => {
                            const isCompleted = completedMissionIds.includes(mission.id);
                            return (
                                <Link 
                                    key={mission.id}
                                    href={`/mission/${mission.id}`}
                                    onClick={onClose}
                                    className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a]/50 border border-[#333] hover:border-primary/30 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`h-5 w-5 rounded border flex items-center justify-center transition-all ${isCompleted ? 'border-primary bg-primary text-black' : 'border-gray-500 bg-transparent'}`}>
                                            {isCompleted && <ExternalLink size={12} />}
                                        </div>
                                        <span className={`text-sm font-medium transition-colors ${isCompleted ? 'text-gray-300 line-through opacity-60' : 'text-white'}`}>
                                            {mission.title}
                                        </span>
                                    </div>
                                    <span className="text-xs text-primary">{mission.xp} XP</span>
                                </Link>
                            )
                        })}
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${useUserStore.getState().completedBossIds.includes(chapter.boss.title) ? 'bg-green-900/20 border-green-900/50' : 'bg-red-900/10 border-red-900/30'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-lg text-white">Boss: {chapter.boss.title}</h3>
                            <span className="text-red-400 text-sm font-bold">{chapter.boss.xp} XP</span>
                        </div>
                        <p className="text-sm text-text-muted mb-4">{chapter.boss.test}</p>
                        
                        <div className="relative group">
                            <Link
                                href={areAllMissionsCompleted ? `/mission/${chapter.id}` : '#'}
                                onClick={(e) => {
                                    if (!areAllMissionsCompleted) e.preventDefault();
                                    else onClose();
                                }}
                                className={`w-full py-3 px-4 bg-primary text-black font-bold text-base rounded-lg shadow-[0_0_15px_rgba(245,159,10,0.4)] transition-all flex items-center justify-center gap-2 ${
                                    !areAllMissionsCompleted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-500 hover:shadow-[0_0_25px_rgba(245,159,10,0.6)]'
                                }`}
                                aria-disabled={!areAllMissionsCompleted}
                            >
                                <Brush size={18} />
                                Enter Workshop
                            </Link>
                            {!areAllMissionsCompleted && (
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max p-2 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    Complete all objectives to unlock the boss.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}