"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import { CURRICULUM, findNodeById } from "@/lib/data/curriculum";
import { ForgeHeader } from "@/components/layout/ForgeHeader";
import { MapNode } from "@/components/map/MapNode";
import { MapConnector } from "@/components/map/MapConnector";
import { AnvilOverlay } from "@/components/training/AnvilOverlay";
import { MapSkeleton } from "@/components/map/MapSkeleton";
import { NodeStatus, Drill } from "@/lib/types";
import { supabase } from "@/lib/supabase"; 
import { AuthModal } from "@/components/auth/AuthModal";

// --- Visual Polish: Floating Particles Component ---
const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-amber-400 w-1.5 h-1.5 rounded-full blur-[1px]"
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

export default function MapPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { completedNodes, xp, resetProgress } = useUserStore();
  const hasScrolled = useRef(false);

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
    
    // Check Auth on Mount
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAuthenticated(true);
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  // --- STATE INTEGRITY CHECK (Fixes Stale Data Issue) ---
  // If a user has completed nodes but not enough XP (e.g. from a previous dev session),
  // it means the state is corrupt. We reset it to ensure the map renders correctly.
  // Node 1-1 gives 50 XP. If XP < 50, you cannot have completed any nodes.
  useEffect(() => {
    if (isAuthenticated && !isCheckingAuth) {
      if (completedNodes.length > 0 && xp < 50) {
        console.log("State Integrity Check Failed: Resetting Progress");
        resetProgress();
        // Note: The 'NEW USER REDIRECT' below will catch the resulting 0 XP 
        // and send them to Welcome to start fresh.
      }
    }
  }, [isAuthenticated, isCheckingAuth, completedNodes, xp, resetProgress]);

  // --- NEW USER REDIRECT ---
  // If user is logged in but has 0 XP, they haven't done onboarding.
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

  // --- Auto-Scroll Logic ---
  useEffect(() => {
    // Only scroll if mounted AND authenticated
    if (!mounted || hasScrolled.current || !isAuthenticated) return;

    let targetNodeId = null;
    const lastVisitedId = sessionStorage.getItem("sculptor_last_node");
    
    if (lastVisitedId) {
        targetNodeId = lastVisitedId;
        sessionStorage.removeItem("sculptor_last_node");
    } else {
        const allNodes = CURRICULUM.flatMap(c => c.nodes);
        const activeNode = allNodes.find(n => {
           const status = getNodeStatus(n.id, n.requires);
           return status === 'active';
        });

        if (activeNode) {
          targetNodeId = activeNode.id;
        } else {
            targetNodeId = "node-1-1"; 
        }
    }

    if (targetNodeId) {
        setTimeout(() => {
            const element = document.getElementById(`node-${targetNodeId}`);
            if (element) {
                const hasSeenIntro = sessionStorage.getItem("has_seen_map_intro");
                const behavior = hasSeenIntro ? "auto" : "smooth";
                element.scrollIntoView({ behavior, block: "center" });
                hasScrolled.current = true;
                if (!hasSeenIntro) {
                    sessionStorage.setItem("has_seen_map_intro", "true");
                }
            }
        }, 100); 
    }
  }, [mounted, completedNodes, isAuthenticated]);

  const handleChallengeBoss = () => {
    if (!selectedBossId) return;
    const chapter = CURRICULUM.find(c => c.nodes.some(n => n.id === selectedBossId));
    if (chapter) {
      router.push(`/lesson/${chapter.id}/${selectedBossId}`);
    }
  };

  const handleNodeClick = (nodeId: string, type: string, status: NodeStatus, requiredXP?: number) => {
    if (status === "locked") return;

    sessionStorage.setItem("sculptor_last_node", nodeId);

    if (type === "boss") {
      const requirement = requiredXP || 0;
      
      const nodeData = findNodeById(nodeId);
      const bossDrills = nodeData?.drills || [];

      setSelectedBossRequirement(requirement);
      setSelectedBossId(nodeId);
      setSelectedDrills(bossDrills);
      setIsTrainingOpen(true);
      return;
    } else {
      const chapter = CURRICULUM.find(c => c.nodes.some(n => n.id === nodeId));
      if (chapter) {
         router.push(`/lesson/${chapter.id}/${nodeId}`);
      }
    }
  };

  // --- LOADING / AUTH CHECK STATE ---
  if (!mounted || isCheckingAuth) {
    return (
        <div className="min-h-screen bg-void text-white">
            <ForgeHeader />
            <MapSkeleton />
        </div>
    );
  }

  // --- NOT AUTHENTICATED STATE ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-void text-white relative">
        <ForgeHeader />
        {/* Blurred Map Background */}
        <div className="blur-sm pointer-events-none">
           <MapSkeleton />
        </div>
        {/* Force Auth Modal */}
        <AuthModal 
          isOpen={true} 
          onClose={() => router.push('/')} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-white relative">
      <ForgeHeader />
      <Particles />

      {/* --- ATMOSPHERE LAYERS --- */}
      <div className="fixed inset-0 pointer-events-none bg-[url('/noise.png')] opacity-5 z-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-void via-slate-900/30 to-blue-900/40 z-0 h-[250vh] w-full" />

      {/* --- MAP CONTENT --- */}
      <main className="relative w-full max-w-3xl mx-auto min-h-[250vh] mt-10 mb-20 z-10">
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {CURRICULUM.map((chapter) =>
            chapter.nodes.map((node) => {
              if (!node.requires || node.requires.length === 0) return null;
              return node.requires.map((reqId) => {
                const reqNode = findNodeById(reqId);
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

        {CURRICULUM.map((chapter) => (
          <div key={chapter.id}>
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