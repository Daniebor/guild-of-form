'use client';

import { Chapter } from '@/lib/types';
import { Lock, Check, Box, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChapterNodeProps {
    chapter: Chapter;
    isLocked: boolean;
    isCompleted: boolean;
    isActive: boolean;
    onSelect: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export default function ChapterNode({ chapter, isLocked, isCompleted, isActive, onSelect, className, style }: ChapterNodeProps) {

    const handleClick = () => {
        if (isLocked) return;
        onSelect();
    };

    if (isLocked) {
        return (
            <div 
                className={`relative z-10 flex flex-col items-center opacity-60 grayscale ${className}`}
                style={style}
            >
                <div className="relative flex items-center justify-center size-16 rounded-full bg-[#151515] border-2 border-[#333]">
                    <Lock className="text-gray-500" />
                </div>
                <div className="mt-3 flex flex-col items-center text-center">
                    <span className="px-3 py-1 rounded-full bg-[#222] border border-[#333] text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Locked</span>
                    <span className="text-gray-500 font-semibold text-sm">{chapter.title}</span>
                </div>
            </div>
        );
    }

    if (isCompleted) {
        return (
            <motion.div 
                whileHover={{ scale: 1.1 }}
                onClick={handleClick}
                className={`relative z-10 flex flex-col items-center group cursor-pointer ${className}`}
                style={style}
            >
                <div className="relative flex items-center justify-center size-16 rounded-full bg-[#1a1814] border-2 border-primary shadow-[0_0_10px_rgba(245,159,10,0.2)] transition-transform">
                    <Check className="text-primary font-bold h-8 w-8" />
                </div>
                <div className="mt-3 flex flex-col items-center text-center">
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider mb-1">Completed</span>
                    <span className="text-gray-300 font-semibold text-sm">{chapter.title}</span>
                </div>
            </motion.div>
        );
    }

    // Active State
    return (
        <motion.div 
            onClick={handleClick}
            className={`relative z-10 flex flex-col items-center group cursor-pointer ${className}`}
            style={style}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-28 rounded-full bg-primary/10 animate-ping opacity-75"></div>
            <div className="relative flex items-center justify-center size-24 rounded-full bg-gradient-to-br from-[#2a2418] to-[#1a1814] border-2 border-primary shadow-[0_0_0_4px_rgba(245,159,10,0.2),_0_0_20px_rgba(245,159,10,0.4)]">
                <Box className="size-12 text-primary animate-pulse" />
            </div>
            <div className="mt-4 flex flex-col items-center text-center">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-[#221c10] text-[10px] font-bold uppercase tracking-wider mb-1 shadow-lg shadow-primary/20">
                    <Play className="size-3 fill-current" />
                    Current
                </div>
                <span className="text-white font-bold text-lg" style={{ textShadow: '0 0 10px rgba(245,159,10,0.5)' }}>{chapter.title}</span>
            </div>
        </motion.div>
    );
}