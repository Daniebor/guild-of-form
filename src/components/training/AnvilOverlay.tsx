"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Hammer, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useUserStore } from "@/lib/store/userStore";

interface AnvilOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  requiredXP: number;
  currentXP: number;
}

export const AnvilOverlay = ({ isOpen, onClose, requiredXP, currentXP }: AnvilOverlayProps) => {
  const { addXP } = useUserStore();
  
  const deficit = Math.max(0, requiredXP - currentXP);
  const progress = Math.min(100, (currentXP / requiredXP) * 100);

  // Mock Drills for the MVP
  const drills = [
    { id: 1, title: "Speed Sculpt: Sphere", xp: 50, duration: "5m" },
    { id: 2, title: "Study: Facial Planes", xp: 100, duration: "15m" },
    { id: 3, title: "Drill: Navigation Maze", xp: 25, duration: "2m" },
  ];

  const handleDrill = (xpAmount: number) => {
    addXP(xpAmount);
    // In a real app, this would start a timer or open a specific drill page.
    // For MVP, we simulate instant completion to test the unlock logic.
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t-2 border-amber-900/50 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] h-[60vh] md:h-[50vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <Hammer className="text-amber-600" size={24} />
                <h2 className="text-2xl font-serif text-slate-100">The Training Ground</h2>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="max-w-2xl mx-auto space-y-8">
                
                {/* Status Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm uppercase tracking-widest">
                    <span className="text-slate-400">Current Strength</span>
                    <span className={deficit > 0 ? "text-red-400" : "text-green-400"}>
                      {deficit > 0 ? `-${deficit} XP Required` : "Ready for Boss"}
                    </span>
                  </div>
                  <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-amber-700 to-amber-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 text-center">
                    You must reach {requiredXP} XP to challenge the Boss.
                  </p>
                </div>

                {/* Drills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drills.map((drill) => (
                    <button
                      key={drill.id}
                      onClick={() => handleDrill(drill.xp)}
                      disabled={deficit <= 0}
                      className="group flex flex-col items-start p-4 bg-slate-800/50 border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 transition-all rounded disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      <div className="flex justify-between w-full mb-1">
                        <span className="font-serif text-amber-500 group-hover:text-amber-400">
                          {drill.title}
                        </span>
                        <span className="text-xs font-mono text-slate-500 border border-slate-600 px-1 rounded">
                          {drill.duration}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">Reward: +{drill.xp} XP</span>
                    </button>
                  ))}
                </div>

                {/* Victory State */}
                {deficit <= 0 && (
                  <div className="text-center animate-in fade-in zoom-in duration-300">
                    <p className="text-amber-400 font-serif mb-4 text-lg">
                      "Your hands are steady. The gate is open."
                    </p>
                    <Button onClick={onClose} variant="primary" size="lg" className="w-full">
                      Challenge the Boss
                    </Button>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};