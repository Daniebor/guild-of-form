import React from 'react';
import SideNav from './SideNav';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <SideNav />
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto bg-background-dark">
        <MobileHeader />
        {children}
        <MobileBottomNav />
      </main>
    </div>
  );
}