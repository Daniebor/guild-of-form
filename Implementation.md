The Sculptor's Saga: MVP Developer Manual

Project Summary: A gamified educational web app for learning ZBrush. Users progress through a vertical "Constellation Map," unlocking lessons and fighting "Bosses" (challenges).
Core Mechanic: The "Forge" (Streak System) which tracks daily consistency as "Heat."
Tech Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Zustand (State), Framer Motion (Animation).

Phase 1: Environment & Design System

Goal: Set up the canvas and define the visual language.

1.1 Project Initialization

Run the following command to scaffold the project:

npx create-next-app@latest sculptors-saga --typescript --tailwind --eslint


Prompts:

Use src/ directory? Yes

Use App Router? Yes

Customize default import alias? Yes (@/*)

Install required dependencies:

npm install zustand framer-motion lucide-react clsx tailwind-merge
npm install -D @tailwindcss/typography


1.2 Font Configuration (src/app/layout.tsx)

We use Cinzel for headers (Fantasy feel) and Inter for UI text (Readability).

Import fonts:

import { Inter, Cinzel } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });


Apply variables to the <body> tag: <body className={${inter.variable} ${cinzel.variable} ...}>

1.3 Tailwind Theme (tailwind.config.ts)

Replace the theme object with this exact configuration to enforce the "Dark Fantasy" palette:

theme: {
  extend: {
    colors: {
      void: '#0a0a0a',       // Main Background (Deep Black)
      slate: '#1e293b',      // Card/UI Background
      amber: {
        DEFAULT: '#f59e0b',  // Primary/Magic/Fire
        glow: '#d97706',
      },
      blueFlame: '#3b82f6',  // Mastery/High Level
    },
    fontFamily: {
      sans: ['var(--font-inter)'],
      serif: ['var(--font-cinzel)'],
    },
  },
}


1.4 Global Resets (src/app/globals.css)

Ensure the app feels like a dark immersive experience by default.

@layer base {
  body {
    @apply bg-void text-slate-100 font-sans antialiased;
  }
  h1, h2, h3, h4 {
    @apply font-serif text-amber;
  }
}


Phase 2: The Data Layer (The Grimoire)

Goal: structure the curriculum and handle user progress state.

2.1 Type Definitions (src/lib/types.ts)

Copy these interfaces. They are the contract for the entire app.

export type NodeType = 'lesson' | 'boss';
export type NodeStatus = 'locked' | 'active' | 'completed';

export interface CurriculumNode {
  id: string;
  title: string;
  type: NodeType;
  description: string;
  position: { x: number; y: number }; // Percentage (0-100) for relative positioning on map
  xpReward: number;
  requires?: string[]; // IDs of nodes that must be finished first
}

export interface Chapter {
  id: string;
  title: string;
  nodes: CurriculumNode[];
}

export interface UserState {
  xp: number;
  streak: number;
  lastLoginDate: string | null; // ISO Date String
  completedNodes: string[]; // Array of Node IDs
  unlockedChapters: string[]; // Array of Chapter IDs
}


2.2 The Store (src/lib/store/userStore.ts)

Implement a Zustand store with persist (LocalStorage) to save progress without a backend.

State: user: UserState

Actions:

completeNode(nodeId: string):

Add ID to completedNodes.

Find the node in curriculum data and add its xpReward to user.xp.

Unlock the next node (logic: find node where requires includes this nodeId).

checkStreak():

On app load, compare new Date() with lastLoginDate.

If difference > 48 hours, decrement/reset streak.

Update lastLoginDate to now.

2.3 The Mock Database (src/lib/data/curriculum.ts)

Create a static const object.

Chapter 1 (The Awakening):

Node 1.1 ("The Eye") -> x: 50, y: 10

Node 1.2 ("The Trap") -> x: 30, y: 25

Node 1.3 ("The Summoning") -> x: 70, y: 40

Boss 1 ("The Watcher") -> x: 50, y: 60 (Large Hexagon)

Phase 3: The UI Framework (The Temple)

Goal: Build reusable components.

3.1 The Header (src/components/layout/ForgeHeader.tsx)

A fixed sticky top-0 z-50 bar.

Left: "The Sculptor's Saga" (Cinzel font).

Right:

Streak: A Fire Icon (Lucide-React). Color depends on streak count (Grey if 0, Amber if >3, Blue if >15).

XP: Simple text XP: 1200.

3.2 UI Primitives

Button (src/components/ui/Button.tsx):

primary: bg-amber text-void hover:bg-amber-glow

ghost: border border-slate-700 text-slate-300 hover:bg-slate-800

locked: bg-slate-800 text-slate-500 cursor-not-allowed

Phase 4: The Campaign Map (The Ascension)

Goal: A vertical scrolling map where users select their next task.

4.1 The Map Container (src/app/map/page.tsx)

Layout: A div with relative w-full max-w-2xl mx-auto min-h-[200vh].

Background: A CSS gradient bg-gradient-to-t from-void via-slate-900 to-blue-900.

Scroll: It should start at the bottom (Chapter 1) and scroll up ideally, but for MVP standard down-scroll is acceptable if labeled "Ascending".

4.2 The Node Component (src/components/map/MapNode.tsx)

Positioning: absolute using left: ${node.position.x}%, top: ${node.position.y}%.

Visual Logic:

Locked: <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 grayscale" />

Active: Use Framer Motion to pulse the scale. border-amber shadow-[0_0_15px_rgba(245,158,11,0.5)].

Completed: Solid Amber fill using <Star /> icon.

Interaction: Clicking an Active or Completed node navigates to /lesson/[chapterId]/[nodeId].

4.3 The Connector Lines (src/components/map/MapConnector.tsx)

Logic: An SVG <svg className="absolute inset-0 pointer-events-none"> that sits behind the nodes.

Paths: Draw <line x1 y1 x2 y2 /> between nodes that have a dependency relationship.

Styling: Stroke color is slate-700 (locked) or amber (completed).

Phase 5: The Lesson Experience (The Mission)

Goal: The actual content consumption page.

5.1 Route Structure

File: src/app/lesson/[chapterId]/[nodeId]/page.tsx

Use params to look up the specific node content from curriculum.ts.

5.2 The Rune Tablet (Sticky Header)

File: src/components/lesson/RuneTablet.tsx

A small bar sticky under the main header.

Displays: "Hotkeys: [B] [M] [V]" (dynamically loaded from lesson data).

5.3 The Completion Interaction

File: src/components/lesson/HoldButton.tsx

Concept: Instead of a click, the user must hold to simulate "casting a spell" or "finishing a sculpt".

Implementation:

Use Framer Motion motion.div.

On onPointerDown, animate a progress bar width from 0% to 100% over 1.5 seconds.

On onAnimationComplete, trigger the onSuccess callback.

On onPointerUp, if not complete, reset animation to 0%.

Phase 6: The Training Ground (The Gatekeeper)

Goal: Handle the Boss Unlock mechanic.

6.1 Logic Flow

User clicks a Boss Node on the map.

Check userStore.xp vs node.requirementXP.

If XP is sufficient: Route to Boss Page.

If XP is low: Open the Anvil Overlay.

6.2 The Anvil Overlay (src/components/training/AnvilOverlay.tsx)

UI: A fixed bottom drawer (fixed bottom-0 w-full h-1/2 bg-slate-900 border-t border-amber).

Content:

Text: "You are not strong enough. Current XP: 200 / Required: 400".

Drill List: A horizontal scrolling list of "Drill Cards".

Drill Card:

Title: "Sculpt a Sphere"

Reward: "+50 XP"

Action: Button "Perform Drill" -> Adds 50 XP immediately (Mock logic for MVP) -> Updates progress bar.

6.3 Boss Unlock

Once the overlay updates the store to meet the requirement, the "Locked" state on the Boss Node visually breaks (simple CSS transition to Active).

Phase 7: Final Polish

Transitions: Add layout.tsx page transitions using Framer Motion <AnimatePresence>.