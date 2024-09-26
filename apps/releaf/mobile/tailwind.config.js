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
      fontFamily: {
        'lato-black': ["Lato-Black"],
        'lato-bold': ["Lato-Bold"],
        'lato-regular': ["Lato-Regular"],
        'lato-light': ["Lato-Light"],
        'lato-thin': ["Lato-Thin"],
        'lato-italic': ["Lato-Italic"],
        'lato-light-italic': ["Lato-LightItalic"],
        'lato-thin-italic': ["Lato-ThinItalic"],
        'lato-black-italic': ["Lato-BlackItalic"],
        'lato-bold-italic': ["Lato-BoldItalic"],

        'inter-black': ["Inter_18pt-Black"],
        'inter-bold': ["Inter_18pt-Bold"],
        'inter-regular': ["Inter_18pt-Regular"],
        'inter-light': ["Inter_18pt-Light"],
        'inter-thin': ["Inter_18pt-Thin"],
        'inter-italic': ["Inter_18pt-Italic"],
        'inter-light-italic': ["Inter_18pt-LightItalic"],
        'inter-thin-italic': ["Inter_18pt-ThinItalic"],
        'inter-black-italic': ["Inter_18pt-BlackItalic"],
        'inter-bold-italic': ["Inter_18pt-BoldItalic"],

        'caveat-regular': ["Caveat-Regular"],
        'caveat-bold': ["Caveat-Bold"],
        'caveat-semi-bold': ["Caveat-SemiBold"],
        'caveat-medium': ["Caveat-Medium"],
      },
      width: {
        'vw1/1': '100vw',
        'vw1/2': '50vw',
        'vw1/3': '33.333333vw',
        'vw2/3': '66.666667vw',
        'vw1/4': '25vw',
        'vw3/4': '75vw',
        'vw9/10': '90vw',
        'vw9.21/10': '92.1vw',
        'vw0.5/100': '0.5vw',
        'vw1/100': '1vw',
        'vw2/100': '2vw',
        'vw3/100': '3vw',
        'vw4/100': '4vw',
        'vw5/100': '5vw',
        'vw6/100': '6vw',
        'vw7/100': '7vw',
      },
      height: {
        'vw1/1': '100vw',
        'vw1/2': '50vw',
        'vw1/3': '33.333333vw',
        'vw2/3': '66.666667vw',
        'vw1/4': '25vw',
        'vw3/4': '75vw',
        'vw9/10': '90vw',
        'vw9.21/10': '92.1vw',
        'vw0.5/100': '0.5vw',
        'vw1/100': '1vw',
        'vw2/100': '2vw',
        'vw3/100': '3vw',
        'vw4/100': '4vw',
        'vw5/100': '5vw',
        'vw6/100': '6vw',
        'vw7/100': '7vw',
      },
      margin: {
        'vw1/1': '100vw',
        'vw1/2': '50vw',
        'vw1/3': '33.333333vw',
        'vw2/3': '66.666667vw',
        'vw1/4': '25vw',
        'vw3/4': '75vw',
        'vw9/10': '90vw',
        'vw9.21/10': '92.1vw',
        'vw0.5/100': '0.5vw',
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
            900: "#473E33",
          },
          brown: {
            100: "#fcf3e8",
            300: "#ede5db",
            900: "#756757",
          },
          orange: "#F28300",
          brownstart: "#FABB72",
          brownend: "#8E7555",
          black: "#000000",
        }
      },

      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [nativewind()],
};
