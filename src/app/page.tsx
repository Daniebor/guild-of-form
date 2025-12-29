'use client';

import DashboardHeader from '@/components/DashboardHeader';
import XpBar from '@/components/XpBar';
import BountyCard from '@/components/BountyCard';
import NextLessonCard from '@/components/NextLessonCard';
import AchievementsCard from '@/components/AchievementsCard';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

export default function Home() {
  const checkStreak = useUserStore((state) => state.checkStreak);

  useEffect(() => {
    checkStreak();
  }, [checkStreak]);

  return (
    <>
        <DashboardHeader />
        <div className="flex-1 w-full max-w-5xl mx-auto p-6 lg:p-12 flex flex-col gap-10">
            <XpBar />
            <BountyCard />
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <NextLessonCard />
                <AchievementsCard />
            </section>
        </div>
    </>
  );
}
