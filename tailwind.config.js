import colors from './constants/colors';
const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      height: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
