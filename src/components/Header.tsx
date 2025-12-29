'use client';

import { Swords, ScrollText, Shield, Settings } from 'lucide-react';
import { useUserStore, getLevel, getRankTitle } from '../store/userStore';

export default function Header() {
    const { xp, streak } = useUserStore();
    const level = getLevel(xp);
    const rankTitle = getRankTitle(level);

    return (
        <header className="bg-dungeon-wall border-b border-stone p-4 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-serif text-primary">{rankTitle}</h1>
                <p className="text-text-muted">Level {level}</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-mana">
                    <span>Mana Flow: {streak}</span>
                </div>
                <Settings className="text-text-muted cursor-pointer" />
            </div>
        </header>
    );
}