/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        abyss: '#121212',
        primary: '#03DAC6',
        secondary: '#ffca46',
        success: '#8FFF37',
        danger: '#FF6262',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        'roboto-mono': ['"Roboto Mono"', 'Roboto'],
        nunito: ['Nunito', 'sans-serif'],
      },
      dropShadow: {
        'dark-l-t-r': '4px -5px 4px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  plugins: [],
};
