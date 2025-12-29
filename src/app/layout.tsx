import type { Metadata } from 'next';
import './globals.css';
import { GameProvider } from '../context/GameContext';

export const metadata: Metadata = {
  title: 'The Mission Scroll - Guild of Form',
  description: 'Learn to sculpt in ZBrush through gamified quests.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Noto+Sans:wght@400;500;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-dark text-white">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
