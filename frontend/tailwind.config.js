/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nanum: ["NanumBarunpen", "system-ui", "sans-serif"],
        yong: ["Ownglyph_ParkDaHyun", "system-ui", "sans-serif"],
      },
      colors: {
        "bg-blue": "#D9EDFF",
        kakao: "#FEE500",
        "bg-gray": "#EFEFF0",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-stroke-1": {
          "text-shadow": `
            -1px -1px 0 white,
            1px -1px 0 white,
            -1px 1px 0 white,
            1px 1px 0 white
            `,
        },
        ".text-stroke-2": {
          "text-shadow": `
            -2px -2px 0 white,
            2px -2px 0 white,
            -2px 2px 0 white,
            2px 2px 0 white,
            -2px 0 0 white,
            2px 0 0 white,
            0 -2px 0 white,
            0 2px 0 white
            `,
        },
        ".text-stroke-3": {
          "text-shadow": `
            -3px -3px 0 white,
            3px -3px 0 white,
            -3px 3px 0 white,
            3px 3px 0 white,
            -3px 0 0 white,
            3px 0 0 white,
            0 -3px 0 white,
            0 3px 0 white
          `,
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
