export interface PlayerProfile {
    id: string;
    name: string;
    avatarUrl: string;
    level: number;
    currentXp: number;
    xpToNextLevel: number;
    rankTitle: string;
    streakDays: number;
    notifications: number;
}

export interface DailyBounty {
    id: string;
    title: string;
    description: string;
    rewardXp: number;
    icon: string;
    isClaimed: boolean;
    timeLeft?: string;
}

export interface MissionObjective {
    id: number;
    text: string;
    isCompleted: boolean;
}

export interface Mission {
    id: string;
    chapterId: string;
    title: string;
    classType: string; // e.g., "Vertex Manipulation"
    description: string;
    thumbnailUrl: string;
    videoUrl?: string; // Placeholder for video/action
    scrollContent: {
        title: string;
        text: string;
        quote?: string;
    };
    objectives: MissionObjective[];
    xpReward: number;
    isCompleted: boolean;
    isLocked: boolean;
}

export interface Chapter {
    id: string;
    sequence: number;
    title: string;
    description: string;
    status: 'locked' | 'active' | 'completed';
    missions: Mission[];
}

export interface GameState {
    player: PlayerProfile;
    bounties: DailyBounty[];
    chapters: Chapter[];
    activeMissionId: string | null;
}
