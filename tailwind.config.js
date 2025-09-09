/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // custom blue
        primaryDark: '#1d4ed8',
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'clean': '0 4px 15px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};
