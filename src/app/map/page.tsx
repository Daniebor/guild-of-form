'use client';

import MapCanvas from '@/components/MapCanvas';
import { Hexagon } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="relative z-20 flex items-center justify-between border-b border-[#333]/50 bg-void/80 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-8 text-primary flex items-center justify-center rounded-lg bg-primary/10">
            <Hexagon />
          </div>
          <h2 className="text-white text-lg font-bold tracking-tight">World Map</h2>
        </div>
      </header>
      <MapCanvas />
    </div>
  );
}