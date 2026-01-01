"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
// Removed static import: import { CURRICULUM, findNodeById } from "@/lib/data/curriculum";
import { ForgeHeader } from "@/components/layout/ForgeHeader";
import { MapNode } from "@/components/map/MapNode";
import { MapConnector } from "@/components/map/MapConnector";
import { AnvilOverlay } from "@/components/training/AnvilOverlay";
import { MapSkeleton } from "@/components/map/MapSkeleton";
import { NodeStatus, Drill, Chapter, CurriculumNode } from "@/lib/types";
import { supabase } from "@/lib/supabase"; 
import { AuthModal } from "@/components/auth/AuthModal";

// --- THEME LOGIC: Get colors based on streak ---
const useForgeTheme = (streak: number) => {
  return useMemo(() => {
    // Star-Heart: Blinding Cyan/White (Mastery)
    if (streak > 59) return { 
      name: 'Star-Heart', 
      particle: 'bg-cyan-200 shadow-[0_0_15px_rgba(165,243,252,0.8)]', 
      glow: 'from-slate-950 via-blue-700/40 to-cyan-400/30' 
    };
    // Sun-Forged: White-Hot Gold (Month Streak)
    if (streak > 29) return {
      name: 'Sun-Forged',
      particle: 'bg-yellow-100 shadow-[0_0_15px_rgba(253,224,71,0.8)]',
      glow: 'from-slate-950 via-yellow-600/40 to-amber-200/20'
    };
    // Inferno: Bright Gold (High Streak)
    if (streak > 14) return { 
      name: 'Inferno',    
      particle: 'bg-amber-300', 
      glow: 'from-void via-amber-900/40 to-amber-500/20' 
    };
    // Kindled: Deep Orange (Started)
    if (streak > 2)  return { 
      name: 'Kindled',    
      particle: 'bg-amber-600', 
      glow: 'from-void via-amber-950/40 to-amber-900/10' 
    };
    // Cold Iron: Grey/Slate (Default)
    return { 
      name: 'Cold Iron',  
      particle: 'bg-slate-700', 
      glow: 'from-void via-slate-900/50 to-slate-800/10' 
    };
  }, [streak]);
};

// --- VISUAL POLISH: Dynamic Particles ---
const Particles = ({ colorClass }: { colorClass: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden transition-colors duration-1000">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full blur-[1px] transition-colors duration-1000 ${colorClass}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${15 + Math.random() * 20}s linear infinite`,
            animationDelay: `-${Math.random() * 20}s`,
            opacity: 0,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-20vh) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Fallback titles if chapters are dynamically ID'd
const CHAPTER_TITLES: Record<string, string> = {
  "chapter-1": "Chapter I: The Awakening",
  "chapter-2": "Chapter II: The First Tools",
  "chapter-3": "Chapter III: Primordial Clay",
  "chapter-4": "Chapter IV: The Binding",
  "chapter-5": "Chapter V: Golem's Assembly",
};

export default function MapPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { completedNodes, xp, streak, resetProgress } = useUserStore();
  const hasScrolled = useRef(false);

  // Dynamic Data State
  const [curriculum, setCurriculum] = useState<Chapter[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const theme = useForgeTheme(streak);

  // Auth State
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State for the Training Ground Overlay
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [selectedBossRequirement, setSelectedBossRequirement] = useState(0);
  const [selectedBossId, setSelectedBossId] = useState<string | null>(null);
  const [selectedDrills, setSelectedDrills] = useState<Drill[]>([]); 

  useEffect(() => {
    setMounted(true);
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setIsAuthenticated(true);
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  // --- DATA FETCHING (DB) ---
  useEffect(() => {
    const fetchCurriculum = async () => {
      setLoadingData(true);
      const { data, error } = await supabase
        .from('curriculum_nodes')
        .select('*')
        .order('id', { ascending: true }); // Simple order by ID for now

      if (error) {
        console.error("Error fetching curriculum:", error);
        setLoadingData(false);
        return;
      }

      if (data) {
        // Transform flat DB nodes into Chapter structure
        const grouped: Record<string, CurriculumNode[]> = {};
        
        data.forEach((row: any) => {
          const node: CurriculumNode = {
            id: row.id,
            title: row.title,
            type: row.type,
            // Spread the JSON data payload
            description: row.data.description,
            position: row.data.position,
            xpReward: row.data.xpReward,
            requiredXP: row.data.requiredXP,
            requires: row.data.requires,
            hotkeys: row.data.hotkeys,
            steps: row.data.steps,
            drills: row.data.drills
          };

          if (!grouped[row.chapter_id]) {
            grouped[row.chapter_id] = [];
          }
          grouped[row.chapter_id].push(node);
        });

        const chapters: Chapter[] = Object.keys(grouped).sort().map(chapterId => ({
          id: chapterId,
          title: CHAPTER_TITLES[chapterId] || chapterId.toUpperCase(),
          nodes: grouped[chapterId]
        }));

        setCurriculum(chapters);
      }
      setLoadingData(false);
    };

    fetchCurriculum();
  }, []);

  // Helper to find node in state (replacing the static import helper)
  const findNode = (nodeId: string) => {
    for (const chapter of curriculum) {
      const node = chapter.nodes.find((n) => n.id === nodeId);
      if (node) return node;
    }
    return null;
  };

  // Integrity Check
  useEffect(() => {
    if (isAuthenticated && !isCheckingAuth) {
      if (completedNodes.length > 0 && xp < 50) {
        resetProgress();
      }
    }
  }, [isAuthenticated, isCheckingAuth, completedNodes, xp, resetProgress]);

  // New User Redirect
  useEffect(() => {
    if (isAuthenticated && !isCheckingAuth && xp === 0) {
      router.replace("/welcome");
    }
  }, [isAuthenticated, isCheckingAuth, xp, router]);

  const getNodeStatus = (nodeId: string, requirements: string[] = []): NodeStatus => {
    if (completedNodes.includes(nodeId)) return "completed";
    const allReqsMet = requirements.every((reqId) => completedNodes.includes(reqId));
    if (allReqsMet) return "active";
    return "locked";
  };

  // Auto-Scroll Logic
  useEffect(() => {
    if (!mounted || hasScrolled.current || !isAuthenticated || loadingData || curriculum.length === 0) return;

    let targetNodeId = null;
    const lastVisitedId = sessionStorage.getItem("sculptor_last_node");
    
    if (lastVisitedId) {
        targetNodeId = lastVisitedId;
        sessionStorage.removeItem("sculptor_last_node");
    } else {
        const allNodes = curriculum.flatMap(c => c.nodes);
        const activeNode = allNodes.find(n => {
           const status = getNodeStatus(n.id, n.requires);
           return status === 'active';
        });
        targetNodeId = activeNode ? activeNode.id : "node-1-1"; 
    }

    if (targetNodeId) {
        setTimeout(() => {
            const element = document.getElementById(`node-${targetNodeId}`);
            if (element) {
                const hasSeenIntro = sessionStorage.getItem("has_seen_map_intro");
                const behavior = hasSeenIntro ? "auto" : "smooth";
                element.scrollIntoView({ behavior, block: "center" });
                hasScrolled.current = true;
                if (!hasSeenIntro) sessionStorage.setItem("has_seen_map_intro", "true");
            }
        }, 100); 
    }
  }, [mounted, completedNodes, isAuthenticated, loadingData, curriculum]);

  const handleChallengeBoss = () => {
    if (!selectedBossId) return;
    const chapter = curriculum.find(c => c.nodes.some(n => n.id === selectedBossId));
    if (chapter) router.push(`/lesson/${chapter.id}/${selectedBossId}`);
  };

  const handleNodeClick = (nodeId: string, type: string, status: NodeStatus, requiredXP?: number) => {
    if (status === "locked") return;
    sessionStorage.setItem("sculptor_last_node", nodeId);

    if (type === "boss") {
      const requirement = requiredXP || 0;
      const nodeData = findNode(nodeId); // Use local helper
      const bossDrills = nodeData?.drills || [];

      setSelectedBossRequirement(requirement);
      setSelectedBossId(nodeId);
      setSelectedDrills(bossDrills);
      setIsTrainingOpen(true);
      return;
    } else {
      const chapter = curriculum.find(c => c.nodes.some(n => n.id === nodeId));
      if (chapter) router.push(`/lesson/${chapter.id}/${nodeId}`);
    }
  };

  if (!mounted || isCheckingAuth || loadingData) {
    return (
        <div className="min-h-screen bg-void text-white">
            <ForgeHeader />
            <MapSkeleton />
        </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-void text-white relative">
        <ForgeHeader />
        <div className="blur-sm pointer-events-none">
           <MapSkeleton />
        </div>
        <AuthModal isOpen={true} onClose={() => router.push('/')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-white overflow-x-hidden relative transition-colors duration-1000">
      <ForgeHeader />
      
      {/* Dynamic Particles based on Streak */}
      <Particles colorClass={theme.particle} />

      {/* --- ATMOSPHERE LAYERS --- */}
      <div className="fixed inset-0 pointer-events-none bg-[url('/noise.png')] opacity-5 z-0" />
      
      {/* Dynamic Gradient based on Streak */}
      <div className={`absolute inset-0 pointer-events-none bg-gradient-to-t ${theme.glow} z-0 h-[250vh] w-full transition-all duration-1000`} />

      {/* --- MAP CONTENT --- */}
      <main className="relative w-full max-w-3xl mx-auto min-h-[250vh] mt-10 mb-20 z-10">
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {curriculum.map((chapter) =>
            chapter.nodes.map((node) => {
              if (!node.requires || node.requires.length === 0) return null;
              return node.requires.map((reqId) => {
                const reqNode = findNode(reqId); // Use local helper
                if (!reqNode) return null;
                const isUnlocked = completedNodes.includes(reqId);
                return (
                  <MapConnector
                    key={`${reqId}-${node.id}`}
                    startX={reqNode.position.x}
                    startY={reqNode.position.y}
                    endX={node.position.x}
                    endY={node.position.y}
                    status={isUnlocked ? "unlocked" : "locked"}
                  />
                );
              });
            })
          )}
        </svg>

        {curriculum.map((chapter) => (
          <div key={chapter.id}>
            {/* Improved Chapter Title: Centered Watermark */}
            <div 
               className="absolute left-1/2 -translate-x-1/2 text-slate-600 font-serif font-black text-6xl md:text-8xl opacity-20 select-none pointer-events-none whitespace-nowrap z-0 tracking-tighter"
               style={{ top: `${chapter.nodes[0].position.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              {chapter.title.split(':')[0]} 
            </div>

            {chapter.nodes.map((node) => {
              const status = getNodeStatus(node.id, node.requires);
              return (
                <MapNode
                  key={node.id}
                  id={node.id}
                  type={node.type}
                  title={node.title}
                  x={node.position.x}
                  y={node.position.y}
                  status={status}
                  onClick={() => handleNodeClick(node.id, node.type, status, node.requiredXP)}
                />
              );
            })}
          </div>
        ))}
      </main>

      <AnvilOverlay 
        isOpen={isTrainingOpen} 
        onClose={() => setIsTrainingOpen(false)}
        currentXP={xp}
        requiredXP={selectedBossRequirement}
        onChallenge={handleChallengeBoss}
        drills={selectedDrills}
      />

      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-40 opacity-50 hover:opacity-100 transition-opacity">
            <button
            onClick={() => {
                if (confirm("⚠️ RESET ALL PROGRESS? This cannot be undone.")) {
                resetProgress();
                window.location.reload();
                }
            }}
            className="text-xs font-mono text-red-500 bg-slate-900/80 border border-red-900/50 px-3 py-2 rounded hover:bg-red-900/20 hover:text-red-400"
            >
            [DEV: RESET DATA]
            </button>
        </div>
      )}
    </div>
  );
}