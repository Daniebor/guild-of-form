'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Castle, Map, BookOpen, Settings, Users } from 'lucide-react';

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="w-72 hidden lg:flex flex-col border-r border-border-dark bg-[#1c1914]">
      <div className="p-6 border-b border-border-dark flex items-center gap-3">
        <div className="size-8 text-primary flex items-center justify-center">
          <Castle />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">The Guild Hall</h1>
      </div>
      <nav className="flex-1 flex flex-col gap-2 p-4">
        {/* Guild Hall Link */}
        <Link 
          href="/" 
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
            pathname === '/' 
              ? 'bg-primary/10 border border-primary/20 text-primary font-bold' 
              : 'hover:bg-white/5 text-text-muted hover:text-white font-medium'
          }`}
        >
          <Castle className={pathname === '/' ? 'text-primary' : ''} />
          <span className="text-sm">Guild Hall</span>
        </Link>
        {/* World Map Link */}
        <Link 
          href="/map" 
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
            pathname === '/map' 
              ? 'bg-primary/10 border border-primary/20 text-primary font-bold' 
              : 'hover:bg-white/5 text-text-muted hover:text-white font-medium'
          }`}
        >
          <Map className={pathname === '/map' ? 'text-primary' : ''} />
          <span className="text-sm">World Map</span>
        </Link>
        {/* <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-text-muted hover:text-white">
          <BookOpen />
          <span className="font-medium text-sm">Grimoire</span>
        </Link>
        <div className="mt-8 px-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">My Guild</p>
          <Link href="#" className="flex items-center gap-4 px-0 py-2 transition-colors text-text-muted hover:text-white">
            <Users className="text-sm" />
            <span className="font-medium text-sm">Sculptors of Ash</span>
          </Link>
        </div> */}
      </nav>
      <div className="p-4 border-t border-border-dark">
        <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-white/5 transition-colors">
          <div className="size-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-gray-600">
            <Settings className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-white">Settings</span>
          </div>
        </button>
      </div>
    </aside>
  );
}