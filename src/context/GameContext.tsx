import { createContext, useContext, useState, ReactNode } from 'react';
import { GameState } from '../types';
import { initialGameState } from '../data/mockData';

interface GameContextType extends GameState {
    toggleObjective: (missionId: string, objectiveId: number) => void;
    completeMission: (missionId: string) => void;
    setActiveMission: (missionId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<GameState>(initialGameState);

    const toggleObjective = (missionId: string, objectiveId: number) => {
        setState(prev => {
            const newChapters = prev.chapters.map(chapter => ({
                ...chapter,
                missions: chapter.missions.map(mission => {
                    if (mission.id === missionId) {
                        return {
                            ...mission,
                            objectives: mission.objectives.map(obj => 
                                obj.id === objectiveId ? { ...obj, isCompleted: !obj.isCompleted } : obj
                            )
                        };
                    }
                    return mission;
                })
            }));
            return { ...prev, chapters: newChapters };
        });
    };

    const completeMission = (missionId: string) => {
        setState(prev => {
            // Find mission to get XP reward
            let xpReward = 0;
            prev.chapters.forEach(c => c.missions.forEach(m => {
                if (m.id === missionId) xpReward = m.xpReward;
            }));

            const newChapters = prev.chapters.map(chapter => ({
                ...chapter,
                missions: chapter.missions.map(mission => 
                    mission.id === missionId ? { ...mission, isCompleted: true } : mission
                )
            }));

            return {
                ...prev,
                chapters: newChapters,
                player: {
                    ...prev.player,
                    currentXp: prev.player.currentXp + xpReward
                }
            };
        });
    };

    const setActiveMission = (missionId: string) => {
        setState(prev => ({ ...prev, activeMissionId: missionId }));
    };

    return (
        <GameContext.Provider value={{ ...state, toggleObjective, completeMission, setActiveMission }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
