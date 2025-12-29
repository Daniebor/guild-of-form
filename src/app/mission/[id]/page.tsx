'use client';

import { use } from 'react';
import { curriculum } from '@/lib/data/curriculum';
import MissionScroll from '@/components/MissionScroll';
import { Mission, Chapter } from '@/lib/types';

export default function MissionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    let propsForScroll: { mission: Mission, chapter: Chapter } | null = null;

    for (const path of curriculum) {
        for (const chapter of path.chapters) {
            // Check if it's a regular mission
            const mission = chapter.missions.find(m => m.id === id);
            if (mission) {
                propsForScroll = { mission, chapter };
                break;
            }
            
            // Check if it's a boss fight (using chapter id as identifier)
            if (chapter.id === id) {
                const bossMission: Mission = {
                    id: chapter.id, // Use chapter id for the "mission"
                    title: chapter.boss.title,
                    xp: chapter.boss.xp,
                    intel: chapter.boss.test,
                    task: chapter.boss.winCondition,
                };
                propsForScroll = { mission: bossMission, chapter };
                break;
            }
        }
        if (propsForScroll) break;
    }

    if (!propsForScroll) {
        return <div className="p-8 text-center text-text-muted">Content not found. Return to the <a href="/map" className="text-primary underline">Map</a>.</div>;
    }

    return <MissionScroll mission={propsForScroll.mission} chapter={propsForScroll.chapter} />;
}