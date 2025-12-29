import { useNavigate, Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const MissionScroll = () => {
    const navigate = useNavigate();
    const { chapters, activeMissionId, toggleObjective, completeMission } = useGame();

    // Find active mission data
    const activeChapter = chapters.find(c => c.missions.some(m => m.id === activeMissionId));
    const activeMission = activeChapter?.missions.find(m => m.id === activeMissionId);

    if (!activeMission || !activeChapter) {
        return (
            <div className="min-h-screen bg-background-dark text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="mb-4">No active mission found.</p>
                    <Link to="/map" className="text-primary hover:underline">Return to Map</Link>
                </div>
            </div>
        );
    }

    const progress = Math.round((activeMission.objectives.filter(c => c.isCompleted).length / activeMission.objectives.length) * 100);

    const handleComplete = () => {
        completeMission(activeMission.id);
        navigate('/map');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-newsreader text-[#e5e5e5] custom-scrollbar overflow-x-hidden">
            {/* Header matching Map style */}
            <header className="relative z-20 flex items-center border-b border-[#333]/50 bg-background-dark/80 backdrop-blur-sm px-6 py-4">
                <Link to="/dashboard" className="flex items-center gap-3 group">
                    <div className="size-8 text-primary flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined text-2xl">token</span>
                    </div>
                </Link>
            </header>

            <div className="flex-grow flex flex-col items-center w-full pb-28">
                <div className="w-full max-w-[960px] px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
                    <nav className="flex flex-wrap items-center gap-2 text-sm font-noto tracking-wide">
                        <Link to="/map" className="text-[#8a8175] hover:text-primary transition-colors">Chapter {activeChapter.sequence}</Link>
                        <span className="material-symbols-outlined text-[#8a8175] text-xs">chevron_right</span>
                        <span className="text-primary font-medium">{activeMission.title}</span>
                    </nav>
                    <header className="flex flex-col gap-2">
                        <h1 className="text-white text-5xl md:text-6xl font-medium tracking-tight leading-tight">{activeMission.title}</h1>
                        <div className="flex items-center gap-2 text-[#baaf9c] font-noto text-sm tracking-widest uppercase">
                            <span className="material-symbols-outlined text-base">school</span>
                            <span>Class: {activeMission.classType}</span>
                        </div>
                    </header>
                    <div className="text-[#dcd6ca] text-lg leading-relaxed max-w-3xl">
                        {activeMission.description}
                    </div>
                    
                    {/* Video/Image Placeholder */}
                    <div className="relative w-full group">
                        <div className="relative rounded-lg p-1 bg-[#2a2620] border-2 border-[#3d362e] shadow-2xl">
                            <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg z-10"></div>
                            <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg z-10"></div>
                            <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg z-10"></div>
                            <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg z-10"></div>
                            <div className="relative flex items-center justify-center bg-black aspect-video rounded overflow-hidden cursor-pointer group-hover:opacity-95 transition-opacity bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${activeMission.thumbnailUrl}")`}}>
                                <button className="relative z-20 flex shrink-0 items-center justify-center rounded-full w-20 h-20 bg-primary/90 text-background-dark shadow-[0_0_30px_rgba(245,159,10,0.4)] hover:scale-105 hover:bg-primary transition-all duration-300">
                                    <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                        <section className="lg:col-span-2 flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-[#3d362e] pb-3">
                                <span className="material-symbols-outlined text-primary text-2xl">auto_stories</span>
                                <h2 className="text-white text-2xl font-bold tracking-tight">Scroll of Wisdom</h2>
                            </div>
                            <div className="bg-paper-dark rounded-lg border border-[#3d362e] p-6 lg:p-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-20 pointer-events-none"></div>
                                <div className="relative z-10 space-y-4">
                                    <h3 className="text-xl font-bold text-primary/80 mb-2">{activeMission.scrollContent.title}</h3>
                                    <p className="text-[#dcd6ca] text-lg leading-relaxed font-normal whitespace-pre-line">
                                        {activeMission.scrollContent.text}
                                    </p>
                                    {activeMission.scrollContent.quote && (
                                        <blockquote className="border-l-4 border-primary/40 pl-4 py-1 my-4 italic text-[#8a8175]">
                                            {activeMission.scrollContent.quote}
                                        </blockquote>
                                    )}
                                </div>
                            </div>
                        </section>
                        <aside className="lg:col-span-1 flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-[#3d362e] pb-3">
                                <span className="material-symbols-outlined text-primary text-2xl">swords</span>
                                <h2 className="text-white text-2xl font-bold tracking-tight">The Trial</h2>
                            </div>
                            <div className="bg-[#1c1812] rounded-lg border-2 border-dashed border-primary/40 p-5 flex flex-col gap-4 shadow-lg shadow-black/20">
                                <p className="text-sm font-noto text-[#8a8175] uppercase tracking-wider font-semibold">Objective: Practical Application</p>
                                <div className="flex flex-col gap-3">
                                    {activeMission.objectives.map(item => (
                                        <label key={item.id} className="checkbox-wrapper flex items-start gap-3 cursor-pointer group">
                                            <input 
                                                className="peer sr-only" 
                                                type="checkbox" 
                                                checked={item.isCompleted}
                                                onChange={() => toggleObjective(activeMission.id, item.id)}
                                            />
                                            <div className="w-6 h-6 rounded border border-[#5c5446] bg-[#12100d] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary peer-checked:border-primary text-transparent peer-checked:text-primary transition-colors select-none">
                                                <span className="material-symbols-outlined text-sm font-bold">check</span>
                                            </div>
                                            <span className={`text-[#dcd6ca] text-base group-hover:text-white transition-colors ${item.isCompleted ? 'text-[#666] line-through decoration-primary/50' : ''}`}>{item.text}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full z-50">
                <div className="absolute bottom-full left-0 w-full h-12 bg-gradient-to-t from-background-dark to-transparent pointer-events-none"></div>
                <div className="bg-[#12100e]/95 backdrop-blur-md border-t border-[#3d362e] px-6 py-4 flex justify-center items-center shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
                    <div className="w-full max-w-[960px] flex justify-between items-center gap-4">
                        <div className="hidden sm:flex flex-col">
                            <span className="text-[#8a8175] text-xs font-noto uppercase tracking-widest">Progress</span>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-32 bg-[#3d362e] rounded-full overflow-hidden">
                                    <div className="h-full bg-primary transition-all duration-500" style={{width: `${progress}%`}}></div>
                                </div>
                                <span className="text-white text-sm font-bold">{progress}%</span>
                            </div>
                        </div>
                        <button 
                            onClick={handleComplete}
                            disabled={progress < 100}
                            className={`flex-1 sm:flex-none font-bold text-lg py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(245,159,10,0.3)] transition-all flex items-center justify-center gap-2 group
                                ${progress < 100 
                                    ? 'bg-[#3d362e] text-[#8a8175] cursor-not-allowed shadow-none' 
                                    : 'bg-primary hover:bg-[#ffb02e] text-[#181511] hover:shadow-[0_0_30px_rgba(245,159,10,0.5)]'
                                }`}
                        >
                            <span>Complete Ritual</span>
                            <span className={`px-2 py-0.5 rounded text-sm font-noto font-semibold ${progress < 100 ? 'bg-black/20' : 'bg-black/10 group-hover:bg-black/20'}`}>+{activeMission.xpReward} XP</span>
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionScroll;