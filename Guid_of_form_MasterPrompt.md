GUILD OF FORM: TECHNICAL SPECIFICATION

Version: 1.0
Purpose: Architecture, Stack, and Implementation Guide.

1. CORE TECH STACK

Component

Technology

Reasoning

Framework

Next.js 14+ (App Router)

Mobile-first performance, server components for fast content loading.

Styling

Tailwind CSS

Rapid UI development, easier to manage dark mode theme.

State

Zustand

Simple global state. Native persist middleware handles LocalStorage perfectly.

Animation

Framer Motion

Essential for the "gamified" feel (XP bars, modal reveals).

Icons

Lucide React

Consistent, lightweight SVG icons (Sword, Scroll, Shield).

Database

LocalStorage (Phase 1)

Zero-friction start. Offline capable.

Backend

Supabase (Phase 2)

Postgres/Auth for syncing data across devices later.

Hosting

Vercel

Native Next.js support. Zero-config deployment.

2. DESIGN SYSTEM

2.1 Color Palette (Dark Fantasy)

The Void (Background): bg-slate-950 (#020617)

Dungeon Wall (Surface): bg-slate-900 (#0f172a)

Stone (Border): border-slate-800 (#1e293b)

Magic/Fire (Primary): text-amber-500 (#f59e0b) / bg-amber-600

Mana (Secondary): text-blue-500 (#3b82f6)

Text: text-slate-200 (Main), text-slate-400 (Muted)

2.2 Typography

UI: Inter (Clean, legible sans-serif).

Headers/Lore: Cinzel (Fantasy serif for flavor).

3. DATA ARCHITECTURE

The application uses a Config-Driven UI. The content (from the Content Bible) is stored in static JSON/TypeScript objects, separating it from the component logic.

3.1 Data Models (lib/types.ts)

type Mission = {
  id: string;
  title: string;
  xp: number;
  intel: string;
  task: string;
};

type BossFight = {
  title: string;
  xp: number;
  test: string;
  winCondition: string;
};

type TrainingMontage = {
  title: string;
  xp: number;
  drill: string;
};

type Chapter = {
  id: string;
  title: string;
  goal: string;
  missions: Mission[];
  trainingMontage?: TrainingMontage;
  boss: BossFight;
};

type Path = {
  id: string;
  name: string;
  description: string;
  chapters: Chapter[];
};

type DailyQuest = {
  id: string;
  text: string;
  category: 'foundation' | 'organic' | 'hardsurface' | 'stylized' | 'maker' | 'mastery';
  xp: number;
};


3.2 State Management (store/userStore.ts)

interface UserState {
  // Stats
  xp: number;
  level: number; // Math.floor(xp / 1000) + 1
  rankTitle: string; 
  streak: number;
  lastLoginDate: string;

  // Progress
  completedMissionIds: string[]; 
  completedBossIds: string[];    
  unlockedPaths: string[]; 
  
  // Context
  activePath: 'foundation' | 'organic' | 'hardsurface' | 'stylized' | 'maker' | 'mastery';
  
  // Actions
  addXp: (amount: number) => void;
  completeMission: (missionId: string) => void;
  unlockPath: (pathId: string) => void;
  checkStreak: () => void; 
}


4. UI COMPONENT ARCHITECTURE

4.1 Layout Components

AppShell: Wraps the application. Handles the responsive switch between Desktop Sidebar and Mobile Bottom Nav.

Header: Displays current Title, Streak Counter (Mana Flow), and Settings cog.

4.2 Dashboard Components

XpBar: Large animated progress bar at the top of the Guild Hall.

BountyCard: The "Daily Grind" widget. Displays a random quest from the active path. Includes "Complete" and "Reroll" buttons.

4.3 Campaign Components

MapCanvas: An interactive map view (SVG/Canvas). Chapters are nodes. Nodes use conditional styling (Locked/Active/Completed).

ChapterNode: The clickable element on the map. Opens the Mission Drawer.

MissionDrawer (QuestScroll): A slide-over panel (styled like parchment) that lists the specific Missions, Intel, and Boss Fight for the selected chapter.

4.4 Modal Components

LevelUpModal: Triggers when XP crosses a threshold. Confetti/Particle effects.

PathSelector: A specialized modal that appears after Chapter 5 is complete. Forces the user to choose their Order (Path) to proceed.

5. IMPLEMENTATION ROADMAP

Step 1: Scaffolding & Setup

Initialize Next.js project with Tailwind and TypeScript.

Install dependencies: zustand, framer-motion, lucide-react, clsx, tailwind-merge.

Configure Tailwind theme (colors, fonts).

Step 2: Data Ingestion

Create lib/data/curriculum.ts. Paste the full content from the Content Bible.

Create lib/data/quests.ts. Paste the Daily Quest list.

Step 3: Core Logic (The Engine)

Build userStore with persist.

Implement checkStreak logic (compare lastLoginDate with today).

Implement XP and Level calculation helpers.

Step 4: UI Construction (The View)

Build AppShell (Sidebar/Nav).

Build the Dashboard (XP Bar + Daily Bounty).

Build the MapCanvas (Visualize the nodes).

Step 5: Gamification (The Juice)

Add Framer Motion layout animations to the XP bar.

Add unlock animations for map nodes.

Implement the PathSelector logic.

Step 6: Deployment

Push to GitHub.

Connect to Vercel (Hobby Tier).

Verify PWA settings (manifest.json) for mobile installability.