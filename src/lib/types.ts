export type NodeType = 'lesson' | 'boss';
export type NodeStatus = 'locked' | 'active' | 'completed';

export interface LessonStep {
  title: string;
  description: string; // Supports simple text/markdown
  media?: string; // Path to GIF/Video placeholder
}

export interface CurriculumNode {
  id: string;
  title: string;
  type: NodeType;
  description: string;
  position: { x: number; y: number }; // Percentage (0-100) for relative positioning on map
  xpReward: number;
  requiredXP?: number; // EXP needed to unlock node (boss nodes)
  requires?: string[]; // IDs of nodes that must be finished first
  
  // New Content Fields for Lesson View
  hotkeys?: string[]; 
  steps?: LessonStep[];
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

// Action types for the store
export interface UserActions {
  completeNode: (nodeId: string) => void;
  checkStreak: () => void;
  addXP: (amount: number) => void;
  unlockChapter: (chapterId: string) => void;
  resetProgress: () => void; // Helpful for debugging
}