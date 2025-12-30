import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState, UserActions } from '../types';
import { CURRICULUM, findNodeById } from '../data/curriculum';

interface Store extends UserState, UserActions {}

const INITIAL_STATE: UserState = {
  xp: 0,
  streak: 0,
  lastLoginDate: null,
  completedNodes: [],
  unlockedChapters: ['chapter-1'],
};

export const useUserStore = create<Store>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),

      unlockChapter: (chapterId) =>
        set((state) => {
          if (state.unlockedChapters.includes(chapterId)) return state;
          return { unlockedChapters: [...state.unlockedChapters, chapterId] };
        }),

      completeNode: (nodeId) => {
        const state = get();
        if (state.completedNodes.includes(nodeId)) return; // Already completed

        const node = findNodeById(nodeId);
        if (!node) return;

        // 1. Add XP
        const newXP = state.xp + node.xpReward;

        // 2. Mark as completed
        const newCompletedNodes = [...state.completedNodes, nodeId];

        // 3. Check for Chapter Unlocks (Simple logic: If Boss 1 is done, unlock Chapter 2)
        const newUnlockedChapters = [...state.unlockedChapters];
        if (nodeId === 'boss-1' && !newUnlockedChapters.includes('chapter-2')) {
          newUnlockedChapters.push('chapter-2');
        }

        set({
          xp: newXP,
          completedNodes: newCompletedNodes,
          unlockedChapters: newUnlockedChapters,
        });
      },

      checkStreak: () => {
        const state = get();
        const now = new Date();
        const lastLogin = state.lastLoginDate ? new Date(state.lastLoginDate) : null;

        // First login ever
        if (!lastLogin) {
          set({ streak: 1, lastLoginDate: now.toISOString() });
          return;
        }

        const diffTime = Math.abs(now.getTime() - lastLogin.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        // Same day login: do nothing
        if (diffDays <= 1) {
           // update time but keep streak same (or implement hourly checks later)
           set({ lastLoginDate: now.toISOString() });
           return;
        }

        // Consecutive day (Logged in yesterday)
        if (diffDays === 2) { // roughly 24-48 hours window logic simplified
          set({ streak: state.streak + 1, lastLoginDate: now.toISOString() });
        } 
        // Missed a day (More than 48 hours since last login)
        else if (diffDays > 2) {
          // Heat Decay: Reset to 1 for MVP (or decrement in future)
          set({ streak: 1, lastLoginDate: now.toISOString() });
        }
      },

      resetProgress: () => set(INITIAL_STATE),
    }),
    {
      name: 'sculptors-saga-storage', // unique name for local storage key
    }
  )
);