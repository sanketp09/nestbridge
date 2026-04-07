/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D0F14',
        surface: '#161A23',
        border: '#252A36',
        gold: '#C9A84C',
        lightGold: '#E8C96A',
        text: '#F0EDE8',
        muted: '#8A8FA8',
        success: '#3ECF8E',
        alert: '#FF5C5C'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}

