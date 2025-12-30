import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const Card = ({ children, className, title }: CardProps) => {
  return (
    <div className={cn(
      // The "Obsidian" Look: Dark slate, subtle border, heavy shadow
      "bg-slate shadow-xl border border-slate-700/50 rounded-lg overflow-hidden relative",
      className
    )}>
      {/* Optional Inner Glow at top to simulate light source */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
      
      {title && (
        <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-900/30">
          <h3 className="text-amber font-serif font-bold tracking-wide text-lg drop-shadow-sm">
            {title}
          </h3>
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};