/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    extend: {
      backgroundImage: {
        heroImage:
          "url('https://images.pexels.com/photos/4008733/pexels-photo-4008733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
      },
    },
  },
  fontFamily: {
    sans: ["Graphik", "sans-serif"],
    serif: ["Merriweather", "serif"],
  },
  plugins: [require("daisyui")],
};
