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
        primary: '#f59f0a',
        'primary-dark': '#b45309',
        secondary: '#3b82f6',
        void: '#0a0a0a',
        'background-dark': '#181511',
        'surface-dark': '#221c10',
        'card-dark': '#27231b',
        'paper-dark': '#221c10',
        'border-dark': '#393328',
        'text-main': '#e2e8f0',
        'text-muted': '#baaf9c',
        
        // Path colors from design
        vitalist: '#84cc16',
        iron: '#94a3b8',
        illusionist: '#d946ef',
        transmuter: '#facc15',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
        'noise': "url('https://www.transparenttextures.com/patterns/dark-leather.png')",
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: {
            '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
export default config
