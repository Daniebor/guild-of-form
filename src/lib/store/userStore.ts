import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState, UserActions } from '../types';
import { CURRICULUM, findNodeById } from '../data/curriculum';
import { supabase } from '../supabase';

interface Store extends UserState, UserActions {
  syncWithSupabase: (userId: string) => Promise<void>;
}

const INITIAL_STATE: UserState = {
  xp: 0,
  streak: 0,
  lastLoginDate: null,
  completedNodes: [],
  completedPractices: [],
  completedDrills: [],
  unlockedChapters: ['chapter-1'],
};

// Helper to push state to Supabase
const pushUpdate = async (userId: string, updates: Partial<UserState>) => {
  if (!userId) return;
  const payload: any = {
    updated_at: new Date().toISOString(),
  };
  
  if (updates.xp !== undefined) payload.xp = updates.xp;
  if (updates.streak !== undefined) payload.streak = updates.streak;
  if (updates.lastLoginDate !== undefined) payload.last_login_date = updates.lastLoginDate;
  if (updates.completedNodes !== undefined) payload.completed_nodes = updates.completedNodes;
  if (updates.completedPractices !== undefined) payload.completed_practices = updates.completedPractices;
  if (updates.completedDrills !== undefined) payload.completed_drills = updates.completedDrills;
  if (updates.unlockedChapters !== undefined) payload.unlocked_chapters = updates.unlockedChapters;

  const { error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('id', userId);
  
  if (error) console.error('Supabase Sync Error:', error);
};

export const useUserStore = create<Store>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      // --- SUPABASE SYNC LOGIC ---
      syncWithSupabase: async (userId: string) => {
        // 1. Fetch remote profile
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error || !profile) {
          // If no profile (shouldn't happen due to trigger), or error, do nothing
          console.warn("Could not fetch profile", error);
          return;
        }

        // 2. CONFLICT RESOLUTION: 
        // We generally trust the DB, BUT if local has significantly more progress (played offline),
        // we might want to keep local. For MVP: Remote overwrites Local.
        // Ideally: Merge them.
        
        // Simple Merge Strategy: Take the MAX XP and Union of nodes
        const local = get();
        
        const mergedXP = Math.max(local.xp, profile.xp || 0);
        const mergedNodes = Array.from(new Set([...local.completedNodes, ...(profile.completed_nodes || [])]));
        const mergedPractices = Array.from(new Set([...local.completedPractices, ...(profile.completed_practices || [])]));
        const mergedDrills = Array.from(new Set([...local.completedDrills, ...(profile.completed_drills || [])]));
        const mergedChapters = Array.from(new Set([...local.unlockedChapters, ...(profile.unlocked_chapters || [])]));
        
        const newState = {
          xp: mergedXP,
          streak: profile.streak || local.streak, // Trust remote streak usually
          completedNodes: mergedNodes,
          completedPractices: mergedPractices,
          completedDrills: mergedDrills,
          unlockedChapters: mergedChapters,
          lastLoginDate: profile.last_login_date || local.lastLoginDate,
        };

        // Update Local Store
        set(newState);

        // Sync back the merged result to Cloud immediately
        pushUpdate(userId, newState);
      },

      // --- ACTIONS ---

      addXP: async (amount) => {
        set((state) => {
          const newXP = state.xp + amount;
          // Optimistic update
          const session = supabase.auth.getSession().then(({ data }) => {
             if (data.session) pushUpdate(data.session.user.id, { xp: newXP });
          });
          return { xp: newXP };
        });
      },

      unlockChapter: (chapterId) =>
        set((state) => {
          if (state.unlockedChapters.includes(chapterId)) return state;
          const newChapters = [...state.unlockedChapters, chapterId];
          
          supabase.auth.getSession().then(({ data }) => {
             if (data.session) pushUpdate(data.session.user.id, { unlockedChapters: newChapters });
          });

          return { unlockedChapters: newChapters };
        }),

      completeDrill: (drillId) => {
        const state = get();
        if (state.completedDrills.includes(drillId)) return;

        const newCompletedDrills = [...state.completedDrills, drillId];
        const updates = { completedDrills: newCompletedDrills };
        
        set(updates);
        
        supabase.auth.getSession().then(({ data }) => {
             if (data.session) pushUpdate(data.session.user.id, updates);
        });
      },

      togglePractice: (practiceId) => {
        const state = get();
        const isCompleted = state.completedPractices.includes(practiceId);
        let newCompletedPractices;

        if (isCompleted) {
          newCompletedPractices = state.completedPractices.filter(id => id !== practiceId);
        } else {
          newCompletedPractices = [...state.completedPractices, practiceId];
          get().checkStreak();
        }

        const updates = { completedPractices: newCompletedPractices };
        
        set(updates);
        
        supabase.auth.getSession().then(({ data }) => {
             if (data.session) pushUpdate(data.session.user.id, updates);
        });
      },

      completeNode: (nodeId) => {
        const state = get();
        if (state.completedNodes.includes(nodeId)) return;

        const node = findNodeById(nodeId);
        if (!node) return;

        const newXP = state.xp + node.xpReward;
        const newCompletedNodes = [...state.completedNodes, nodeId];
        
        const newUnlockedChapters = [...state.unlockedChapters];
        if (nodeId === 'boss-1' && !newUnlockedChapters.includes('chapter-2')) {
          newUnlockedChapters.push('chapter-2');
        }
        // (Add logic for other bosses here as needed)

        // DB Update payload
        const updates = {
            xp: newXP,
            completedNodes: newCompletedNodes,
            unlockedChapters: newUnlockedChapters
        };

        set(updates);
        get().checkStreak();

        // Fire and forget sync
        supabase.auth.getSession().then(({ data }) => {
             if (data.session) pushUpdate(data.session.user.id, updates);
        });
      },

      checkStreak: () => {
        const state = get();
        const now = new Date();
        const lastLogin = state.lastLoginDate ? new Date(state.lastLoginDate) : null;

        let newStreak = state.streak;
        let shouldUpdate = false;

        if (!lastLogin) {
          newStreak = 1;
          shouldUpdate = true;
        } else {
          const diffTime = Math.abs(now.getTime() - lastLogin.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

          if (state.streak === 0) {
            newStreak = 1;
            shouldUpdate = true;
          } else if (diffDays === 2) { 
            newStreak += 1;
            shouldUpdate = true;
          } else if (diffDays > 2) {
            newStreak = 1; // Reset
            shouldUpdate = true;
          } else if (diffDays <= 1) {
             // Only update timestamp
             shouldUpdate = true;
          }
        }

        if (shouldUpdate) {
            const newState = { streak: newStreak, lastLoginDate: now.toISOString() };
            set(newState);
            supabase.auth.getSession().then(({ data }) => {
                if (data.session) pushUpdate(data.session.user.id, newState);
            });
        }
      },

      resetProgress: () => set(INITIAL_STATE),
    }),
    {
      name: 'sculptors-saga-storage',
    }
  )
);