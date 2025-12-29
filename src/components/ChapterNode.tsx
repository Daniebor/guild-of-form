'use client';

import { Chapter } from '@/lib/types';
import { Lock, CheckCircle, Swords } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChapterNodeProps {
    chapter: Chapter;
    isLocked: boolean;
    isCompleted: boolean;
    onSelect: () => void;
}

export default function ChapterNode({ chapter, isLocked, isCompleted, onSelect }: ChapterNodeProps) {

    const handleClick = () => {
        if (isLocked) return;
        onSelect();
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={handleClick}
            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors duration-300 ${
                isLocked 
                    ? 'bg-void border-stone text-text-muted cursor-not-allowed opacity-50' 
                    : isCompleted
                    ? 'bg-green-900/50 border-green-700 text-text-main cursor-pointer'
                    : 'bg-dungeon-wall border-primary-bg hover:border-primary cursor-pointer'
            }`}
        >
            <div>
                <h3 className="text-lg font-bold">{chapter.title}</h3>
                <p className="text-sm text-text-muted">{chapter.goal}</p>
            </div>
            <div className="ml-4">
                {isLocked && <Lock />}
                {isCompleted && <CheckCircle className="text-green-400" />}
                {!isLocked && !isCompleted && <Swords className="text-primary" />}
            </div>
        </motion.div>
    );
}