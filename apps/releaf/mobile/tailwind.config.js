const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const nativewind = require('nativewind/tailwind/native');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{js,jsx,ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      width: {
        'vw1/2': '50vw',
        'vw1/3': '33.333333vw',
        'vw2/3': '66.666667vw',
        'vw1/4': '25vw',
        'vw3/4': '75vw',
        'vw9/10': '90vw',
        'vw1/100': '1vw',
        'vw2/100': '2vw',
        'vw3/100': '3vw',
        'vw4/100': '4vw',
        'vw5/100': '5vw',
        'vw6/100': '6vw',
        'vw7/100': '7vw',
      },
      height: {
        'vw1/2': '50vw',
        'vw1/3': '33.333333vw',
        'vw2/3': '66.666667vw',
        'vw1/4': '25vw',
        'vw3/4': '75vw',
        'vw9/10': '90vw',
        'vw1/100': '1vw',
        'vw2/100': '2vw',
        'vw3/100': '3vw',
        'vw4/100': '4vw',
        'vw5/100': '5vw',
        'vw6/100': '6vw',
        'vw7/100': '7vw',
      },
      margin: {
        'vw1/2': '50vw',
        'vw1/3': '33.333333vw',
        'vw2/3': '66.666667vw',
        'vw1/4': '25vw',
        'vw3/4': '75vw',
        'vw1/100': '1vw',
        'vw2/100': '2vw',
        'vw3/100': '3vw',
        'vw4/100': '4vw',
        'vw5/100': '5vw',
        'vw6/100': '6vw',
        'vw7/100': '7vw',
      },
      colors: {
        releaf: {
          green: {
            100: "#00A86B",
            500: "#007E51",
            700: "#009959",
            900: "#2C4E3C",
          },
          orange: "#F28300",
          brownstart: "#FABB72",
          brownend: "#8E7555"
        }
      },

      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [nativewind()],
};
