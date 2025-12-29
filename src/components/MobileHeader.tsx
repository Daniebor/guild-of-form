import { Castle, Menu } from 'lucide-react';

export default function MobileHeader() {
  return (
    <div className="lg:hidden flex items-center justify-between p-4 border-b border-border-dark bg-[#1c1914] sticky top-0 z-20">
      <div className="flex items-center gap-2 text-white">
        <Castle className="text-primary" />
        <h2 className="text-lg font-bold">The Guild Hall</h2>
      </div>
      <button className="text-white p-2">
        <Menu />
      </button>
    </div>
  );
}