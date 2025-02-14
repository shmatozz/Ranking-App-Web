import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '660px',
        'lg-md': '950px',
        '2xl': '1600px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        base: {
          0: "#ffffff", 5: "#F3F3F3", 10: "#DDDDDD",
          20: "#C6C6C6", 30: "#B0B0B0", 40: "#9B9B9B",
          50: "#868686", 60: "#727272", 70: "#5E5E5E",
          80: "#4B4B4B", 90: "#393939", 95: "#202020",
          100: "#000000",
        },
        blue: {
          5: "#F1F3FF",
          10: "#D3DCFF", 20: "#B4C5FE", 30: "#95AFF8",
          40: "#7699ED", 50: "#5884DD", 60: "#3C70C8",
          70: "#245DAE", 80: "#164A8F", 90: "#12386E",
        },
        orange: {
          5: "#FFEFE3",
          10: "#FFD1AD", 20: "#FFB37B", 30: "#FF964E",
          40: "#EF7B24", 50: "#DB6300", 60: "#C24D00",
          70: "#A73B00", 80: "#892D00", 90: "#6A2200",
        },
        green: {
          5: "#E9F7F0",
          10: "#BCE6D2", 20: "#90D5B5", 30: "#65C29A",
          40: "#37AE82", 50: "#009A6B", 60: "#008557",
          70: "#006F46", 80: "#005936", 90: "#004429",
        },
        red: {
          5: "#FFEEE8",
          10: "#FFCCBB", 20: "#FFAB92", 30: "#FF8A6E",
          40: "#FF6B4E", 50: "#EE4E34", 60: "#D63420",
          70: "#B91E12", 80: "#981109", 90: "#750E05",
        },
        gold: "#FFE79A",
        silver: "#C6C6C6",
        bronze: "#C6A791",
        nonPrize: "#F3F3F3",
      },
      fontSize: {
        h4: ["26px", { lineHeight: "32px", fontWeight: "600" }],
        h5: ["20px", { fontWeight: "500" }],
        h5_bold: ["20px", { fontWeight: "600" }],
        bodyM_regular: ["16px", { fontWeight: "500" }],
        bodyM_medium: ["16px", { fontWeight: "600" }],
        bodyS_regular: ["14px", { fontWeight: "500" }],
        bodyS_medium: ["14px", { fontWeight: "600" }],
        caption_regular: ["12px", { fontWeight: "500" }],
        caption_medium: ["12px", { fontWeight: "600" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
