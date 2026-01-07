"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import { ForgeHeader } from "@/components/layout/ForgeHeader";
import { RuneTablet } from "@/components/lesson/RuneTablet";
import { HoldButton } from "@/components/lesson/HoldButton";
import { MediaFrame } from "@/components/lesson/MediaFrame";
import { ChevronLeft, Map as MapIcon, Loader2, AlertTriangle, Dumbbell, CheckSquare, Square } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { CurriculumNode } from "@/lib/types";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { completeNode, completedNodes } = useUserStore();
  const [mounted, setMounted] = useState(false);
  
  // Dynamic Data State
  const [node, setNode] = useState<CurriculumNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedPractice, setCheckedPractice] = useState<number[]>([]);

  const chapterId = params.chapterId as string;
  const nodeId = params.nodeId as string;

  const isCompleted = completedNodes.includes(nodeId);

  useEffect(() => {
    setMounted(true);
  }, []);

  const togglePractice = (index: number) => {
    setCheckedPractice(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const arePracticesComplete = !node?.practice || node.practice.length === 0 || node.practice.every((_, i) => checkedPractice.includes(i));

  // --- DATA FETCHING (DB) ---
  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('curriculum_nodes')
        .select('*')
        .eq('id', nodeId)
        .single();

      if (error) {
        console.error("Error fetching lesson:", error);
        setLoading(false);
        return;
      }

      if (data) {
        // Transform DB row to CurriculumNode
        const loadedNode: CurriculumNode = {
          id: data.id,
          title: data.title,
          type: data.type,
          // Spread the JSON payload
          description: data.data.description,
          position: data.data.position,
          xpReward: data.data.xpReward,
          requiredXP: data.data.requiredXP,
          requires: data.data.requires,
          hotkeys: data.data.hotkeys,
          steps: data.data.steps,
          pitfalls: data.data.pitfalls,
          practice: data.data.practice,
          drills: data.data.drills
        };
        setNode(loadedNode);
      }
      setLoading(false);
    };

    if (nodeId) {
      fetchLesson();
    }
  }, [nodeId]);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center text-slate-500">
        <Loader2 className="animate-spin text-amber-500 mr-2" /> Loading Ritual...
      </div>
    );
  }

  if (!node) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center text-slate-500">
        Node not found.
      </div>
    );
  }

  const handleComplete = () => {
    completeNode(nodeId);
    setTimeout(() => {
        router.push("/map");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-void text-slate-200 selection:bg-amber-900 selection:text-white pb-32">
      <ForgeHeader />
      
      {/* MOBILE: Horizontal Rune Tablet (Sticky Top) */}
      <div className="lg:hidden">
        <RuneTablet hotkeys={node.hotkeys || []} orientation="horizontal" />
      </div>

      <Link 
        href="/map"
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-slate-900 border-2 border-amber-500/30 rounded-full text-amber-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:scale-110 hover:border-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 group"
        title="Return to Map"
      >
        <MapIcon size={24} />
      </Link>

      <main className="max-w-7xl mx-auto px-6 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* DESKTOP SIDEBAR: Navigation & Runes */}
        <aside className="hidden lg:block lg:col-span-3 lg:col-start-2 h-fit sticky top-24 space-y-8">
            <Link href="/map" className="inline-flex items-center text-slate-500 hover:text-amber transition-colors group">
                <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Return to Map
            </Link>
            
            <RuneTablet hotkeys={node.hotkeys || []} orientation="vertical" />
        </aside>

        {/* CONTENT COLUMN */}
        <div className="lg:col-span-6">
            
            {/* Mobile Back Link */}
            <div className="lg:hidden mb-8">
                <Link href="/map" className="inline-flex items-center text-slate-500 hover:text-amber transition-colors">
                    <ChevronLeft size={16} className="mr-1" /> Return to Map
                </Link>
            </div>

            <header className="mb-12 border-b border-slate-800 pb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-400">
                  {chapterId.replace('-', ' ').toUpperCase()}
                </span>
                <span className="text-amber text-xs font-mono tracking-widest">
                  XP REWARD: {node.xpReward}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-100 mb-4">
                {node.title}
              </h1>
              <div className="text-xl text-slate-400 font-light leading-relaxed">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    strong: ({node, ...props}) => <span className="text-amber-400 font-bold" {...props} />,
                  }}
                >
                  {node.description}
                </ReactMarkdown>
              </div>
            </header>

            <div className="space-y-12">
              {node.steps?.map((step, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-slate-800 hover:border-amber-900/50 transition-colors">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-void border-2 border-slate-700" />
                  
                  <h2 className="text-2xl font-serif text-amber-500 mb-3">
                    {step.title}
                  </h2>
                  
                  <div className="prose prose-invert prose-lg text-slate-300">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        strong: ({node, ...props}) => <span className="text-amber-400 font-bold" {...props} />,
                        a: ({node, ...props}) => <a className="text-amber-500 hover:text-amber-400 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                        code: ({node, ...props}) => <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-200 font-mono text-sm" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1" {...props} />,
                      }}
                    >
                      {step.description}
                    </ReactMarkdown>
                  </div>

                  <MediaFrame src={step.media} title={step.title} />
                </div>
              ))}

              {/* Pitfalls Section */}
              {node.pitfalls && node.pitfalls.length > 0 && (
                <div className="mt-16">
                  <h3 className="flex items-center gap-2 text-xl font-serif text-red-400 mb-6 border-b border-red-900/30 pb-2">
                    <AlertTriangle size={20} /> Common Pitfalls
                  </h3>
                  <div className="space-y-6">
                    {node.pitfalls.map((pitfall, index) => (
                      <div key={index} className="bg-red-950/10 border border-red-900/30 rounded-lg p-6">
                        <h4 className="text-lg font-serif text-red-300 mb-2">{pitfall.title}</h4>
                        <div className="prose prose-invert prose-sm text-slate-400">
                          <ReactMarkdown>{pitfall.description}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice Section */}
              {node.practice && node.practice.length > 0 && (
                <div className="mt-16">
                  <h3 className="flex items-center gap-2 text-xl font-serif text-emerald-400 mb-6 border-b border-emerald-900/30 pb-2">
                    <Dumbbell size={20} /> Practice Rituals
                  </h3>
                  <div className="space-y-8">
                    {node.practice.map((practice, index) => {
                      const isChecked = checkedPractice.includes(index);
                      return (
                        <div 
                          key={index} 
                          className={`relative pl-8 border-l-2 transition-all duration-300 ${isChecked ? 'border-emerald-500/50 opacity-50' : 'border-emerald-900/50'}`}
                        >
                          {/* Checkbox Trigger */}
                          <div 
                            onClick={() => togglePractice(index)}
                            className="absolute -left-[11px] top-0 cursor-pointer bg-void hover:scale-110 transition-transform z-10"
                          >
                            {isChecked ? (
                              <CheckSquare size={20} className="text-emerald-500 fill-emerald-950" />
                            ) : (
                              <Square size={20} className="text-emerald-700 hover:text-emerald-500" />
                            )}
                          </div>

                          <div onClick={() => togglePractice(index)} className="cursor-pointer group">
                            <h4 className={`text-lg font-serif mb-2 transition-colors ${isChecked ? 'text-emerald-500/70 line-through decoration-emerald-500/30' : 'text-emerald-300 group-hover:text-emerald-200'}`}>
                              {practice.title}
                            </h4>
                            <div className={`prose prose-invert prose-sm transition-opacity ${isChecked ? 'text-slate-600' : 'text-slate-300'}`}>
                              <ReactMarkdown>{practice.description}</ReactMarkdown>
                            </div>
                          </div>
                          
                          {practice.media && <MediaFrame src={practice.media} title={practice.title} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-20 pt-10 border-t border-slate-800">
              <div className="max-w-md mx-auto text-center space-y-6">
                <p className="text-slate-500 font-serif italic">
                  {arePracticesComplete ? "\"Is the Trial complete?\"" : "Complete all Practice Rituals to proceed."}
                </p>
                
                <HoldButton 
                    onSuccess={handleComplete} 
                    completed={isCompleted}
                    disabled={!arePracticesComplete}
                    label={arePracticesComplete ? "Hold to Complete" : "Complete Rituals First"}
                />
              </div>
            </div>
        </div>

      </main>
    </div>
  );
}
