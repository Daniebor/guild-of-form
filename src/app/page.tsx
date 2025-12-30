import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center bg-void">
      {/* Background Ambience (Optional Glow effect) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl px-6 space-y-10">
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-amber tracking-widest drop-shadow-lg">
          THE SCULPTOR'S SAGA
        </h1>

        {/* Narrative Subtitle */}
        <p className="text-lg md:text-2xl text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto">
          The Void is cold. The Clay is silent. <br />
          Only through the <span className="text-amber font-semibold">Forge</span> can you bring Order to Chaos.
        </p>

        {/* Call to Action */}
        <div className="pt-8">
          <Link
            href="/map"
            className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold tracking-wide transition-all duration-300 bg-transparent border-2 rounded-sm border-amber text-amber hover:bg-amber hover:text-void shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)]"
          >
            <span className="relative z-10">ENTER THE GUILD</span>
            {/* Subtle inner glow on hover */}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-amber-400 blur-md group-hover:opacity-30" />
          </Link>
        </div>

        {/* Footer / Version */}
        <div className="pt-20 text-sm text-slate-600 font-serif tracking-widest uppercase">
          Phase I: The Foundation
        </div>
      </div>
    </div>
  );
}