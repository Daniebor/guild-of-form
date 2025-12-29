import { GameState } from '../types';

export const initialGameState: GameState = {
    player: {
        id: 'user_001',
        name: 'Novice Sculptor',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALH76sJHTKGe7c5HsW83pJTLXrWup44fjbCCtt_sl_tmDx0yHBFPXPlBERQiods16e8GCoe9fT9fajZdcruPjgZTem1MRmAA8_ZNqHl2W05_-P-RoFnqYoQr88BCqUnf8VV3Cioh6459HJCRjJ87gCvi0RHh3TaAhD9yn1lsr52thvqhtbT6l2W2DyYxtd9-TcbbbGvASNVlrPP_USSy6pNakkW29IYD5CtH2nxQrWgtDG4kaU5jJJyLxacWv51XjRMuS0LJ2yLZs',
        level: 3,
        currentXp: 1250,
        xpToNextLevel: 2000,
        rankTitle: 'Novice Sculptor',
        streakDays: 5,
        notifications: 3
    },
    bounties: [
        {
            id: 'bounty_001',
            title: "The Goblin's Request",
            description: "Sculpt a rough goblin bust within 30 minutes. Focus on expressive features.",
            rewardXp: 300,
            icon: "swords",
            isClaimed: false
        }
    ],
    activeMissionId: 'mission_2_1',
    chapters: [
        {
            id: 'chapter_1',
            sequence: 1,
            title: "Awakening",
            description: "The first steps into the digital void.",
            status: 'completed',
            missions: [] // Populated as needed
        },
        {
            id: 'chapter_2',
            sequence: 2,
            title: "Primordial Clay",
            description: "Learn the basics of digital sculpting forms.",
            status: 'active',
            missions: [
                {
                    id: 'mission_2_1',
                    chapterId: 'chapter_2',
                    title: "The Shapeless Form",
                    classType: "Vertex Manipulation",
                    description: "In this chapter, we delve into the primal art of digital sculpting, learning to manipulate the very fabric of virtual geometry to coax form from chaos. Your mission is to master the fundamental tools required to breathe life into the shapeless void.",
                    thumbnailUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjmC6VXUieS4oU2EXFoiXjti5KRYp6-bzBLmi13cmslcA4LVUwVP4QVybMUddQov-IMK-DHVGkl2A0EzoGWCCZD7SyS1P5x3XkJrDwPSAudurpAyXG9K8ln2Mph-yuNKx1KfVTxIMaK3ws_9Wc0NGlIDK1g6LAUX3CoRdNufBGB3JGLou8kADXkTuG61M2kTAKtHWao3bOc5dNmEQ4rYCHyie9G9MsL6WS-_xlrAYL8_LjLQge0gSfveZLlMbe_Kq3DjPCqGabM-0",
                    scrollContent: {
                        title: "Scroll of Wisdom",
                        text: "To shape the formless requires vision. Understand the digital clay before you strike. This scroll contains the ancient knowledge of vertex manipulation.\n\nIn the realm of ZBrush, the sphere is not merely a shape, but a universe of potential. By accessing the Move Brush, one channels the energy of creation to pull mountains from plains. Keep your topology uniform, for chaos in the mesh leads to chaos in the mind.",
                        quote: "\"A sculptor does not add to the clay, they reveal the truth hidden within.\" — Grandmaster Z"
                    },
                    objectives: [
                        { id: 1, text: "Initialize a Sphere 3D primitive", isCompleted: true },
                        { id: 2, text: "Equip the Move Brush (B-M-V)", isCompleted: true },
                        { id: 3, text: "Distort mesh to asymmetrical form", isCompleted: false },
                        { id: 4, text: "Save Project as .ZPR", isCompleted: false },
                    ],
                    xpReward: 250,
                    isCompleted: false,
                    isLocked: false
                }
            ]
        },
        {
            id: 'chapter_3',
            sequence: 3,
            title: "Eternal Forge",
            description: "Advanced techniques for hard surface modeling.",
            status: 'locked',
            missions: []
        }
    ]
};
