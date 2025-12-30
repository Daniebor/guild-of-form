import { Image as ImageIcon, Film, AlertCircle } from "lucide-react";
import clsx from "clsx";

interface MediaFrameProps {
  src?: string;
  title?: string;
}

export const MediaFrame = ({ src, title }: MediaFrameProps) => {
  // Simple check for video extensions to decide render method
  const isVideo = src?.match(/\.(mp4|webm)$/i);

  return (
    <div className="mt-6 relative group overflow-hidden rounded border border-slate-700 bg-slate-900/50 aspect-video flex items-center justify-center shadow-inner transition-all duration-500 hover:border-slate-600">
      
      {src ? (
        isVideo ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          /* Using standard img for MVP simplicity over Next/Image for external URLs */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={title || "Lesson Artifact"}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        )
      ) : (
        /* Fallback / Placeholder State */
        <div className="flex flex-col items-center gap-3 text-slate-600">
          <div className="p-3 rounded-full bg-slate-800/50 border border-slate-700/50">
            <Film size={24} strokeWidth={1.5} className="opacity-50" />
          </div>
          <span className="text-xs font-mono tracking-widest uppercase opacity-40">
            Visual Artifact Not Found
          </span>
        </div>
      )}

      {/* Frame UI Overlay (Cosmetic Borders) */}
      <div className="absolute inset-0 border-2 border-slate-800/20 rounded pointer-events-none" />
      
      {/* Scanline Effect (Optional 'Tech' feel) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-10" />
    </div>
  );
};