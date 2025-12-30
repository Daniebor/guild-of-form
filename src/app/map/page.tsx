"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import { CURRICULUM, findNodeById } from "@/lib/data/curriculum";
import { ForgeHeader } from "@/components/layout/ForgeHeader";
import { MapNode } from "@/components/map/MapNode";
import { MapConnector } from "@/components/map/MapConnector";
import { AnvilOverlay } from "@/components/training/AnvilOverlay";
import { NodeStatus } from "@/lib/types";

export default function MapPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { completedNodes, xp, resetProgress } = useUserStore();
  const hasScrolled = useRef(false); // Ref to prevent double scrolling

  // State for the Training Ground Overlay
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [selectedBossRequirement, setSelectedBossRequirement] = useState(0);

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

    // 1. Find the target node ID (First Active node)
    let targetNodeId = null;
    const allNodes = CURRICULUM.flatMap(c => c.nodes);

    const activeNode = allNodes.find(n => {
       const status = getNodeStatus(n.id, n.requires);
       return status === 'active';
    });

    if (activeNode) {
      targetNodeId = activeNode.id;
    } else {
        // Fallback: If nothing active (e.g. all done, or start), default to 1-1
        targetNodeId = "node-1-1"; 
    }

    // 2. Scroll to it with a slight delay to ensure rendering
    if (targetNodeId) {
        setTimeout(() => {
            const element = document.getElementById(`node-${targetNodeId}`);
            if (element) {
                // Check if this is the first visit in this session
                const hasSeenIntro = sessionStorage.getItem("has_seen_map_intro");
                
                // If first time: Smooth scroll (Nice effect)
                // If returning: Auto/Instant scroll (Efficiency)
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


  const handleNodeClick = (nodeId: string, type: string, status: NodeStatus, requiredXP?: number) => {
    if (status === "locked") return;

    if (type === "boss") {
      const requirement = requiredXP || 0;
      
      if (xp < requirement) {
        setSelectedBossRequirement(requirement);
        setIsTrainingOpen(true);
        return;
      }
      
      router.push(`/lesson/chapter-1/${nodeId}`);
    } else {
      const chapter = CURRICULUM.find(c => c.nodes.some(n => n.id === nodeId));
      if (chapter) {
         router.push(`/lesson/${chapter.id}/${nodeId}`);
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-void text-white">
      <ForgeHeader />

      <main className="relative w-full max-w-3xl mx-auto min-h-[250vh] mt-10 mb-20">
        <div className="fixed inset-0 pointer-events-none bg-[url('/noise.png')] opacity-5" />
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-void via-slate-900/50 to-void" />

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
               className="absolute text-slate-700 font-serif font-bold text-4xl opacity-20 select-none pointer-events-none whitespace-nowrap"
               style={{ top: `${chapter.nodes[0].position.y - 5}%`, left: '10%' }}
            >
              {chapter.title}
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
      />

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
    </div>
  );
}