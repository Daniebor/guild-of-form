"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hammer, X, ChevronLeft, Clock, Award, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useUserStore } from "@/lib/store/userStore";
import { MediaFrame } from "@/components/lesson/MediaFrame";
import { Drill } from "@/lib/types"; // Import Drill type
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AnvilOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  requiredXP: number;
  currentXP: number;
  onChallenge?: () => void;
  drills: Drill[];
}

export const AnvilOverlay = ({ isOpen, onClose, requiredXP, currentXP, onChallenge, drills }: AnvilOverlayProps) => {
  const { addXP, checkStreak } = useUserStore(); // Get checkStreak
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  
  const deficit = Math.max(0, requiredXP - currentXP);
  const progress = Math.min(100, (currentXP / requiredXP) * 100);

  const handleCompleteDrill = () => {
    if (selectedDrill) {
      addXP(selectedDrill.xp);
      checkStreak(); // Update/Maintain streak on drill completion
      setSelectedDrill(null); // Go back to list
    }
  };

  // Reset drill selection when closing
  useEffect(() => {
    if (!isOpen) setSelectedDrill(null);
  }, [isOpen]);

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
            className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t-2 border-amber-900/50 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] h-[80vh] md:h-[70vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                {selectedDrill ? (
                  <button 
                    onClick={() => setSelectedDrill(null)}
                    className="text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                ) : (
                  <Hammer className="text-amber-600" size={24} />
                )}
                <h2 className="text-xl md:text-2xl font-serif text-slate-100 truncate">
                  {selectedDrill ? selectedDrill.title : "The Training Ground"}
                </h2>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="max-w-2xl mx-auto space-y-8">
                
                {/* 1. DRILL LIST VIEW */}
                {!selectedDrill && (
                  <>
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
                        Complete drills to gain XP and unlock the Boss Gate.
                      </p>
                    </div>

                    {/* Victory State */}
                    {deficit <= 0 && (
                      <div className="text-center animate-in fade-in zoom-in duration-300 py-6 border-b border-slate-800 mb-6 bg-amber-900/10 rounded-lg border border-amber-500/20">
                        <div className="mb-4 inline-flex p-3 rounded-full bg-amber-500/10 border border-amber-500/50 text-amber-500">
                          <Award size={32} />
                        </div>
                        <p className="text-amber-400 font-serif mb-4 text-lg">
                          "Your hands are steady. The gate is open."
                        </p>
                        <div className="px-6">
                            <Button 
                                onClick={() => {
                                    if (onChallenge) onChallenge();
                                    else onClose();
                                }} 
                                variant="primary" 
                                size="lg" 
                                className="w-full shadow-lg shadow-amber-500/20"
                            >
                            Challenge the Boss
                            </Button>
                        </div>
                        <p className="text-xs text-slate-500 mt-4 italic">
                            You may proceed, or continue training below to maintain your streak.
                        </p>
                      </div>
                    )}

                    {/* Drills Grid - Always visible now */}
                    <div className="grid grid-cols-1 gap-4 pb-10">
                      {drills.length > 0 ? (
                        drills.map((drill) => (
                          <div
                            role="button"
                            key={drill.id}
                            onClick={() => setSelectedDrill(drill)}
                            className="group flex flex-col items-start p-4 bg-slate-800/50 border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 transition-all rounded text-left relative overflow-hidden cursor-pointer"
                          >
                            <div className="flex justify-between w-full mb-2 relative z-10">
                              <span className="font-serif text-lg text-slate-200 group-hover:text-amber-400 transition-colors">
                                {drill.title}
                              </span>
                              <span className="text-xs font-mono text-slate-500 border border-slate-600 px-2 py-1 rounded flex items-center gap-1">
                                <Clock size={12} /> {drill.duration}
                              </span>
                            </div>
                            <div className="text-sm text-slate-400 relative z-10 prose prose-invert prose-sm max-w-none [&>p]:line-clamp-2 [&>p]:m-0">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {drill.description}
                              </ReactMarkdown>
                            </div>
                            <div className="mt-3 flex items-center gap-4 text-xs font-mono relative z-10">
                                <span className="text-amber-600/80 group-hover:text-amber-500">
                                    REWARD: +{drill.xp} XP
                                </span>
                                <span className="flex items-center gap-1 text-slate-500 group-hover:text-amber-500/70">
                                    <Flame size={12} /> Streak Active
                                </span>
                            </div>
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-8 text-slate-500 border border-dashed border-slate-700 rounded">
                          No drills available for this challenge yet.
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* 2. DRILL DETAIL VIEW */}
                {selectedDrill && (
                  <div className="animate-in slide-in-from-right duration-300 space-y-6 pb-20">
                    
                    {/* Media Display */}
                    <MediaFrame src={selectedDrill.media} title={selectedDrill.title} />

                    <div className="p-6 bg-slate-800/30 border border-slate-700 rounded-lg space-y-4">
                      <div className="flex items-center justify-between text-sm text-slate-400 font-mono">
                        <span className="flex items-center gap-2"><Clock size={16}/> {selectedDrill.duration}</span>
                        <div className="flex gap-4">
                            <span className="text-amber-500">+ {selectedDrill.xp} XP</span>
                            <span className="text-slate-500 flex items-center gap-1"><Flame size={14} /> Streak</span>
                        </div>
                      </div>
                      
                      <div className="prose prose-invert prose-lg text-slate-200 leading-relaxed">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            strong: ({node, ...props}) => <span className="text-amber-400 font-bold" {...props} />,
                            a: ({node, ...props}) => <a className="text-amber-500 hover:text-amber-400 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            code: ({node, ...props}) => <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-200 font-mono text-sm" {...props} />,
                          }}
                        >
                          {selectedDrill.description}
                        </ReactMarkdown>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-serif text-amber-500 uppercase tracking-widest text-sm border-b border-slate-800 pb-2">
                        Instructions
                      </h3>
                      <ul className="space-y-3">
                        {selectedDrill.steps.map((step, index) => (
                          <li key={index} className="flex gap-4 text-slate-300">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-500">
                              {index + 1}
                            </span>
                            <span className="prose prose-invert prose-sm max-w-none">
                              <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  strong: ({node, ...props}) => <span className="text-amber-400 font-bold" {...props} />,
                                  code: ({node, ...props}) => <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-200 font-mono text-xs" {...props} />,
                                }}
                              >
                                {step}
                              </ReactMarkdown>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-8">
                      <Button 
                        onClick={handleCompleteDrill} 
                        variant="primary" 
                        size="lg" 
                        className="w-full"
                      >
                        Complete Drill
                      </Button>
                      <p className="text-center text-xs text-slate-600 mt-4">
                        Honesty is the virtue of the Architect.
                      </p>
                    </div>

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