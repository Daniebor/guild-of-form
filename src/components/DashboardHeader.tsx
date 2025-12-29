'use client';

import Image from 'next/image';
import { Flame } from 'lucide-react';
import { useUserStore, getLevel } from '@/store/userStore';

export default function DashboardHeader() {
    const { streak, xp } = useUserStore();
    const level = getLevel(xp);

    return (
        <header className="w-full px-6 py-5 lg:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border-dark/50 bg-[#181511]/95 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard</h2>
                <p className="text-sm text-text-muted">Welcome back to the forge, Novice.</p>
            </div>
            <div className="flex items-center gap-6 self-end sm:self-auto">
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full">
                    <Flame className="text-blue-400" />
                    <span className="text-blue-100 text-sm font-bold">{streak} Day Streak</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group cursor-pointer">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-primary to-yellow-600 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative size-12 border-2 border-primary z-10 overflow-hidden" style={{ clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)' }}>
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALH76sJHTKGe7c5HsW83pJTLXrWup44fjbCCtt_sl_tmDx0yHBFPXPlBERQiods16e8GCoe9fT9fajZdcruPjgZTem1MRmAA8_ZNqHl2W05_-P-RoFnqYoQr88BCqUnf8VV3Cioh6459HJCRjJ87gCvi0RHh3TaAhD9yn1lsr52thvqhtbT6l2W2DyYxtd9-TcbbbGvASNVlrPP_USSy6pNakkW29IYD5CtH2nxQrWgtDG4kaU5jJJyLxacWv51XjRMuS0LJ2yLZs"
                                alt="Profile avatar"
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-background-dark border border-primary rounded-full size-5 flex items-center justify-center z-20">
                            <span className="text-[10px] font-bold text-primary">{level}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}