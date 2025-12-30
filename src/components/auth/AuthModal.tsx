"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { X, Mail, Lock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/lib/store/userStore";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Access the sync action from the store
  const { syncWithSupabase } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Check your email for the confirmation link!");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // Force a sync immediately after login to fetch cloud XP
        if (data.session?.user) {
          await syncWithSupabase(data.session.user.id);
        }

        onClose();
        // Removed window.location.reload() for smoother UX
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Don't render on server
  if (!mounted) return null;

  // Use Portal to render outside of the Map/Page hierarchy
  // This ensures 'fixed' positioning is relative to the Window, not the transformed page container
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-md bg-slate-900 border border-slate-700 shadow-2xl p-8 rounded-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-amber-500">
                {isSignUp ? "Join the Guild" : "Resume Journey"}
              </h2>
              <button onClick={onClose} className="text-slate-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-void border border-slate-700 rounded pl-10 pr-4 py-2 text-slate-200 focus:border-amber-500 outline-none transition-colors"
                    placeholder="architect@guild.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-void border border-slate-700 rounded pl-10 pr-4 py-2 text-slate-200 focus:border-amber-500 outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && <div className="p-3 bg-red-900/20 border border-red-900/50 text-red-400 text-sm rounded">{error}</div>}
              {message && <div className="p-3 bg-green-900/20 border border-green-900/50 text-green-400 text-sm rounded">{message}</div>}

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? "Sign Up" : "Login")}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              {isSignUp ? "Already an Architect?" : "First time here?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-amber-500 hover:text-amber-400 font-medium hover:underline"
              >
                {isSignUp ? "Login" : "Create Account"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body // Target the body directly
  );
};