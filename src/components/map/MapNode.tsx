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

  // Base sizing logic
  const sizeClass = isBoss ? "w-16 h-16" : "w-10 h-10";
  const iconSize = isBoss ? 24 : 16;

  // Visual variants based on status
  const statusClasses = clsx({
    // Locked: Dull, Recessed
    "bg-slate-900 border-slate-700 text-slate-600 grayscale opacity-70 cursor-not-allowed": isLocked,
    // Active: Glowing, Pulsing
    "bg-slate-900 border-amber text-amber shadow-[0_0_20px_rgba(245,158,11,0.4)] cursor-pointer hover:scale-110 hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]": isActive,
    // Completed: Solid Gold
    "bg-amber border-amber-light text-void shadow-lg shadow-amber/20 cursor-pointer hover:bg-amber-light": isCompleted,
  });

  return (
    <div
      id={`node-${id}`} // Added ID for auto-scroll targeting
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group z-10"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.button
        onClick={onClick}
        disabled={isLocked}
        className={clsx(
          "relative flex items-center justify-center rounded-full border-2 transition-all duration-300 z-10",
          sizeClass,
          statusClasses
        )}
        // Pulse animation for active nodes
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        whileTap={!isLocked ? { scale: 0.9 } : {}}
      >
        {/* Render Icon based on state */}
        {isBoss ? (
          <Hexagon className={clsx("absolute inset-0 w-full h-full", isLocked ? "stroke-slate-700" : "stroke-current")} strokeWidth={1} />
        ) : null}

        <div className="z-10 relative">
          {isLocked && <Lock size={iconSize} />}
          {isActive && <Play size={iconSize} fill="currentColor" />}
          {isCompleted && <Star size={iconSize} fill="currentColor" />}
        </div>
      </motion.button>

      {/* Title Tooltip (Visible on Hover) */}
      <div className={clsx(
        "absolute top-full mt-2 px-3 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-serif tracking-wide whitespace-nowrap transition-opacity duration-300 pointer-events-none",
        isLocked ? "opacity-0 group-hover:opacity-50 text-slate-500" : "opacity-0 group-hover:opacity-100 text-amber-50"
      )}>
        {title}
      </div>
    </div>
  );
};