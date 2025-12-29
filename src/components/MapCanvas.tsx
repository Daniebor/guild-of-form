'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { curriculum } from '@/lib/data/curriculum';
import ChapterNode from './ChapterNode';
import MissionDrawer from './MissionDrawer';
import { Chapter } from '@/lib/types';

export default function MapCanvas() {
  const { activePath, completedBossIds } = useUserStore();
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const path = curriculum.find(p => p.id === activePath);

  if (!path) return <div>Path not found</div>;

  return (
    <div className="relative flex-1 overflow-y-auto pb-[200px] custom-scrollbar">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05] bg-grid-pattern" style={{ backgroundSize: '40px 40px' }}></div>

      <div className="max-w-md mx-auto relative flex flex-col items-center py-12 px-4">
        {/* The Path (Background Line) */}
        {/* We repeat the pattern to cover the potential length */}
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-24 pointer-events-none z-0" preserveAspectRatio="none" viewBox={`0 0 100 ${path.chapters.length * 200}`}>
           <defs>
            <pattern id="windingPath" x="0" y="0" width="100" height="400" patternUnits="userSpaceOnUse">
                <path d="M50,0 L50,50 C50,100 20,120 20,170 C20,220 50,240 50,290 C50,340 80,360 80,410 C80,460 50,480 50,530" fill="none" stroke="#f59f0a" strokeOpacity="0.1" strokeWidth="4" />
                <path d="M50,0 L50,50 C50,100 20,120 20,170 C20,220 50,240 50,290 C50,340 80,360 80,410 C80,460 50,480 50,530" fill="none" stroke="#f59f0a" strokeDasharray="8 6" strokeLinecap="round" strokeOpacity="0.6" strokeWidth="2" />
            </pattern>
           </defs>
           <rect x="0" y="0" width="100%" height="100%" fill="url(#windingPath)" />
        </svg>

        {path.chapters.map((chapter, index) => {
          const isCompleted = completedBossIds.includes(chapter.boss.title);
          const isPrevBossCompleted = index > 0 ? completedBossIds.includes(path.chapters[index - 1].boss.title) : true;
          const isActive = isPrevBossCompleted && !isCompleted;
          const isLocked = !isPrevBossCompleted;

          // Winding logic: Center -> Left -> Center -> Right
          let translationStyle = {};
          if (index % 4 === 1) translationStyle = { transform: 'translateX(-30px)' };
          if (index % 4 === 3) translationStyle = { transform: 'translateX(30px)' };

          return (
            <ChapterNode
              key={chapter.id}
              chapter={chapter}
              isLocked={isLocked}
              isCompleted={isCompleted}
              isActive={isActive}
              onSelect={() => setSelectedChapter(chapter)}
              className="mb-24"
              style={translationStyle}
            />
          );
        })}
      </div>
      <MissionDrawer chapter={selectedChapter} onClose={() => setSelectedChapter(null)} />
    </div>
  );
}