/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#f59f0a",
        "primary-dark": "#b45309",
        "secondary": "#3b82f6",
        "background-light": "#f8f7f5",
        "background-dark": "#181511", 
        "paper-dark": "#221c10",
        "surface-dark": "#221c10",
        "card-dark": "#27231b",
        "border-dark": "#393328",
        "text-muted": "#baaf9c",
        "void": "#0a0a0a",
      },
      fontFamily: {
        "newsreader": ["Newsreader", "serif"],
        "noto": ["Noto Sans", "sans-serif"],
        "inter": ["Inter", "sans-serif"],
      },
      borderRadius: {
        "lg": "0.5rem", 
        "xl": "0.75rem", 
        "2xl": "1rem"
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
        'noise': "url(https://lh3.googleusercontent.com/aida-public/AB6AXuA7_wIU2jNK8WZENJhW2Syb5kEwTu3ScAmFZj8FOc30bn43br8AZPl6uPZSPr2lw6nvF1oSkgujyxUaLv2_stnikaflYurncZLx7pEGeGpZ64AH6czOdDhH-QyxPekZ_AWTtY5mPMqBmFWDdMNWbVUZw2gsR7zpRTsrMfI6QRpQupFTJ578sJg2vvoK5uSWfqKUr_LJKdSxqyhcVwOHwsLrO7RPqtaCDlmq1MqFNslzskLG21ad-pdOgBpRf3M7F0mg5UkxUVXtESA)"
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}