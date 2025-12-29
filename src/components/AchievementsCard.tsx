import Link from 'next/link';
import { Trophy, ChevronRight } from 'lucide-react';

export default function AchievementsCard() {
    const achievementName = 'Clay Master I';
    const achievementDesc = 'Sculpt 10 unique models';
    const progress = 3;
    const total = 5;

    return (
        <Link href="#" className="p-5 rounded-xl border border-border-dark bg-surface-dark hover:bg-card-dark transition-colors group">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-text-muted group-hover:text-white transition-colors">
                    <Trophy />
                    <span className="text-sm font-medium">Achievements</span>
                </div>
                <ChevronRight className="text-text-muted group-hover:text-primary" />
            </div>
            <h5 className="text-lg font-bold text-white mb-1">{achievementName}</h5>
            <p className="text-xs text-text-muted">{achievementDesc}</p>
            <div className="flex mt-3 gap-1">
                {Array.from({ length: total }).map((_, i) => (
                    <div key={i} className={`size-2 rounded-full ${i < progress ? 'bg-primary' : 'bg-[#322d24]'}`}></div>
                ))}
            </div>
        </Link>
    );
}