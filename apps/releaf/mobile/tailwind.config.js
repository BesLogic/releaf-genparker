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
      colors: {
        releaf: {
          green: {
            100: "#00A86B",
            500: "#007E51",
            700: "#009959",
            900: "#2C4E3C",
          },
          orange: "#F28300"
        }
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [nativewind()],
};
