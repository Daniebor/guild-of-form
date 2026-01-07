"use client";

import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { clsx } from "clsx";

interface HoldButtonProps {
  onSuccess: () => void;
  label?: string;
  completed?: boolean;
  disabled?: boolean;
}

export const HoldButton = ({ onSuccess, label = "Hold to Complete", completed = false, disabled = false }: HoldButtonProps) => {
  const [isHolding, setIsHolding] = useState(false);
  const controls = useAnimation();

  const handleStart = () => {
    if (completed || disabled) return;
    setIsHolding(true);
    controls.start({
      width: "100%",
      transition: { duration: 1.5, ease: "linear" },
    });
  };

  const handleEnd = () => {
    if (completed || disabled) return;
    setIsHolding(false);
    controls.stop();
    controls.set({ width: "0%" });
  };

  const handleComplete = () => {
    if (isHolding) {
      onSuccess();
      setIsHolding(false);
    }
  };

  if (completed) {
    return (
      <div className="w-full h-14 rounded bg-amber text-void font-bold font-serif tracking-widest flex items-center justify-center uppercase shadow-[0_0_20px_rgba(245,158,11,0.4)]">
        Trial Complete
      </div>
    );
  }

  return (
    <div className={clsx(
      "relative w-full h-14 rounded bg-slate-900 border border-slate-700 overflow-hidden select-none group",
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    )}>
      {/* Background Fill Animation */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-amber-600"
        initial={{ width: "0%" }}
        animate={controls}
        onAnimationComplete={handleComplete}
      />

      {/* Button Interactions Layer */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10"
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
      >
        <span className={clsx(
          "font-serif tracking-widest uppercase transition-colors duration-300",
          isHolding ? "text-white" : "text-slate-400 group-hover:text-amber-500"
        )}>
          {label}
        </span>
      </div>
    </div>
  );
};