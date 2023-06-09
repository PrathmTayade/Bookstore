/** @type {import('tailwindcss').Config} */
import tailwindform from "@tailwindcss/forms";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(15rem, 1fr)",
      },
    },
  },
  plugins: [
    tailwindform,
    // ...
  ],
};
