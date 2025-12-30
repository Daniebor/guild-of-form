"use client";

import { motion } from "framer-motion";

interface MapConnectorProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  status: "locked" | "unlocked";
}

export const MapConnector = ({ startX, startY, endX, endY, status }: MapConnectorProps) => {
  // Convert 0-100 percentage coordinates to viewBox coordinates (assuming 100x100 viewBox for simplicity in aspect ratio)
  // Note: In the parent SVG, we will set preserveAspectRatio="none" so 100% width/height matches container
  
  const isUnlocked = status === "unlocked";

  return (
    <motion.line
      x1={`${startX}%`}
      y1={`${startY}%`}
      x2={`${endX}%`}
      y2={`${endY}%`}
      strokeWidth="2"
      className={isUnlocked ? "stroke-amber-500/50" : "stroke-slate-800"}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      strokeDasharray={isUnlocked ? "0" : "4 4"} // Dashed line for locked paths (optional style choice)
    />
  );
};