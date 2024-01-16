import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {},
      height: { recipeCard: "240px", searchImg: "60px" },
      maxHeight: {
        filterBar: "300px",
        recipeTitleImage: "400px",
        recipeStageImage: "200px",
      },
      maxWidth: {
        container: "1280px",
        loginContainer: "500px",
        filterBar: "320px",
        searchBar: "450px",
      },
      fontSize: {
        xs10: ["10px", "12px"],
        xs12: ["12px", "16px"],
        s14: ["14px", "20px"],
        sm16: ["16px", "24px"],
        md20: ["20px", "28px"],
        md24: ["24px", "32px"],
        md26: ["26px", "36px"],
        l32: ["32px", "38px"],
        l36: ["36px", "40px"],
        xL40: ["40px", "52px"],
        xxL46: ["46px", "normal"],
        lg64: ["64px", "normal"],
      },
      backgroundColor: {
        lightBlue: "#ECF4F7",
        pageBg: "#fafbfb",
        mainBlue: "#45AAB8",
        darkBlue: "#378893",
        mainGreen: "#B4CCB9",
        mainYellow: "#F9EBB2",
        lightYellow: "#faf6e5",
        mainRed: "#F76D57",
      },
      colors: {
        black: "#231F20",
        mainBLue: "#45AAB8",
        darkBlue: "#378893",
        mainGreen: "#B4CCB9",
        mainYellow: "#F9EBB2",
        mainRed: "#F76D57",
        grayStroke: {
          100: "#596268",
          90: "#494e54",
          80: "#dde1e5",
          70: "#959ca1",
          60: "#dee2e6",
          50: "#e2e6ea",
          40: "#f8f9fa",
          30: "#e9ecef",
        },
      },
      listStyleImage: {
        checkmark: 'url("/images/checkmark.svg")',
      },
    },
  },
  plugins: [],
};
export default config;
