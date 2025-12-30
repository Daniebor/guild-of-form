import { clsx } from "clsx";

interface RuneTabletProps {
  hotkeys: string[];
}

export const RuneTablet = ({ hotkeys }: RuneTabletProps) => {
  if (!hotkeys || hotkeys.length === 0) return null;

  return (
    <div className="sticky top-16 z-40 w-full bg-void/95 border-b border-amber-900/30 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-6 py-3 flex items-center gap-4 overflow-x-auto no-scrollbar">
        <span className="text-xs font-serif text-slate-500 uppercase tracking-widest shrink-0">
          Runes Required:
        </span>
        <div className="flex gap-3">
          {hotkeys.map((key, index) => (
            <div 
              key={index}
              className="flex items-center justify-center min-w-[32px] px-2 h-8 bg-slate-800 border border-slate-700 rounded text-amber-500 font-mono text-sm font-bold shadow-sm whitespace-nowrap"
            >
              {key}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};