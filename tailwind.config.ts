import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // A. The Void (Backgrounds)
        void: '#0a0a0a',       // Main Background
        'void-deep': '#050505', // Recessed/Input bg
        slate: {
          DEFAULT: '#1e293b',  // UI Surface
          highlight: '#334155', // Hover state
        },
        // B. The Ignis (Primary/Action)
        amber: {
          dim: '#d97706',      // Inactive magic
          DEFAULT: '#f59e0b',  // Active/Glow
          blaze: '#fbbf24',    // Hover/Inferno
        },
        // C. The Aether (Mastery)
        blueFlame: '#3b82f6',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-cinzel)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'constellation': 'linear-gradient(to top, #0a0a0a, #1e293b, #172554)', // Abyss to Aether
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;