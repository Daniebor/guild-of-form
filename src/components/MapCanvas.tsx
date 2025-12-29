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
    <>
      <div className="bg-dungeon-wall border border-stone rounded-lg p-6 h-full">
          <h2 className="text-2xl font-serif text-primary mb-4">{path.name}</h2>
          <div className="space-y-4">
              {path.chapters.map((chapter, index) => {
                  const isLocked = index > 0 && !completedBossIds.includes(path.chapters[index - 1].boss.title);
                  const isCompleted = completedBossIds.includes(chapter.boss.title);

                  return (
                      <ChapterNode 
                          key={chapter.id} 
                          chapter={chapter} 
                          isLocked={isLocked}
                          isCompleted={isCompleted}
                          onSelect={() => setSelectedChapter(chapter)}
                      />
                  );
              })}
          </div>
      </div>
      <MissionDrawer chapter={selectedChapter} onClose={() => setSelectedChapter(null)} />
    </>
  );
}