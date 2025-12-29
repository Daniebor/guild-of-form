'use client';

import { Mission, Chapter } from '@/lib/types';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { ChevronRight, School, Play, BookOpen, Swords, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface MissionScrollProps {
    mission: Mission;
    chapter: Chapter;
}

export default function MissionScroll({ mission, chapter }: MissionScrollProps) {
    const { completeMission, addXp, completedMissionIds, completedBossIds } = useUserStore();
    const router = useRouter();

    const isBossFight = chapter.id === mission.id;
    
    const isCompleted = isBossFight
        ? completedBossIds.includes(chapter.boss.title)
        : completedMissionIds.includes(mission.id);

    const handleComplete = () => {
        if (isCompleted) {
            // If already completed, just go to map
            router.push('/map');
            return;
        }

        addXp(mission.xp);

        if (isBossFight) {
            completeMission(chapter.id, chapter.boss.title);
            router.push('/map');
        } else {
            completeMission(mission.id);
            const currentMissionIndex = chapter.missions.findIndex(m => m.id === mission.id);
            const nextMission = chapter.missions[currentMissionIndex + 1];

            if (nextMission) {
                router.push(`/mission/${nextMission.id}`);
            } else {
                router.push('/map');
            }
        }
    };

    return (
        <div className="flex-grow flex flex-col items-center w-full pb-28 custom-scrollbar overflow-x-hidden">
            <div className="w-full max-w-[960px] px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
                <nav className="flex flex-wrap items-center gap-2 text-sm font-sans tracking-wide">
                    <Link href="/map" className="text-[#8a8175] hover:text-primary transition-colors">{chapter.title}</Link>
                    <ChevronRight className="text-[#8a8175] size-3" />
                    <span className="text-primary font-medium">{mission.title}</span>
                </nav>

                <header className="flex flex-col gap-2">
                    <h1 className="text-white text-5xl md:text-6xl font-serif font-medium tracking-tight leading-tight">{mission.title}</h1>
                    <div className="flex items-center gap-2 text-[#baaf9c] font-sans text-sm tracking-widest uppercase">
                        <School className="size-4" />
                        <span>{isBossFight ? 'Boss Encounter' : 'Class: Vertex Manipulation'}</span>
                    </div>
                </header>

                <div className="relative w-full group">
                    <div className="relative rounded-lg p-1 bg-[#2a2620] border-2 border-[#3d362e] shadow-2xl overflow-hidden">
                        <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg z-10"></div>
                        <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg z-10"></div>
                        <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg z-10"></div>
                        <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg z-10"></div>
                        <div className="relative flex items-center justify-center bg-black aspect-video rounded overflow-hidden cursor-pointer group-hover:opacity-95 transition-opacity bg-cover bg-center" 
                             style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjmC6VXUieS4oU2EXFoiXjti5KRYp6-bzBLmi13cmslcA4LVUwVP4QVybMUddQov-IMK-DHVGkl2A0EzoGWCCZD7SyS1P5x3XkJrDwPSAudurpAyXG9K8ln2Mph-yuNKx1KfVTxIMaK3ws_9Wc0NGlIDK1g6LAUX3CoRdNufBGB3JGLou8kADXkTuG61M2kTAKtHWao3bOc5dNmEQ4rYCHyie9G9MsL6WS-_xlrAYL8_LjLQge0gSfveZLlMbe_Kq3DjPCqGabM-0")' }}>
                            <button className="relative z-20 flex shrink-0 items-center justify-center rounded-full w-20 h-20 bg-primary/90 text-background-dark shadow-[0_0_30px_rgba(245,159,10,0.4)] hover:scale-105 hover:bg-primary transition-all duration-300">
                                <Play className="size-10 fill-current" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                    <section className="lg:col-span-2 flex flex-col gap-4">
                        <div className="flex items-center gap-3 border-b border-[#3d362e] pb-3">
                            <BookOpen className="text-primary size-6" />
                            <h2 className="text-white text-2xl font-bold tracking-tight">Scroll of Wisdom</h2>
                        </div>
                        <div className="bg-paper-dark rounded-lg border border-[#3d362e] p-6 lg:p-8 relative overflow-hidden">
                            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
                            <div className="relative z-10 space-y-4">
                                <p className="text-[#dcd6ca] text-lg leading-relaxed font-normal">
                                    {mission.intel}
                                </p>
                                <blockquote className="border-l-4 border-primary/40 pl-4 py-1 my-4 italic text-[#8a8175]">
                                    "A sculptor does not add to the clay, they reveal the truth hidden within." — Grandmaster Z
                                </blockquote>
                            </div>
                        </div>
                    </section>

                    <aside className="lg:col-span-1 flex flex-col gap-4">
                        <div className="flex items-center gap-3 border-b border-[#3d362e] pb-3">
                            <Swords className="text-primary size-6" />
                            <h2 className="text-white text-2xl font-bold tracking-tight">The Trial</h2>
                        </div>
                        <div className="bg-[#1c1812] rounded-lg border-2 border-dashed border-primary/40 p-5 flex flex-col gap-4 shadow-lg shadow-black/20">
                            <p className="text-sm font-sans text-[#8a8175] uppercase tracking-wider font-semibold">Objective: Mastery</p>
                            <div className="flex flex-col gap-3">
                                <p className="text-[#dcd6ca] text-base">{mission.task}</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full z-50">
                <div className="absolute bottom-full left-0 w-full h-12 bg-gradient-to-t from-background-dark to-transparent pointer-events-none"></div>
                <div className="bg-[#12100e]/95 backdrop-blur-md border-t border-[#3d362e] px-6 py-4 flex justify-center items-center shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
                    <div className="w-full max-w-[960px] flex justify-between items-center gap-4">
                        <div className="hidden sm:flex flex-col">
                            <span className="text-[#8a8175] text-xs font-sans uppercase tracking-widest">Rewards</span>
                            <div className="flex items-center gap-2">
                                <span className="text-white text-sm font-bold">+{mission.xp} XP</span>
                            </div>
                        </div>
                        <button 
                            onClick={handleComplete}
                            className="flex-1 sm:flex-none bg-primary hover:bg-[#ffb02e] disabled:bg-stone text-[#181511] font-bold text-lg py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(245,159,10,0.3)] hover:shadow-[0_0_30px_rgba(245,159,10,0.5)] transition-all flex items-center justify-center gap-2 group"
                        >
                            <span>{isCompleted ? 'Return to Map' : 'Complete Ritual'}</span>
                            <span className="bg-black/10 px-2 py-0.5 rounded text-sm font-sans font-semibold group-hover:bg-black/20">+{mission.xp} XP</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}