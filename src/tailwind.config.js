/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        cyan: '#00FFFF',
      },
      textShadow: {
        gold: '0 0 4px rgba(255,215,0,0.5), 0 0 8px rgba(255,215,0,0.3)',
        cyan: '0 0 4px rgba(0,255,255,0.5), 0 0 8px rgba(0,255,255,0.3)',
      },
      boxShadow: {
        'icon-gold': '0 0 6px rgba(255,215,0,0.5), inset 0 0 3px rgba(255,215,0,0.3)',
        'icon-cyan': '0 0 6px rgba(0,255,255,0.5), inset 0 0 3px rgba(0,255,255,0.3)',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-gold': { textShadow: theme('textShadow.gold') },
        '.text-shadow-cyan': { textShadow: theme('textShadow.cyan') },
      }
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
}
