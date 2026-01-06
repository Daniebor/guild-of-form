"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import { ForgeHeader } from "@/components/layout/ForgeHeader";
import { RuneTablet } from "@/components/lesson/RuneTablet";
import { HoldButton } from "@/components/lesson/HoldButton";
import { MediaFrame } from "@/components/lesson/MediaFrame";
import { ChevronLeft, Map as MapIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { CurriculumNode } from "@/lib/types";

// Helper to render **Bold** text
const FormattedText = ({ text }: { text: string }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="text-amber-400 font-bold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { completeNode, completedNodes } = useUserStore();
  const [mounted, setMounted] = useState(false);
  
  const [node, setNode] = useState<CurriculumNode | null>(null);
  const [loading, setLoading] = useState(true);

  const chapterId = params.chapterId as string;
  const nodeId = params.nodeId as string;

  const isCompleted = completedNodes.includes(nodeId);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        const loadedNode: CurriculumNode = {
          id: data.id,
          title: data.title,
          type: data.type,
          description: data.data.description,
          position: data.data.position,
          xpReward: data.data.xpReward,
          requiredXP: data.data.requiredXP,
          requires: data.data.requires,
          hotkeys: data.data.hotkeys,
          steps: data.data.steps,
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

      {/* Floating Map Return Button (Fixed Bottom Right) */}
      <Link 
        href="/map"
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-slate-900 border-2 border-amber-500/30 rounded-full text-amber-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:scale-110 hover:border-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 group"
        title="Return to Map"
      >
        <MapIcon size={24} />
      </Link>

      {/* Main Grid Layout */}
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
            <p className="text-xl text-slate-400 font-light leading-relaxed">
                {node.description}
            </p>
            </header>

            <div className="space-y-12">
            {node.steps?.map((step, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-slate-800 hover:border-amber-900/50 transition-colors">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-void border-2 border-slate-700" />
                
                <h2 className="text-2xl font-serif text-amber-500 mb-3">
                    {step.title}
                </h2>
                
                <div className="prose prose-invert prose-lg text-slate-300">
                    <p>
                    <FormattedText text={step.description} />
                    </p>
                </div>

                <MediaFrame src={step.media} title={step.title} />
                </div>
            ))}
            </div>

            <div className="mt-20 pt-10 border-t border-slate-800">
            <div className="max-w-md mx-auto text-center space-y-6">
                <p className="text-slate-500 font-serif italic">
                "Is the Trial complete?"
                </p>
                
                <HoldButton 
                    onSuccess={handleComplete} 
                    completed={isCompleted}
                    label="Hold to Complete"
                />
            </div>
            </div>
        </div>

      </main>
    </div>
  );
}