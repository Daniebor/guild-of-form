import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Helper to get date in YYYY-MM-DD format
const getToday = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

interface UserState {
  // Stats
  xp: number;
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
  completeMission: (missionId: string, bossId?: string) => void;
  unlockPath: (pathId: string) => void;
  setActivePath: (pathId: 'foundation' | 'organic' | 'hardsurface' | 'stylized' | 'maker' | 'mastery') => void;
  checkStreak: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial State
      xp: 0,
      streak: 1,
      lastLoginDate: getToday(),
      completedMissionIds: [],
      completedBossIds: [],
      unlockedPaths: ['foundation'],
      activePath: 'foundation',

      // Actions
      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),

      completeMission: (missionId, bossId) => {
        const { completedMissionIds, completedBossIds } = get();
        if (!completedMissionIds.includes(missionId)) {
          set((state) => ({
            completedMissionIds: [...state.completedMissionIds, missionId],
          }));
        }
        if (bossId && !completedBossIds.includes(bossId)) {
          set((state) => ({
            completedBossIds: [...state.completedBossIds, bossId],
          }));
        }
      },

      unlockPath: (pathId) => {
        const { unlockedPaths } = get();
        if (!unlockedPaths.includes(pathId)) {
          set((state) => ({
            unlockedPaths: [...state.unlockedPaths, pathId],
          }));
        }
      },
      
      setActivePath: (pathId) => set({ activePath: pathId }),

      checkStreak: () => {
        const today = new Date();
        const lastLogin = new Date(get().lastLoginDate);
        
        // Reset time part to compare dates only
        today.setHours(0,0,0,0);
        lastLogin.setHours(0,0,0,0);

        const diffTime = today.getTime() - lastLogin.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Logged in yesterday, increment streak
          set((state) => ({
            streak: state.streak + 1,
            lastLoginDate: getToday(),
          }));
        } else if (diffDays > 1) {
          // Missed a day, reset streak
          set({ streak: 1, lastLoginDate: getToday() });
        }
        // if diffDays is 0, they already logged in today, do nothing.
      },
    }),
    {
      name: 'guild-of-form-user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// --- Selectors and Derived State ---
export const getLevel = (xp: number) => Math.floor(xp / 1000) + 1;

const ranks = [
    "Apprentice", "Journeyman", "Artisan", "Master", "Grandmaster", "Architect"
];

/**
 * Calculates the user's rank title based on their level.
 * @param level The user's current level.
 * @returns The rank title.
 */
export const getRankTitle = (level: number) => {
    if (level >= 50) return ranks[5];
    if (level >= 30) return ranks[4];
    if (level >= 20) return ranks[3];
    if (level >= 10) return ranks[2];
    if (level >= 5) return ranks[1];
    return ranks[0];
};