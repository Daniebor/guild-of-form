import React from 'react';
import Header from './Header';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-void text-text-main">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      {/* Bottom Nav for mobile will be added here later */}
    </div>
  );
}