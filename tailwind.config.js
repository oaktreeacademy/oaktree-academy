/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'logo': ['Cinzel', 'Playfair Display', 'serif'],
        'nav': ['Inter', 'Lato', 'sans-serif'],
        'heading': ['Merriweather', 'serif'],
        'body': ['Open Sans', 'Lora', 'sans-serif'],
        'footer': ['Roboto', 'sans-serif'],
      },
      colors: {
        'midnight-blue': '#1a365d',
        'charcoal': '#2d3748',
        'slate': '#4a5568',
      },
      screens: {
        'xs': '475px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 