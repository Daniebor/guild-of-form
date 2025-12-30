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
import { NodeStatus } from "@/lib/types";

// --- Visual Polish: Floating Particles Component ---
const Particles = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          // Increased opacity and brightness (amber-400) for visibility
          className="absolute bg-amber-400 w-1.5 h-1.5 rounded-full blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${15 + Math.random() * 20}s linear infinite`,
            animationDelay: `-${Math.random() * 20}s`,
            opacity: 0, // Initial state handled by keyframes
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
          20% { opacity: 0.6; } /* Fade in quickly */
          80% { opacity: 0.6; } /* Stay visible */
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

  // State for the Training Ground Overlay
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [selectedBossRequirement, setSelectedBossRequirement] = useState(0);
  const [selectedBossId, setSelectedBossId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getNodeStatus = (nodeId: string, requirements: string[] = []): NodeStatus => {
    if (completedNodes.includes(nodeId)) return "completed";
    const allReqsMet = requirements.every((reqId) => completedNodes.includes(reqId));
    if (allReqsMet) return "active";
    return "locked";
  };

  // --- Auto-Scroll Logic ---
  useEffect(() => {
    if (!mounted || hasScrolled.current) return;

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
  }, [mounted, completedNodes]);

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
      
      if (xp < requirement) {
        setSelectedBossRequirement(requirement);
        setSelectedBossId(nodeId);
        setIsTrainingOpen(true);
        return;
      }
      
      const chapter = CURRICULUM.find(c => c.nodes.some(n => n.id === nodeId));
      if (chapter) {
         router.push(`/lesson/${chapter.id}/${nodeId}`);
      }
    } else {
      const chapter = CURRICULUM.find(c => c.nodes.some(n => n.id === nodeId));
      if (chapter) {
         router.push(`/lesson/${chapter.id}/${nodeId}`);
      }
    }
  };

  // --- SKELETON STATE ---
  if (!mounted) {
    return (
        <div className="min-h-screen bg-void text-white">
            <ForgeHeader />
            <MapSkeleton />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-white overflow-x-hidden relative">
      <ForgeHeader />
      
      {/* --- ATMOSPHERE LAYERS (Full Width) --- */}
      
      {/* 1. Global Noise Overlay (Fixed to screen) */}
      <div className="fixed inset-0 pointer-events-none bg-[url('/noise.png')] opacity-5 z-0" />

      {/* 2. The Ascension Gradient (Absolute - Scrolls with map container but fixed to full width) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-void via-slate-900/30 to-blue-900/40 z-0 h-[250vh] w-full" />

      {/* Visual Polish: Ambient Particles (Moved AFTER background layers, z-index 1) */}
      <Particles />

      {/* --- MAP CONTENT (Constrained Width, z-index 10) --- */}
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
            {/* Improved Chapter Title: Centered Watermark */}
            <div 
               className="absolute left-1/2 -translate-x-1/2 text-slate-600 font-serif font-black text-6xl md:text-8xl opacity-20 select-none pointer-events-none whitespace-nowrap z-0 tracking-tighter"
               style={{ top: `${chapter.nodes[0].position.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              {/* Display Roman Numeral or Chapter Name faintly */}
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