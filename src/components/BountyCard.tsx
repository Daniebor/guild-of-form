'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { dailyQuests } from '../lib/data/quests';
import { DailyQuest } from '../lib/types';

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
      <div className="bg-dungeon-wall border border-stone rounded-lg p-6 text-center">
        <p className="text-text-muted">No bounties available for your current path.</p>
      </div>
    );
  }

  return (
    <div className="bg-dungeon-wall border border-stone rounded-lg p-6">
      <h2 className="text-xl font-serif text-primary">Daily Bounty</h2>
      <p className="text-text-muted mb-4">A small test to keep your skills sharp.</p>
      <div className="bg-void p-4 rounded-md mb-4">
        <p className="text-lg">{quest.text}</p>
        <p className="text-sm text-primary text-right">{quest.xp} XP</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={getNewQuest}
          className="bg-stone hover:bg-dungeon-wall text-text-main font-bold py-2 px-4 rounded"
        >
          Reroll
        </button>
        <button
          onClick={handleComplete}
          className="bg-primary-bg hover:bg-primary text-void font-bold py-2 px-4 rounded"
        >
          Complete
        </button>
      </div>
    </div>
  );
}