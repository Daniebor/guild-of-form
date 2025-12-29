'use client';

import XpBar from '@/components/XpBar';
import BountyCard from '@/components/BountyCard';
import MapCanvas from '@/components/MapCanvas';
import PathSelector from '@/components/PathSelector';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

export default function Home() {
  const { checkStreak, completedBossIds, unlockedPaths } = useUserStore();

  useEffect(() => {
    checkStreak();
  }, [checkStreak]);

  const chapter5BossId = 'THE STONE GOLEM';
  const showPathSelector = completedBossIds.includes(chapter5BossId) && unlockedPaths.length === 1 && unlockedPaths[0] === 'foundation';

  return (
    <>
      {showPathSelector && <PathSelector />}
      <div className="space-y-8">
        <XpBar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <BountyCard />
          </div>
          <div className="md:col-span-2">
            <MapCanvas />
          </div>
        </div>
      </div>
    </>
  );
}
