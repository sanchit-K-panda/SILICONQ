/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        border: 'rgba(255,255,255,0.08)',
        primary: '#f3f4f6',
        muted: '#94a3b8',
        panel: '#111827',
        background: {
          primary: '#030712',
          secondary: '#0b1220',
        },
        accent: {
          cyan: '#00d4ff',
          green: '#00ff88',
          red: '#ff4d6d',
          yellow: '#ffd166',
        }
      }
    },
  },
  plugins: [],
}
