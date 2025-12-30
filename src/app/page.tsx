import Link from "next/link";
import { Map, Flame, Swords, ChevronDown, Scroll } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-void text-slate-200 overflow-x-hidden selection:bg-amber-900 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6">
        
        {/* Background Ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 text-amber-500 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            The Guild is Open
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-700 tracking-tighter drop-shadow-2xl">
            THE SCULPTOR'S SAGA
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Stop watching tutorials. Start <span className="text-amber-400 font-serif">Forging</span>. <br />
            The only gamified path to mastering ZBrush.
          </p>

          <div className="pt-8 flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link
              href="/map"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold tracking-wide transition-all duration-300 bg-amber-600 text-void rounded hover:bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                ENTER THE VOID <Swords size={20} />
              </span>
            </Link>
            <a 
              href="#features" 
              className="text-slate-500 hover:text-white transition-colors text-sm uppercase tracking-widest flex items-center gap-2"
            >
              Learn More <ChevronDown size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-32 bg-slate-950 relative border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif text-slate-100 mb-6">
              Three Pillars of Mastery
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              The Guild does not believe in passive learning. You must act, you must persist, and you must conquer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-void border border-slate-800 rounded-lg hover:border-amber-900/50 transition-colors group">
              <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mb-6 text-amber-600 group-hover:text-amber-400 group-hover:scale-110 transition-all border border-slate-800">
                <Map size={32} />
              </div>
              <h3 className="text-2xl font-serif text-slate-200 mb-4 group-hover:text-amber-500 transition-colors">The Constellation</h3>
              <p className="text-slate-500 leading-relaxed">
                A structured, non-linear curriculum. Start in the Abyss and ascend to the Aether. No more getting lost in random YouTube videos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-void border border-slate-800 rounded-lg hover:border-amber-900/50 transition-colors group">
              <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mb-6 text-amber-600 group-hover:text-amber-400 group-hover:scale-110 transition-all border border-slate-800">
                <Flame size={32} />
              </div>
              <h3 className="text-2xl font-serif text-slate-200 mb-4 group-hover:text-amber-500 transition-colors">The Forge Fire</h3>
              <p className="text-slate-500 leading-relaxed">
                Consistency is heat. If you stop striking the anvil, the iron goes cold. Our streak system ensures you practice daily.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-void border border-slate-800 rounded-lg hover:border-amber-900/50 transition-colors group">
              <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mb-6 text-amber-600 group-hover:text-amber-400 group-hover:scale-110 transition-all border border-slate-800">
                <Scroll size={32} />
              </div>
              <h3 className="text-2xl font-serif text-slate-200 mb-4 group-hover:text-amber-500 transition-colors">The Grimoire</h3>
              <p className="text-slate-500 leading-relaxed">
                Visual, bite-sized lessons. No long lectures. Just the "Runes" (Hotkeys) and the Rituals you need to create art.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- LORE / CTA SECTION --- */}
      <section className="py-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-900/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif text-amber-500 mb-8 tracking-wide">
            "Will You Take Up The Chisel?"
          </h2>
          <p className="text-xl text-slate-400 font-light mb-12 italic">
            The Formless waits to be shaped. The Guild awaits its new Architect.
          </p>
          
          <Link
            href="/map"
            className="inline-block px-12 py-5 bg-slate-100 text-void font-bold text-lg tracking-widest rounded hover:bg-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            BEGIN THE SAGA
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-900 bg-void text-center">
        <div className="text-slate-600 font-mono text-xs uppercase tracking-widest">
          <span className="text-amber-900">Est. 2024</span> • The Guild of Form • <span className="text-amber-900">v1.0.0</span>
        </div>
      </footer>

    </div>
  );
}