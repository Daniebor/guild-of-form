import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#020617',         // Background
        'dungeon-wall': '#0f172a', // Surface
        stone: '#1e293b',        // Border
        primary: '#f59e0b',      // Magic/Fire (text-amber-500)
        'primary-bg': '#d97706', // Magic/Fire (bg-amber-600)
        secondary: '#3b82f6',    // Mana (text-blue-500)
        'text-main': '#e2e8f0',  // Main Text (text-slate-200)
        'text-muted': '#94a3b8', // Muted Text (text-slate-400)
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-cinzel)', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
