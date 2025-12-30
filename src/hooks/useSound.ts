"use client";

import { useCallback } from "react";

// Define your sound palette here
const SOUNDS = {
  hover: "/sounds/stone_hover.mp3",   // Subtle stone grinding
  click: "/sounds/ui_click.mp3",      // Heavy stone clack
  success: "/sounds/magic_chime.mp3", // High pitched magical resonance
  shatter: "/sounds/gate_break.mp3",  // Heavy chain breaking
  ignite: "/sounds/fire_woosh.mp3",   // Fire starting
};

export type SoundKey = keyof typeof SOUNDS;

export const useSound = () => {
    // Disabled for now since there isn't any sound yet
    /*
    const play = useCallback((key: SoundKey) => {
    // Basic Audio implementation
    // In a production app, we might use a library like 'use-sound' or 'howler'
    // but this is sufficient for MVP.
    try {
      const audio = new Audio(SOUNDS[key]);
      audio.volume = 0.4; // Keep it subtle
      audio.play().catch((e) => {
        // Browser policy prevents autoplay before user interaction.
        // We silently fail if the user hasn't clicked anything yet.
      });
    } catch (error) {
      console.warn("Audio file missing or blocked:", key);
    }
  }, []);

  return { play };*/
};