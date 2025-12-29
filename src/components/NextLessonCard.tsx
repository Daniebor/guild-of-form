import Link from 'next/link';
import { School, ChevronRight } from 'lucide-react';

export default function NextLessonCard() {
    // This data would come from the user's progress
    const moduleName = 'Understanding Brushes';
    const progress = '3/5 Completed';
    const progressPercent = 60;

    return (
        <Link href="#" className="p-5 rounded-xl border border-border-dark bg-surface-dark hover:bg-card-dark transition-colors group">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-text-muted group-hover:text-white transition-colors">
                    <School />
                    <span className="text-sm font-medium">Next Lesson</span>
                </div>
                <ChevronRight className="text-text-muted group-hover:text-primary" />
            </div>
            <h5 className="text-lg font-bold text-white mb-1">{moduleName}</h5>
            <p className="text-xs text-text-muted">{progress}</p>
            <div className="mt-4 h-1 w-full bg-[#322d24] rounded-full overflow-hidden">
                <div className="h-full bg-gray-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
        </Link>
    );
}