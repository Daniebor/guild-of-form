"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Map, Shield, ChevronRight, Check, PenTool } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useUserStore } from "@/lib/store/userStore";
import { supabase } from "@/lib/supabase";

export default function WelcomePage() {
  const router = useRouter();
  const { addXP } = useUserStore();
  const [step, setStep] = useState(0);
  
  // Contract State
  const [username, setUsername] = useState("");
  const [isSigning, setIsSigning] = useState(false);

  const content = [
    {
      id: "contract",
      title: "The Contract",
      text: "To become an Architect, you must sign the Guild's ledger. How shall you be known in the Void?",
      icon: <PenTool size={80} strokeWidth={1} />,
      showInput: true,
    },
    {
      id: "streak",
      title: "Keep the Forge Hot",
      text: "In the Void, cold is death. Your 'Streak' is the heat of your forge. If you do not strike the anvil daily, the fire dies.",
      icon: <Flame size={80} strokeWidth={1} />,
      showInput: false,
    },
    {
      id: "map",
      title: "The Ascension",
      text: "The path is vertical. You start in the Abyss. Complete rituals to climb towards the Aether.",
      icon: <Map size={80} strokeWidth={1} />,
      showInput: false,
    },
  ];

  const handleNext = async () => {
    // HANDLE STEP 1: SIGNING
    if (step === 0) {
      if (!username.trim()) return; // Prevent empty names
      setIsSigning(true);
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Update Supabase Profile
          const { error } = await supabase
            .from('profiles')
            .update({ username: username.trim() })
            .eq('id', user.id);
            
          if (error) throw error;
        }
        // Proceed only if successful
        setStep(step + 1);
      } catch (error) {
        console.error("Failed to sign contract:", error);
        alert("The Guild could not record your name. Try again.");
      } finally {
        setIsSigning(false);
      }
      return;
    }

    // HANDLE SUBSEQUENT STEPS
    if (step < content.length - 1) {
      setStep(step + 1);
    } else {
      // Finish Onboarding
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

              {/* INPUT FIELD FOR STEP 0 */}
              {content[step].showInput && (
                <div className="pt-4">
                  <input
                    autoFocus
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your Name"
                    className="bg-transparent border-b-2 border-amber-500/50 text-center text-3xl font-serif text-white placeholder:text-slate-700 focus:outline-none focus:border-amber-500 w-full py-2"
                    onKeyDown={(e) => e.key === "Enter" && handleNext()}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 flex justify-center">
          <Button 
            onClick={handleNext} 
            size="lg" 
            disabled={isSigning || (step === 0 && !username.trim())}
            className="w-full md:w-auto min-w-[200px] shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          >
            {isSigning ? (
              <span className="animate-pulse">Forging...</span>
            ) : step === 0 ? (
              <span className="flex items-center gap-2">Sign Contract <PenTool size={18} /></span>
            ) : step === content.length - 1 ? (
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