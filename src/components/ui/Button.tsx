import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for cleanly merging tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "locked" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export const Button = ({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}: ButtonProps) => {
  
  const variants = {
    // Amber Glow - The main action
    primary: "bg-amber text-void font-bold hover:bg-amber-blaze shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] border-transparent active:scale-[0.98]",
    
    // Ghost - Outlined, subtle
    ghost: "bg-transparent border-2 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white hover:bg-slate-800/50",
    
    // Locked - Disabled state
    locked: "bg-slate-800 text-slate-500 cursor-not-allowed border-transparent opacity-50 shadow-none hover:bg-slate-800",
    
    // Danger - For destructive actions
    danger: "bg-red-900/20 border-2 border-red-900 text-red-500 hover:bg-red-900/40 hover:text-red-400"
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-4 text-lg tracking-widest uppercase",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 disabled:pointer-events-none select-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};