"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import { findNodeById } from "@/lib/data/curriculum";
import { ForgeHeader } from "@/components/layout/ForgeHeader";
import { RuneTablet } from "@/components/lesson/RuneTablet";
import { HoldButton } from "@/components/lesson/HoldButton";
import { MediaFrame } from "@/components/lesson/MediaFrame";
import { ChevronLeft, Map as MapIcon } from "lucide-react";
import Link from "next/link";

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

  const chapterId = params.chapterId as string;
  const nodeId = params.nodeId as string;

  const node = findNodeById(nodeId);
  const isCompleted = completedNodes.includes(nodeId);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
      
      <RuneTablet hotkeys={node.hotkeys || []} />

      <Link 
        href="/map"
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-slate-900 border-2 border-amber-500/30 rounded-full text-amber-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:scale-110 hover:border-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 group"
        title="Return to Map"
      >
        <MapIcon size={24} />
      </Link>

      <main className="max-w-2xl mx-auto px-6 pt-12">
        
        <Link href="/map" className="inline-flex items-center text-slate-500 hover:text-amber mb-8 transition-colors">
          <ChevronLeft size={16} className="mr-1" /> Return to Map
        </Link>

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

      </main>
    </div>
  );
}