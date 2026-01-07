export type NodeType = 'lesson' | 'boss';
export type NodeStatus = 'locked' | 'active' | 'completed';

export interface LessonStep {
  title: string;
  description: string;
  media?: string;
}

export interface Pitfall {
  title: string;
  description: string;
}

export interface PracticeItem {
  title: string;
  description: string;
  media?: string;
}

export interface Drill {
  id: number | string;
  title: string;
  xp: number;
  duration: string;
  description: string;
  steps: string[];
  media?: string;
}

export interface CurriculumNode {
  id: string;
  title: string;
  type: NodeType;
  description: string;
  position: { x: number; y: number };
  xpReward: number;
  requiredXP?: number;
  requires?: string[];
  hotkeys?: string[]; 
  steps?: LessonStep[];
  pitfalls?: Pitfall[];
  practice?: PracticeItem[];
  drills?: Drill[];
}

export interface Chapter {
  id: string;
  title: string;
  nodes: CurriculumNode[];
}

export interface UserState {
  xp: number;
  streak: number;
  lastLoginDate: string | null;
  completedNodes: string[];
  completedPractices: string[];
  unlockedChapters: string[];
}

export interface UserActions {
  completeNode: (nodeId: string) => void;
  togglePractice: (practiceId: string) => void;
  checkStreak: () => void;
  addXP: (amount: number) => void;
  unlockChapter: (chapterId: string) => void;
  resetProgress: () => void;
}