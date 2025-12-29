import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const GuildHall = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { player, bounties, chapters, activeMissionId } = useGame();

    // Find the active mission data
    const activeChapter = chapters.find(c => c.missions.some(m => m.id === activeMissionId));
    const activeMission = activeChapter?.missions.find(m => m.id === activeMissionId);

    // Calculate XP Bar width
    const xpPercentage = Math.min(100, Math.round((player.currentXp / player.xpToNextLevel) * 100));

    // Get the first unclaimed bounty for display
    const dailyBounty = bounties.find(b => !b.isClaimed);

    return (
        <div className="bg-background-dark text-white font-inter overflow-hidden selection:bg-primary selection:text-black min-h-screen">
            <div className="flex h-screen w-full">
                {/* Desktop Sidebar */}
                <aside className="w-72 hidden lg:flex flex-col border-r border-border-dark bg-[#1c1914]">
                    <div className="h-[89px] px-6 border-b border-border-dark flex items-center gap-3">
                        <div className="size-8 text-primary">
                            <span className="material-symbols-outlined !text-3xl">token</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-white">The Sculptor's Saga</h1>
                    </div>
                    <nav className="flex-1 flex flex-col gap-2 p-4">
                        <Link to="/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-lg bg-primary/10 border border-primary/20 group transition-all">
                            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>castle</span>
                            <span className="text-primary font-bold text-sm">Guild Hall</span>
                        </Link>
                        <Link to="/map" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-text-muted hover:text-white">
                            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>map</span>
                            <span className="font-medium text-sm">World Map</span>
                        </Link>
                    </nav>
                    <div className="p-4 border-t border-border-dark">
                        <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-white/5 transition-colors">
                            <div className="size-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-gray-600">
                                <span className="material-symbols-outlined text-xs text-white">settings</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium text-white">Settings</span>
                            </div>
                        </button>
                    </div>
                </aside>

                <main className="flex-1 flex flex-col h-full relative overflow-y-auto bg-background-dark">
                    {/* Mobile Header */}
                    <div className="lg:hidden flex items-center justify-between p-4 border-b border-border-dark bg-[#1c1914] sticky top-0 z-20">
                        <div className="flex items-center gap-2 text-white">
                            <span className="material-symbols-outlined text-primary">token</span>
                            <h2 className="text-lg font-bold">The Guild Hall</h2>
                        </div>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                    {/* Desktop Header */}
                    <header className="w-full h-[89px] px-6 lg:px-12 hidden lg:flex items-center justify-between gap-6 border-b border-border-dark bg-[#181511]/95 backdrop-blur-sm sticky top-0 z-10">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard</h2>
                            <p className="text-sm text-text-muted">Welcome back to the forge, {player.name.split(' ')[0]}.</p>
                        </div>
                        <div className="flex items-center gap-6 self-center">
                            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full">
                                <span className="material-symbols-outlined text-blue-400 text-xl" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
                                <span className="text-blue-100 text-sm font-bold">{player.streakDays} Day Streak</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative group cursor-pointer">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-primary to-yellow-600 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative size-12 hex-avatar bg-gray-800 border-2 border-primary z-10 overflow-hidden">
                                        <img alt="Profile avatar" className="w-full h-full object-cover" src={player.avatarUrl}/>
                                    </div>
                                    {player.notifications > 0 && (
                                        <div className="absolute -bottom-1 -right-1 bg-background-dark border border-primary rounded-full size-5 flex items-center justify-center z-20">
                                            <span className="text-[10px] font-bold text-primary">{player.notifications}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 w-full max-w-5xl mx-auto p-6 lg:p-12 flex flex-col gap-10">
                        {/* Rank & XP Section */}
                        <section className="flex flex-col gap-4 animate-fade-in-up">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-primary font-bold tracking-wider text-xs uppercase mb-1">Current Rank</p>
                                    <h3 className="text-2xl font-bold text-white">{player.rankTitle}</h3>
                                </div>
                                <p className="text-text-muted text-sm font-medium"><span className="text-white">{player.currentXp.toLocaleString()}</span> / {player.xpToNextLevel.toLocaleString()} XP</p>
                            </div>
                            <div className="relative h-6 w-full bg-[#322d24] rounded-full overflow-hidden shadow-inner border border-white/5">
                                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-800 via-yellow-600 to-primary glow-bar transition-all duration-1000 ease-out rounded-full" style={{width: `${xpPercentage}%`}}>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-text-muted">
                                <span>Level {player.level}</span>
                                <span>Level {player.level + 1}</span>
                            </div>
                        </section>

                        {/* Next Lesson / Active Mission */}
                        {activeMission && activeChapter ? (
                            <section className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">school</span>
                                        Next Lesson
                                    </h3>
                                </div>
                                <div className="group relative w-full overflow-hidden rounded-xl border border-[#393328] bg-card-dark shadow-2xl transition-all hover:border-primary/40 hover:shadow-[0_0_20px_rgba(245,159,10,0.1)]">
                                    <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-1 transition-opacity"></div>
                                    <div className="relative p-6 md:p-8 flex flex-col gap-6">
                                        <div className="flex-1 flex flex-col gap-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-primary font-bold tracking-wider text-xs uppercase mb-2">Module {activeChapter.sequence} • {activeChapter.title}</p>
                                                    <h4 className="text-3xl font-bold text-white group-hover:text-primary transition-colors">{activeMission.title}</h4>
                                                </div>
                                            </div>
                                            <p className="text-text-muted text-base leading-relaxed max-w-2xl mt-2 line-clamp-2">
                                                {activeMission.description}
                                            </p>
                                            <div className="mt-6">
                                                <div className="flex justify-between text-xs text-text-muted mb-2">
                                                    <span>Progress</span>
                                                    <span>{activeMission.objectives.filter(o => o.isCompleted).length}/{activeMission.objectives.length} Completed</span>
                                                </div>
                                                <div className="h-2 w-full bg-[#322d24] rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-primary transition-all duration-500" 
                                                        style={{width: `${Math.round((activeMission.objectives.filter(o => o.isCompleted).length / activeMission.objectives.length) * 100)}%`}}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full mt-4 flex justify-end">
                                            <button onClick={() => navigate('/mission')} className="w-full md:w-auto min-w-[160px] cursor-pointer relative overflow-hidden rounded-lg bg-primary hover:bg-primary-dark text-black font-bold text-sm px-6 py-3 transition-all transform active:scale-95 shadow-[0_0_15px_rgba(245,159,10,0.3)] hover:shadow-[0_0_20px_rgba(245,159,10,0.6)] flex items-center justify-center gap-2 group/btn">
                                                <span>Continue Lesson</span>
                                                <span className="material-symbols-outlined text-lg transition-transform group-hover/btn:translate-x-1">play_arrow</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <div className="p-8 text-center border border-dashed border-border-dark rounded-xl">
                                <p className="text-text-muted">No active missions. Check the World Map.</p>
                            </div>
                        )}

                        {/* Daily Bounty */}
                        <section className="flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">target</span>
                                    Daily Bounty
                                </h3>
                                <button className="text-text-muted hover:text-white transition-colors p-1" title="Refresh Bounty">
                                    <span className="material-symbols-outlined text-xl">refresh</span>
                                </button>
                            </div>
                            {dailyBounty ? (
                                <div className="w-full rounded-xl border border-[#393328] bg-card-dark p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg hover:border-primary/40 transition-all group">
                                    <div className="flex items-center gap-5">
                                        <div className="size-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-2xl">{dailyBounty.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white">{dailyBounty.title}</h4>
                                            <p className="text-text-muted text-sm mt-1 max-w-md">{dailyBounty.description}</p>
                                            <div className="flex items-center gap-3 mt-3 text-xs font-bold uppercase tracking-wider">
                                                <span className="text-primary">Reward: {dailyBounty.rewardXp} XP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full md:w-auto px-6 py-3 rounded-lg bg-[#322d24] hover:bg-[#3d362b] text-white font-semibold text-sm transition-colors border border-white/5 shadow-md">
                                        Claim Bounty
                                    </button>
                                </div>
                            ) : (
                                <div className="p-6 text-center text-text-muted border border-[#393328] rounded-xl bg-card-dark">
                                    No active bounties available.
                                </div>
                            )}
                        </section>
                    </div>

                    <nav className="lg:hidden sticky bottom-0 w-full bg-[#1c1914] border-t border-border-dark flex justify-around p-2 z-30 pb-safe">
                        <Link to="/dashboard" className="flex flex-col items-center gap-1 p-2 text-primary">
                            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>castle</span>
                            <span className="text-[10px] font-medium">Guild</span>
                        </Link>
                        <Link to="/map" className="flex flex-col items-center gap-1 p-2 text-text-muted">
                            <span className="material-symbols-outlined">map</span>
                            <span className="text-[10px] font-medium">Map</span>
                        </Link>
                    </nav>
                </main>
            </div>
        </div>
    );
};

export default GuildHall;