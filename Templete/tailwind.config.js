/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: true,
  theme: {
    fontFamily: {
      "thaibev-black": "ThaiBevSansNew-Black",
      "thaibev-black-italic": "ThaiBevSansNew-BlackItalic",
      "thaibev-bold": "ThaiBevSansNew-Bold",
      "thaibev-bold-italic": "ThaiBevSansNew-BoldItalic",
      "thaibev-extrabold": "ThaiBevSansNew-ExtraBold",
      "thaibev-extrabold-italic": "ThaiBevSansNew-ExtraBoldItalic",
      "thaibev-extralight": "ThaiBevSansNew-ExtraLight",
      "thaibev-extralight-italic": "ThaiBevSansNew-ExtraLightItalic",
      "thaibev-italic": "ThaiBevSansNew-Italic",
      "thaibev-light": "ThaiBevSansNew-Light",
      "thaibev-light-italic": "ThaiBevSansNew-LightItalic",
      "thaibev-medium": "ThaiBevSansNew-Medium",
      "thaibev-medium-italic": "ThaiBevSansNew-MediumItalic",
      "thaibev-regular": "ThaiBevSansNew-Regular",
      "thaibev-semibold": "ThaiBevSansNew-SemiBold",
      "thaibev-semibold-italic": "ThaiBevSansNew-SemiBoldItalic",
      "thaibev-thin": "ThaiBevSansNew-Thin",
      "thaibev-thin-italic": "ThaiBevSansNew-ThinItalic",
    },
    extend: {
      colors: {
        "theme-color": "themeColor",
      },
    },
  },
  plugins: [],
};
