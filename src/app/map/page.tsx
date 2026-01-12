"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import { ForgeHeader } from "@/components/layout/ForgeHeader";
import { AnvilOverlay } from "@/components/training/AnvilOverlay";
import { NodeStatus, Drill, Chapter, CurriculumNode } from "@/lib/types";
import { supabase } from "@/lib/supabase"; 
import { AuthModal } from "@/components/auth/AuthModal";
import { motion } from "framer-motion";
import { Lock, Star, Play, Hexagon, ZoomIn, ZoomOut, Move } from "lucide-react";
import clsx from "clsx";

// --- THEME LOGIC ---
const useForgeTheme = (streak: number) => {
  return useMemo(() => {
    if (streak > 59) return { 
      name: 'Star-Heart', 
      particle: 'bg-cyan-200 shadow-[0_0_15px_rgba(165,243,252,0.8)]', 
      bg: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)' 
    };
    if (streak > 29) return {
      name: 'Sun-Forged',
      particle: 'bg-yellow-100 shadow-[0_0_15px_rgba(253,224,71,0.8)]',
      bg: 'radial-gradient(circle at center, #1e1b4b 0%, #020617 100%)'
    };
    if (streak > 14) return { 
      name: 'Inferno',    
      particle: 'bg-amber-300', 
      bg: 'radial-gradient(circle at center, #3f2c06 0%, #0a0a0a 100%)' 
    };
    if (streak > 2)  return { 
      name: 'Kindled',    
      particle: 'bg-amber-600', 
      bg: 'radial-gradient(circle at center, #271a0c 0%, #0a0a0a 100%)' 
    };
    return { 
      name: 'Cold Iron',  
      particle: 'bg-slate-700', 
      bg: '#0a0a0a' 
    };
  }, [streak]);
};

// --- VISUAL POLISH: Dynamic Particles ---
const Particles = ({ colorClass }: { colorClass: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 rounded-full blur-[0.5px] transition-colors duration-1000 ${colorClass}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
        />
      ))}
    </div>
  );
};

// Fallback titles
const CHAPTER_TITLES: Record<string, string> = {
  "chapter-1": "Chapter I: The Awakening",
  "chapter-2": "Chapter II: The First Tools",
  "chapter-3": "Chapter III: Primordial Clay",
  "chapter-4": "Chapter IV: The Binding",
  "chapter-5": "Chapter V: Golem's Assembly",
};

// --- LOCAL COMPONENT: Canvas Node (Supports Pixels) ---
// We define this here to support absolute pixel positioning within the canvas container
const CanvasNode = ({ node, status, onClick }: { node: CurriculumNode, status: NodeStatus, onClick: () => void }) => {
  const isBoss = node.type === "boss";
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isActive = status === "active";

  const size = isBoss ? 64 : 40;
  const iconSize = isBoss ? 24 : 16;

  const statusClasses = clsx({
    "bg-slate-900 border-slate-700 text-slate-600 grayscale opacity-70 cursor-not-allowed": isLocked,
    "bg-slate-900 border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer hover:scale-110": isActive,
    "bg-amber-500 border-amber-300 text-void shadow-lg shadow-amber-500/20 cursor-pointer hover:bg-amber-400": isCompleted,
  });

  return (
    <div
      className="absolute flex flex-col items-center gap-2 group"
      style={{ 
        left: node.position.x, 
        top: -node.position.y,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)' // Center anchor
      }}
    >
      {/* Active Ring Effect */}
      {isActive && (
        <div className="absolute inset-0 -m-4 pointer-events-none">
           <motion.svg className="w-full h-full text-amber-500/30" viewBox="0 0 100 100" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
             <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="10 15" />
           </motion.svg>
        </div>
      )}

      <motion.div
        role="button"
        onClick={onClick}
        className={clsx(
          "relative flex items-center justify-center rounded-full border-2 transition-all duration-300 z-10 w-full h-full",
          statusClasses
        )}
        whileTap={!isLocked ? { scale: 0.9 } : {}}
      >
        {isBoss && <Hexagon className={clsx("absolute inset-0 w-full h-full", isLocked ? "stroke-slate-700" : "stroke-current")} strokeWidth={1} />}
        <div className="z-10 relative">
          {isLocked && <Lock size={iconSize} />}
          {isActive && <Play size={iconSize} fill="currentColor" />}
          {isCompleted && <Star size={iconSize} fill="currentColor" />}
        </div>
      </motion.div>

      {/* Debug Coordinates */}
      <div className="absolute -top-6 text-[10px] text-slate-500 font-mono opacity-70 pointer-events-none whitespace-nowrap">
        ({node.position.x}, {node.position.y})
      </div>

      <div className={clsx(
        "absolute top-full mt-3 px-3 py-1 bg-void/90 border border-slate-700/50 backdrop-blur-md rounded text-xs font-serif tracking-wide whitespace-nowrap transition-all duration-300 pointer-events-none z-30 shadow-xl",
        isLocked ? "opacity-0 group-hover:opacity-50" : "opacity-0 group-hover:opacity-100"
      )}>
        {node.title}
      </div>
    </div>
  );
};

export default function MapPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { completedNodes, xp, streak, resetProgress } = useUserStore();
  
  // Canvas State
  const [viewState, setViewState] = useState({ x: 0, y: 0, scale: 1 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interaction State (Ref for performance)
  const pointers = useRef(new Map<number, { x: number, y: number }>());
  const isDragging = useRef(false);

  const [curriculum, setCurriculum] = useState<Chapter[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const theme = useForgeTheme(streak);

  // Auth & Training State
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [selectedBossRequirement, setSelectedBossRequirement] = useState(0);
  const [selectedBossId, setSelectedBossId] = useState<string | null>(null);
  const [selectedDrills, setSelectedDrills] = useState<Drill[]>([]); 

  // --- INIT ---
  useEffect(() => {
    setMounted(true);
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setIsAuthenticated(true);
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  // --- NEW USER REDIRECT ---
  useEffect(() => {
    if (isAuthenticated && !isCheckingAuth && xp === 0) {
      router.replace("/welcome");
    }
  }, [isAuthenticated, isCheckingAuth, xp, router]);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchCurriculum = async () => {
      setLoadingData(true);
      const { data, error } = await supabase.from('curriculum_nodes').select('*').order('id', { ascending: true });
      
      if (data && !error) {
        const grouped: Record<string, CurriculumNode[]> = {};
        data.forEach((row: any) => {
          const node = { ...row, ...row.data, id: row.id, title: row.title, type: row.type };
          if (!grouped[row.chapter_id]) grouped[row.chapter_id] = [];
          grouped[row.chapter_id].push(node);
        });

        const chapters: Chapter[] = Object.keys(grouped).sort().map(chapterId => {
          // Sort nodes: Lessons first (by ID), then Bosses
          const sortedNodes = grouped[chapterId].sort((a, b) => {
             if (a.type === 'lesson' && b.type === 'boss') return -1;
             if (a.type === 'boss' && b.type === 'lesson') return 1;
             return a.id.localeCompare(b.id);
          });
          
          return {
             id: chapterId,
             title: CHAPTER_TITLES[chapterId] || chapterId.toUpperCase(),
             nodes: sortedNodes
          };
        });
        setCurriculum(chapters);
      }
      setLoadingData(false);
    };
    fetchCurriculum();
  }, []);

  // --- CANVAS CONTROLS ---
  
  // Auto-Focus Logic
  useEffect(() => {
    if (!mounted || loadingData || curriculum.length === 0 || !containerRef.current) return;

    // Find Active Node
    const allNodes = curriculum.flatMap(c => c.nodes);
    let targetNode = allNodes.find(n => {
       const reqs = n.requires || [];
       const completed = completedNodes.includes(n.id);
       const unlocked = reqs.every(id => completedNodes.includes(id));
       return unlocked && !completed;
    });

    if (!targetNode) targetNode = allNodes[0]; // Default start

    if (targetNode) {
      // Center the camera on this node
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      
      setViewState({
        x: screenW / 2 - targetNode.position.x, // Adjusted for positive X
        y: screenH / 2 - (-targetNode.position.y), // Keeping Y negative logic
        scale: 1
      });
    }
  }, [loadingData, curriculum]);

  const handleWheel = (e: React.WheelEvent) => {
    if (isTrainingOpen) return;
    // Simple zoom logic
    const scaleSpeed = 0.001;
    const newScale = Math.max(0.2, Math.min(3, viewState.scale - e.deltaY * scaleSpeed));
    setViewState(prev => ({ ...prev, scale: newScale }));
  };

  // --- TOUCH / POINTER LOGIC ---

  const getCentroid = (points: { x: number, y: number }[]) => {
    let x = 0, y = 0;
    points.forEach(p => { x += p.x; y += p.y; });
    return { x: x / points.length, y: y / points.length };
  };

  const getDistance = (points: { x: number, y: number }[]) => {
    if (points.length < 2) return 0;
    const p1 = points[0];
    const p2 = points[1];
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    // We removed setPointerCapture to allow events to bubble from children (nodes)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    isDragging.current = false;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    // We removed releasePointerCapture
    pointers.current.delete(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isTrainingOpen) return;
    e.preventDefault();

    const cache = pointers.current;
    if (!cache.has(e.pointerId)) return;

    // 1. Snapshot Previous State (Before updating the moving pointer)
    const prevPoints = Array.from(cache.values());
    if (prevPoints.length === 0) return;

    const prevCentroid = getCentroid(prevPoints);
    const prevDist = getDistance(prevPoints);

    // 2. Update Cache with new position
    cache.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // 3. Snapshot Current State (After updating)
    const currPoints = Array.from(cache.values());
    const currCentroid = getCentroid(currPoints);
    const currDist = getDistance(currPoints);

    // Check for significant movement to flag as drag
    if (!isDragging.current) {
       const moveDist = Math.hypot(currCentroid.x - prevCentroid.x, currCentroid.y - prevCentroid.y);
       if (moveDist > 2) isDragging.current = true;
    }

    // 4. Calculate Transforms
    setViewState(prevView => {
       let newScale = prevView.scale;
       
       // Calculate Scale Change (only if 2+ fingers)
       if (currPoints.length >= 2 && prevDist > 0) {
          const scaleFactor = currDist / prevDist;
          newScale = Math.max(0.2, Math.min(3, prevView.scale * scaleFactor));
          if (Math.abs(newScale - prevView.scale) > 0.001) isDragging.current = true;
       }

       // Calculate Pan Change (Movement of the centroid + Compensation for zoom origin)
       // Formula: x' = currCentroid - ((prevCentroid - prevX) / prevScale) * newScale
       
       const effectiveScaleRatio = newScale / prevView.scale;
       
       const newX = currCentroid.x - (prevCentroid.x - prevView.x) * effectiveScaleRatio;
       const newY = currCentroid.y - (prevCentroid.y - prevView.y) * effectiveScaleRatio;

       return {
          x: newX,
          y: newY,
          scale: newScale
       };
    });
  };

  // --- GAMEPLAY LOGIC ---

  const findNode = (nodeId: string) => {
    for (const chapter of curriculum) {
      const node = chapter.nodes.find((n) => n.id === nodeId);
      if (node) return node;
    }
    return null;
  };

  const handleNodeClick = (nodeId: string, type: string, status: NodeStatus, requiredXP?: number) => {
    if (isDragging.current) return;
    if (status === "locked") return;
    
    if (type === "boss") {
      const requirement = requiredXP || 0;
      const nodeData = findNode(nodeId);
      setSelectedBossRequirement(requirement);
      setSelectedBossId(nodeId);
      setSelectedDrills(nodeData?.drills || []);
      setIsTrainingOpen(true);
    } else {
      const chapter = curriculum.find(c => c.nodes.some(n => n.id === nodeId));
      if (chapter) router.push(`/lesson/${chapter.id}/${nodeId}`);
    }
  };

  const handleChallengeBoss = () => {
    if (!selectedBossId) return;
    const chapter = curriculum.find(c => c.nodes.some(n => n.id === selectedBossId));
    if (chapter) router.push(`/lesson/${chapter.id}/${selectedBossId}`);
  };

  const getNodeStatus = (nodeId: string, requirements: string[] = []): NodeStatus => {
    if (completedNodes.includes(nodeId)) return "completed";
    const allReqsMet = requirements.every((reqId) => completedNodes.includes(reqId));
    if (allReqsMet) return "active";
    return "locked";
  };

  // --- RENDERING ---

  if (!mounted || isCheckingAuth) return <div className="min-h-screen bg-void"><ForgeHeader /></div>;
  if (!isAuthenticated) return <div className="min-h-screen bg-void"><ForgeHeader /><AuthModal isOpen={true} onClose={() => router.push('/')} /></div>;

  return (
    <div className="min-h-screen bg-void overflow-hidden text-white relative select-none">
      <ForgeHeader />
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0" style={{ background: theme.bg }}>
         <Particles colorClass={theme.particle} />
         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
      </div>

      {/* --- INFINITE CANVAS --- */}
      <div 
        ref={containerRef}
        className="absolute inset-0 z-10 touch-none cursor-move active:cursor-grabbing"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <motion.div
          className="relative w-full h-full origin-top-left"
          // We use inline styles for performance during drag
          style={{
             transform: `translate(${viewState.x}px, ${viewState.y}px) scale(${viewState.scale})`
          }}
        >
           {/* Grid Pattern for spatial reference */}
           <div 
             className="absolute -inset-[5000px] opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', 
               backgroundSize: '100px 100px' 
             }} 
           />

           {/* --- RENDER CONTENT --- */}
           {curriculum.map((chapter) => (
             <div key={chapter.id}>
               {/* Connections Layer */}
               <svg className="absolute top-0 left-0 overflow-visible pointer-events-none" style={{ width: 1, height: 1 }}>
                 {chapter.nodes.map(node => {
                    const reqs = node.requires || [];
                    return reqs.map(reqId => {
                      const target = findNode(reqId);
                      if (!target) return null;
                      const isUnlocked = completedNodes.includes(reqId);
                      return (
                        <line 
                          key={`${reqId}-${node.id}`}
                          x1={target.position.x} y1={-target.position.y}
                          x2={node.position.x} y2={-node.position.y}
                          strokeWidth={2}
                          className={clsx(isUnlocked ? "stroke-amber-500/50" : "stroke-slate-800", "pointer-events-none")}
                          strokeDasharray={isUnlocked ? "0" : "8 8"}
                        />
                      )
                    });
                 })}
               </svg>

               {/* Nodes Layer */}
               {chapter.nodes.map(node => (
                 <CanvasNode
                   key={node.id}
                   node={node}
                   status={getNodeStatus(node.id, node.requires)}
                   onClick={() => handleNodeClick(node.id, node.type, getNodeStatus(node.id, node.requires), node.requiredXP)}
                 />
               ))}

               {/* Chapter Title Marker */}
               {chapter.nodes.length > 0 && (
                 <div 
                    className="absolute text-slate-700/50 font-serif font-bold text-6xl pointer-events-none whitespace-nowrap z-0"
                    style={{ 
                        left: chapter.nodes[0].position.x, 
                        top: -chapter.nodes[0].position.y - 100,
                        transform: 'translate(-50%, -50%)'
                    }}
                 >
                   {chapter.title.split(':')[0]}
                 </div>
               )}
             </div>
           ))}
        </motion.div>
      </div>

      {/* --- HUD CONTROLS --- */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2">
        <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-lg p-2 flex flex-col gap-2 shadow-xl">
           <button onClick={() => setViewState(p => ({ ...p, scale: p.scale + 0.2 }))} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded"><ZoomIn size={20} /></button>
           <button onClick={() => setViewState(p => ({ ...p, scale: Math.max(0.2, p.scale - 0.2) }))} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded"><ZoomOut size={20} /></button>
           <div className="w-full h-px bg-slate-700" />
           <button onClick={() => {
              // Reset View to Active Node logic (simplified reset here)
              const allNodes = curriculum.flatMap(c => c.nodes);
              const target = allNodes.find(n => !completedNodes.includes(n.id)) || allNodes[0];
              if (target) {
                 setViewState({
                    x: window.innerWidth / 2 - target.position.x,
                    y: window.innerHeight / 2 - (-target.position.y),
                    scale: 1
                 });
              }
           }} className="p-2 text-amber-500 hover:text-amber-300 hover:bg-slate-800 rounded" title="Center View"><Move size={20} /></button>
        </div>
      </div>

      <AnvilOverlay 
        isOpen={isTrainingOpen} 
        onClose={() => setIsTrainingOpen(false)}
        currentXP={xp}
        requiredXP={selectedBossRequirement}
        onChallenge={handleChallengeBoss}
        drills={selectedDrills}
      />
    </div>
  );
}