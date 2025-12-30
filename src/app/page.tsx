import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background-dark text-white font-newsreader flex flex-col relative overflow-hidden selection:bg-primary selection:text-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{backgroundSize: "40px 40px", backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)"}}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark z-0"></div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 text-center">
        <div className="mb-8 animate-fade-in-up">
          <div className="size-20 mx-auto text-primary mb-6 flex items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 shadow-[0_0_30px_rgba(245,159,10,0.2)]">
            <span className="material-symbols-outlined !text-5xl">token</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-none mb-4 text-white">
            Guild of <span className="text-primary italic">Form</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-muted font-noto tracking-wide max-w-2xl mx-auto">
            Master the art of digital sculpting. <br className="hidden md:block"/>
            Embark on a journey from novice to grandmaster.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="px-8 py-4 rounded-full bg-[#1c1914] border border-[#393328] text-[#8a8175] font-noto text-sm tracking-widest uppercase flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Accepting Apprentices Soon
          </div>
        </div>

        {/* Feature Teasers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full text-left font-noto">
          {[
            { icon: 'swords', title: 'Daily Bounties', desc: 'Sharpen your skills with quick, timed sculpting challenges.' },
            { icon: 'auto_stories', title: 'Lore-Driven Learning', desc: 'Forget boring tutorials. Uncover ancient scrolls and techniques.' },
            { icon: 'military_tech', title: 'Rank Up', desc: 'Earn XP, unlock badges, and prove your mastery to the Guild.' }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl border border-[#393328] bg-card-dark/50 backdrop-blur-sm hover:border-primary/30 transition-colors group">
              <span className="material-symbols-outlined text-3xl text-primary mb-4 group-hover:scale-110 transition-transform">{feature.icon}</span>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-text-muted text-sm font-noto relative z-10">
        <p>&copy; {new Date().getFullYear()} Guild of Form. The clay awaits.</p>
        <div className="mt-4">
           {/* Secret login for devs */}
           <Link href="/dashboard" className="opacity-0 hover:opacity-20 transition-opacity text-xs">Guild Entrance</Link>
        </div>
      </footer>
    </div>
  );
}