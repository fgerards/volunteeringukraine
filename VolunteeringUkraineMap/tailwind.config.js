const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'make-it-possible': "url('/images/popup/make_it_possible.jpg')",
      },
      fontFamily: {
        sans: ['E ukraine', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
