import { clsx } from "clsx";

interface RuneTabletProps {
  hotkeys: string[];
  orientation?: "horizontal" | "vertical";
}

export const RuneTablet = ({ hotkeys, orientation = "horizontal" }: RuneTabletProps) => {
  if (!hotkeys || hotkeys.length === 0) return null;

  if (orientation === "vertical") {
    return (
      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 space-y-4 shadow-lg backdrop-blur-sm">
        <h3 className="text-xs font-serif text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">
          Runes Required
        </h3>
        <div className="flex flex-col gap-3">
          {hotkeys.map((key, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 group cursor-help"
            >
              <div className="flex items-center justify-center min-w-[32px] px-3 h-8 bg-slate-800 border border-slate-700 rounded text-amber-500 font-mono text-sm font-bold shadow-sm group-hover:border-amber-500/50 transition-colors">
                {key}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Horizontal Layout (Mobile / Top Bar)
  return (
    <div className="sticky top-16 z-40 w-full bg-void/95 border-b border-amber-900/30 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-6 py-3 flex items-center gap-4 overflow-x-auto no-scrollbar">
        <span className="text-xs font-serif text-slate-500 uppercase tracking-widest shrink-0">
          Runes:
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