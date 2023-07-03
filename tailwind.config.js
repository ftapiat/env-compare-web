import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        abyss: '#0d1117',
        'abyss-accent': '#010409',
        'light-grey': '#30363d',
        primary: '#2973de',
        secondary: '#ffca46',
        success: '#8FFF37',
        danger: '#FF6262',
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        'roboto-mono': ['var(--font-roboto-mono)', 'Roboto'],
      },
      dropShadow: {
        'dark-l-t-r': '4px -5px 4px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        /**
         * Based on issue https://github.com/tailwindlabs/tailwindcss/issues/5989#issuecomment-962048436.
         *
         * Add global utility classes here.
         */
        '.text-important': {
          '@apply font-roboto-mono text-center': {},
        },
      });
    },
    tailwindScrollbar({ nocompatible: true }),
  ],
};
