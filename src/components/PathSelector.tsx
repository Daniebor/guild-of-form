'use client';

import { useUserStore } from '@/store/userStore';
import { curriculum } from '@/lib/data/curriculum';
import { Swords, Leaf, Hammer, Wand, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';

const pathIcons: { [key: string]: React.ReactNode } = {
    organic: <Leaf size={48} />,
    hardsurface: <Hammer size={48} />,
    stylized: <Wand size={48} />,
    maker: <FlaskConical size={48} />,
};

export default function PathSelector() {
    const { unlockPath, setActivePath } = useUserStore();
    const paths = curriculum.filter(p => p.id !== 'foundation' && p.id !== 'mastery');

    const handleSelectPath = (pathId: 'foundation' | 'organic' | 'hardsurface' | 'stylized' | 'maker' | 'mastery') => {
        unlockPath(pathId);
        setActivePath(pathId);
    };

    return (
        <motion.div 
            className="fixed inset-0 bg-black/80 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div 
                className="bg-dungeon-wall border-2 border-primary-bg rounded-lg p-8 max-w-4xl text-center"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                <h1 className="text-4xl font-serif text-primary mb-4">The Choosing of the Order</h1>
                <p className="text-text-muted mb-8">
                    You have proven your worth, Apprentice. The fundamentals are yours. Now, you must choose a path to specialize your craft. This choice will shape your journey to mastery. Choose wisely.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {paths.map(path => (
                        <motion.div 
                            key={path.id}
                            onClick={() => handleSelectPath(path.id as any)}
                            className="bg-void p-6 rounded-lg border-2 border-stone hover:border-primary hover:bg-primary/10 cursor-pointer"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            <div className="flex justify-center mb-4 text-primary">
                                {pathIcons[path.id] || <Swords size={48} />}
                            </div>
                            <h3 className="text-xl font-serif mb-2">{path.name}</h3>
                            <p className="text-sm text-text-muted">{path.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}