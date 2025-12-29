'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Castle, Map, BookOpen } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden sticky bottom-0 w-full bg-[#1c1914] border-t border-border-dark flex justify-around p-2 z-30" style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
      <Link 
        href="/" 
        className={`flex flex-col items-center gap-1 p-2 transition-colors ${
            pathname === '/' ? 'text-primary' : 'text-text-muted'
        }`}
      >
        <Castle />
        <span className="text-[10px] font-medium">Guild</span>
      </Link>
      <Link 
        href="/map" 
        className={`flex flex-col items-center gap-1 p-2 transition-colors ${
            pathname === '/map' ? 'text-primary' : 'text-text-muted'
        }`}
      >
        <Map />
        <span className="text-[10px] font-medium">Map</span>
      </Link>
      <Link href="#" className="flex flex-col items-center gap-1 p-2 text-text-muted">
        <BookOpen />
        <span className="text-[10px] font-medium">Grimoire</span>
      </Link>
    </nav>
  );
}