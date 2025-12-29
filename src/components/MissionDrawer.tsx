'use client';

import { Chapter } from '@/lib/types';
import { X } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { motion, AnimatePresence } from 'framer-motion';

interface MissionDrawerProps {
  chapter: Chapter | null;
  onClose: () => void;
}

export default function MissionDrawer({ chapter, onClose }: MissionDrawerProps) {
  const { completeMission, addXp, completedMissionIds, completedBossIds } = useUserStore();

  const handleCompleteMission = (missionId: string, xp: number) => {
    if (completedMissionIds.includes(missionId)) return;
    addXp(xp);
    completeMission(missionId);
  };
  
  const handleDefeatBoss = (bossTitle: string, xp: number) => {
    if (completedBossIds.includes(bossTitle) || !chapter) return;
    addXp(xp);
    completeMission(chapter.id, bossTitle); // Use chapter.id as a mission id for the boss
  }

  return (
    <AnimatePresence>
      {chapter && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-10"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-dungeon-wall border-l-2 border-stone p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-primary">{chapter.title}</h2>
              <button onClick={onClose} className="text-text-muted hover:text-text-main">
                <X />
              </button>
            </div>
            
            <div className="space-y-4">
                {chapter.missions.map(mission => {
                    const isCompleted = completedMissionIds.includes(mission.id);
                    return (
                        <div key={mission.id} className={`p-4 rounded-lg ${isCompleted ? 'bg-green-900/50' : 'bg-void'}`}>
                            <h3 className="font-bold text-lg">{mission.title}</h3>
                            <p className="text-sm text-text-muted italic my-2">"{mission.intel}"</p>
                            <p className="mb-2">{mission.task}</p>
                            <div className="flex justify-end items-center">
                                <span className="text-primary mr-4">{mission.xp} XP</span>
                                <button 
                                    disabled={isCompleted}
                                    onClick={() => handleCompleteMission(mission.id, mission.xp)}
                                    className="bg-primary-bg disabled:bg-stone text-void font-bold py-1 px-3 rounded text-sm"
                                >
                                    {isCompleted ? 'Completed' : 'Complete'}
                                </button>
                            </div>
                        </div>
                    )
                })}
                
                {chapter.trainingMontage && (
                     <div className="p-4 rounded-lg bg-void">
                        <h3 className="font-bold text-lg">{chapter.trainingMontage.title}</h3>
                        <p className="italic text-text-muted my-2">Drill:</p>
                        <p className="mb-2">{chapter.trainingMontage.drill}</p>
                        <p className="text-sm text-primary text-right">{chapter.trainingMontage.xp} XP (auto-completed)</p>
                     </div>
                )}

                <div className={`p-4 rounded-lg bg-red-900/50 border-2 ${completedBossIds.includes(chapter.boss.title) ? 'border-green-500' : 'border-red-500'}`}>
                    <h3 className="font-bold text-lg text-red-400">Boss Fight: {chapter.boss.title}</h3>
                    <p className="text-sm text-text-muted my-2">"{chapter.boss.test}"</p>
                    <p className="mb-2">{chapter.boss.winCondition}</p>
                    <div className="flex justify-end items-center">
                        <span className="text-red-400 mr-4">{chapter.boss.xp} XP</span>
                         <button 
                            disabled={completedBossIds.includes(chapter.boss.title)}
                            onClick={() => handleDefeatBoss(chapter.boss.title, chapter.boss.xp)}
                            className="bg-red-500 disabled:bg-stone text-white font-bold py-1 px-3 rounded text-sm"
                        >
                            {completedBossIds.includes(chapter.boss.title) ? 'Defeated' : 'Defeat Boss'}
                        </button>
                    </div>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}