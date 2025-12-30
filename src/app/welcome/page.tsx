"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Map, Shield, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useUserStore } from "@/lib/store/userStore";

export default function WelcomePage() {
  const router = useRouter();
  const { addXP } = useUserStore(); // Import store
  const [step, setStep] = useState(0);

  const content = [
    {
      id: "intro",
      title: "The Contract is Sealed",
      text: "You have taken the first step. You are no longer a wanderer; you are an Apprentice of the Guild of Form.",
      icon: <Shield size={80} strokeWidth={1} />,
    },
    {
      id: "streak",
      title: "Keep the Forge Hot",
      text: "In the Void, cold is death. Your 'Streak' is the heat of your forge. If you do not strike the anvil daily, the fire dies, and your progress freezes.",
      icon: <Flame size={80} strokeWidth={1} />,
    },
    {
      id: "map",
      title: "The Ascension",
      text: "The path is vertical. You start in the Abyss. Complete rituals (lessons) to climb towards the Aether. The Gatekeepers will test your strength.",
      icon: <Map size={80} strokeWidth={1} />,
    },
  ];

  const handleNext = () => {
    if (step < content.length - 1) {
      setStep(step + 1);
    } else {
      // Finish Onboarding
      // Grant "Welcome Bonus" to mark the user as onboarded (XP > 0)
      // This prevents the Map from redirecting them back here.
      addXP(10); 
      router.push("/map");
    }
  };

  return (
    <div className="min-h-screen bg-void text-slate-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-xl w-full relative z-10">
        {/* Progress Bar */}
        <div className="mb-12 flex justify-center gap-2">
          {content.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-amber-500" : "bg-slate-800"}`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-8"
          >
            <div className="flex justify-center text-amber-500">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {content[step].icon}
              </motion.div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-100">
                {content[step].title}
              </h1>
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                {content[step].text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 flex justify-center">
          <Button 
            onClick={handleNext} 
            size="lg" 
            className="w-full md:w-auto min-w-[200px] shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          >
            {step === content.length - 1 ? (
              <span className="flex items-center gap-2">Begin Journey <Check size={20} /></span>
            ) : (
              <span className="flex items-center gap-2">Continue <ChevronRight size={20} /></span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}