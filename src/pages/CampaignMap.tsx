import { useNavigate, Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const CampaignMap = () => {
    const navigate = useNavigate();
    const { chapters, activeMissionId, setActiveMission } = useGame();

    // Find active chapter based on active mission
    const activeChapter = chapters.find(c => c.missions.some(m => m.id === activeMissionId));
    
    // Sort chapters by sequence
    const sortedChapters = [...chapters].sort((a, b) => a.sequence - b.sequence);

    return (
        <div className="bg-void text-white font-inter overflow-hidden h-screen flex flex-col antialiased selection:bg-primary/30 relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]" style={{backgroundSize: "40px 40px", backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)"}}></div>
            
            <header className="relative z-20 flex items-center justify-between border-b border-[#333]/50 bg-void/80 backdrop-blur-sm px-6 py-4">
                <Link to="/dashboard" className="flex items-center gap-3 group">
                    <div className="size-8 text-primary flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined text-2xl">token</span>
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors size-9 rounded-full cursor-pointer border border-[#333]">
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                    </div>
                    <div onClick={() => navigate('/dashboard')} className="size-9 rounded-full bg-cover bg-center border border-[#333] cursor-pointer" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuALH76sJHTKGe7c5HsW83pJTLXrWup44fjbCCtt_sl_tmDx0yHBFPXPlBERQiods16e8GCoe9fT9fajZdcruPjgZTem1MRmAA8_ZNqHl2W05_-P-RoFnqYoQr88BCqUnf8VV3Cioh6459HJCRjJ87gCvi0RHh3TaAhD9yn1lsr52thvqhtbT6l2W2DyYxtd9-TcbbbGvASNVlrPP_USSy6pNakkW29IYD5CtH2nxQrWgtDG4kaU5jJJyLxacWv51XjRMuS0LJ2yLZs')"}}></div>
                </div>
            </header>

            <main className="relative z-10 flex-1 overflow-y-auto pb-[400px]">
                <div className="max-w-md mx-auto relative flex flex-col items-center py-12 px-4">
                    {/* SVG Path - Dynamic height based on chapters */}
                    <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-24 pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 100 800">
                        <path d="M50,0 L50,150 C50,200 20,220 20,270 C20,320 50,350 50,400 L50,550" fill="none" stroke="#f59f0a" strokeOpacity="0.1" strokeWidth="4"></path>
                        <path d="M50,0 L50,150 C50,200 20,220 20,270 C20,320 50,350 50,400 L50,550" fill="none" stroke="#f59f0a" strokeDasharray="8 6" strokeLinecap="round" strokeOpacity="0.6" strokeWidth="2"></path>
                    </svg>

                    {sortedChapters.map((chapter, index) => {
                        const isCompleted = chapter.status === 'completed';
                        const isActive = chapter.status === 'active';
                        const isLocked = chapter.status === 'locked';
                        
                        // Alternate horizontal position
                        const translateX = index % 2 === 0 ? 'translate-x-0' : '-translate-x-[30px]';
                        
                        return (
                            <div key={chapter.id} className={`relative z-10 flex flex-col items-center mb-24 group cursor-pointer ${translateX} ${isLocked ? 'opacity-60 grayscale' : ''}`}>
                                {isActive && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-28 rounded-full bg-primary/10 animate-ping opacity-75"></div>
                                )}
                                
                                <div 
                                    className={`relative flex items-center justify-center size-24 rounded-full border-2 transition-transform transform group-hover:scale-105
                                        ${isCompleted ? 'bg-[#1a1814] border-primary node-glow-completed size-16' : ''}
                                        ${isActive ? 'bg-gradient-to-br from-[#2a2418] to-[#1a1814] border-primary node-glow-active' : ''}
                                        ${isLocked ? 'bg-[#151515] border-[#333] size-16' : ''}
                                    `}
                                    onClick={() => isActive && navigate('/mission')}
                                >
                                    <span className={`material-symbols-outlined ${isActive ? 'text-5xl animate-pulse' : 'text-2xl'} ${isCompleted ? 'text-3xl font-bold' : ''} ${isLocked ? 'text-gray-500' : 'text-primary'}`}>
                                        {isCompleted ? 'check' : isLocked ? 'lock' : 'category'}
                                    </span>
                                </div>
                                
                                <div className="mt-3 flex flex-col items-center text-center w-40">
                                    {isActive && (
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-background-dark text-xs font-bold uppercase tracking-wider mb-1 shadow-lg shadow-primary/20">
                                            <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                                            Current
                                        </div>
                                    )}
                                    {isCompleted && (
                                        <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-1">Completed</span>
                                    )}
                                    {isLocked && (
                                        <span className="px-3 py-1 rounded-full bg-[#222] border border-[#333] text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Locked</span>
                                    )}
                                    
                                    <span className={`font-semibold ${isActive ? 'text-white text-lg glow-text' : 'text-gray-300 text-sm'}`}>
                                        Ch {chapter.sequence}: {chapter.title}
                                    </span>
                                </div>
                            </div>
                        );
                    })}

                    {/* Future Path */}
                    <div className="relative z-10 flex flex-col items-center translate-x-0 opacity-30 grayscale blur-[1px]">
                        <div className="size-3 rounded-full bg-[#333]"></div>
                        <div className="mt-8 size-2 rounded-full bg-[#222]"></div>
                        <div className="mt-8 size-1 rounded-full bg-[#111]"></div>
                    </div>
                </div>
            </main>

            {/* Bottom Drawer - Shows active chapter details */}
            {activeChapter && (
                <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
                    <div className="glass-panel w-full max-w-2xl rounded-t-2xl p-1 pointer-events-auto shadow-2xl shadow-black">
                        <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
                            <div className="w-12 h-1.5 rounded-full bg-gray-600/50"></div>
                        </div>
                        <div className="px-6 pb-8 pt-2">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-primary text-sm font-bold uppercase tracking-widest mb-1">Current Chapter</h3>
                                    <h2 className="text-white text-2xl font-bold leading-tight">{activeChapter.title}</h2>
                                    <p className="text-gray-400 text-sm mt-1">{activeChapter.description}</p>
                                </div>
                                <div className="size-12 rounded-lg bg-[#2a2418] border border-primary/20 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-2xl">category</span>
                                </div>
                            </div>
                            <div className="space-y-3 mb-8">
                                <h4 className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">Missions</h4>
                                {activeChapter.missions.map(mission => (
                                    <div 
                                        key={mission.id} 
                                        onClick={() => {
                                            setActiveMission(mission.id);
                                            navigate('/mission');
                                        }} 
                                        className={`flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a]/50 border border-[#333] hover:border-primary/30 transition-colors cursor-pointer group ${mission.id === activeMissionId ? 'border-primary/40 bg-primary/5' : ''}`}
                                    >
                                        <div className={`h-5 w-5 flex items-center justify-center rounded border transition-colors ${mission.isCompleted ? 'border-primary bg-primary text-black' : 'border-gray-500 bg-transparent group-hover:border-primary'}`}>
                                            {mission.isCompleted && <span className="material-symbols-outlined text-xs font-bold">check</span>}
                                        </div>
                                        <span className={`text-sm font-medium transition-colors ${mission.isCompleted ? 'text-gray-300 line-through opacity-60' : 'text-white'}`}>
                                            {mission.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => navigate('/mission')} className="w-full py-3.5 px-4 bg-primary text-black font-bold text-base rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">play_arrow</span>
                                Start Mission
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignMap;