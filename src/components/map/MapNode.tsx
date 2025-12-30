"use client";

import { motion } from "framer-motion";
import { Lock, Star, Play, Hexagon } from "lucide-react";
import { NodeType, NodeStatus } from "@/lib/types";
import clsx from "clsx";

interface MapNodeProps {
  id: string;
  type: NodeType;
  status: NodeStatus;
  x: number;
  y: number;
  onClick: () => void;
  title?: string;
}

export const MapNode = ({ id, type, status, x, y, onClick, title }: MapNodeProps) => {
  const isBoss = type === "boss";
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isActive = status === "active";

  const sizeClass = isBoss ? "w-16 h-16" : "w-10 h-10";
  const iconSize = isBoss ? 24 : 16;

  const statusClasses = clsx({
    // Locked: Recessed, darker
    "bg-slate-900 border-slate-700 text-slate-600 grayscale opacity-70 cursor-not-allowed": isLocked,
    // Active: Glowing Amber
    "bg-slate-900 border-amber text-amber shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer z-20": isActive,
    // Completed: Solid Gold
    "bg-amber border-amber-light text-void shadow-lg shadow-amber/20 cursor-pointer hover:bg-amber-light": isCompleted,
  });

  return (
    <div
      id={`node-${id}`}
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group z-10"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* MAGICAL RING EFFECT (Only for Active Node) */}
      {isActive && (
        <div className="absolute inset-0 -m-4 pointer-events-none">
           <motion.svg
             className="w-full h-full text-amber-500/30"
             viewBox="0 0 100 100"
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           >
             {/* Dashed Ring */}
             <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="10 15" />
           </motion.svg>
           {/* Counter-rotating inner ring */}
           <motion.svg
             className="absolute inset-0 w-full h-full text-amber-500/20"
             viewBox="0 0 100 100"
             animate={{ rotate: -360 }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           >
             <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="5 5" />
           </motion.svg>
        </div>
      )}

      <motion.button
        onClick={onClick}
        disabled={isLocked}
        className={clsx(
          "relative flex items-center justify-center rounded-full border-2 transition-all duration-300 z-10",
          sizeClass,
          statusClasses
        )}
        whileHover={!isLocked ? { scale: 1.15 } : {}}
        whileTap={!isLocked ? { scale: 0.9 } : {}}
      >
        {isBoss ? (
          <Hexagon className={clsx("absolute inset-0 w-full h-full", isLocked ? "stroke-slate-700" : "stroke-current")} strokeWidth={1} />
        ) : null}

        <div className="z-10 relative">
          {isLocked && <Lock size={iconSize} />}
          {isActive && <Play size={iconSize} fill="currentColor" />}
          {isCompleted && <Star size={iconSize} fill="currentColor" />}
        </div>
      </motion.button>

      {/* Tooltip - improved visibility */}
      <div className={clsx(
        "absolute top-full mt-3 px-3 py-1 bg-void/90 border border-slate-700/50 backdrop-blur-md rounded text-xs font-serif tracking-wide whitespace-nowrap transition-all duration-300 pointer-events-none z-30 shadow-xl",
        isLocked ? "opacity-0 group-hover:opacity-50 translate-y-2 group-hover:translate-y-0 text-slate-500" : "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 text-amber-100"
      )}>
        {title}
      </div>
    </div>
  );
};