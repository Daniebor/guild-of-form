'use client';

import { useUserStore } from '@/store/userStore';
import { curriculum } from '@/lib/data/curriculum';
import { Skull, Settings, Wand, Printer, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const pathData: { [key: string]: { icon: any, color: string, label: string } } = {
    organic: { icon: Skull, color: 'text-vitalist', label: 'Organic & Anatomy' },
    hardsurface: { icon: Settings, color: 'text-iron', label: 'Hard Surface & Mech' },
    stylized: { icon: Wand, color: 'text-illusionist', label: 'Stylized & Hand-painted' },
    maker: { icon: Printer, color: 'text-transmuter', label: 'Fabrication & Engineering' },
};

export default function PathSelector() {
    const { unlockPath, setActivePath } = useUserStore();
    const paths = curriculum.filter(p => p.id !== 'foundation' && p.id !== 'mastery');
    const [selectedPathId, setSelectedPathId] = useState<string | null>(null);

    const handleJoinOrder = () => {
        if (!selectedPathId) return;
        unlockPath(selectedPathId);
        setActivePath(selectedPathId as any);
    };

    return (
        <motion.div 
            className="fixed inset-0 bg-background-dark/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="fixed inset-0 pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/95 to-background-dark"></div>
            </div>

            <div className="relative w-full max-w-6xl z-10 flex flex-col items-center py-8">
                <div className="text-center mb-10 space-y-3">
                    <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight uppercase drop-shadow-lg">
                        Choose Your Order
                    </h1>
                    <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto font-medium">
                        Select the discipline that will guide your sculpting journey. This choice defines your path, your tools, and your destiny.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4 mb-12">
                    {paths.map(path => {
                        const isSelected = selectedPathId === path.id;
                        const data = pathData[path.id];
                        const Icon = data?.icon || Skull;

                        return (
                            <motion.div 
                                key={path.id}
                                onClick={() => setSelectedPathId(path.id)}
                                className={`group relative flex flex-col h-full bg-card-dark border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                                    isSelected 
                                    ? 'border-primary -translate-y-2 shadow-[0_0_40px_-5px_rgba(245,159,10,0.4)]' 
                                    : 'border-white/10 hover:border-primary/50 hover:-translate-y-2'
                                }`}
                                whileHover={{ scale: isSelected ? 1 : 1.02 }}
                            >
                                {isSelected && (
                                    <div className="absolute top-3 right-3 z-20">
                                        <CheckCircle className="text-primary drop-shadow-[0_0_8px_rgba(245,159,10,0.8)]" />
                                    </div>
                                )}
                                <div className={`h-1 w-full ${isSelected ? 'bg-primary shadow-[0_0_10px_2px_rgba(245,159,10,0.5)]' : 'bg-gray-600'}`}></div>
                                <div className="p-6 flex flex-col items-center flex-grow text-center relative z-10">
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors ${
                                        isSelected ? 'bg-primary/20 border border-primary/50' : 'bg-white/5 border border-white/10 group-hover:bg-primary/10'
                                    }`}>
                                        <Icon className={`size-10 ${isSelected ? 'text-primary' : 'text-white/70 group-hover:text-primary'}`} />
                                    </div>
                                    <h3 className={`text-xl font-bold mb-2 transition-colors ${isSelected ? 'text-primary' : 'text-white group-hover:text-primary'}`}>{path.name}</h3>
                                    <p className={`text-[10px] font-medium uppercase tracking-wider mb-4 ${isSelected ? 'text-primary/60' : 'text-white/40'}`}>{data?.label}</p>
                                    <p className={`text-sm leading-relaxed ${isSelected ? 'text-white/80' : 'text-white/60'}`}>
                                        {path.description}
                                    </p>
                                </div>
                                <div className="absolute inset-0 opacity-10 bg-noise pointer-events-none"></div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="flex flex-col items-center">
                    <button 
                        disabled={!selectedPathId}
                        onClick={handleJoinOrder}
                        className="flex min-w-[200px] w-full md:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-primary hover:bg-yellow-400 disabled:bg-stone text-background-dark text-lg font-bold leading-normal tracking-wide shadow-[0_0_20px_rgba(245,159,10,0.5)] transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="mr-2 uppercase">Join the Order</span>
                        <ArrowRight />
                    </button>
                    <p className="mt-4 text-white/30 text-xs uppercase tracking-widest">Selection can be changed later in settings</p>
                </div>
            </div>
        </motion.div>
    );
}