/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Use class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#F7F6FA',
        'primary-text': '#1B1B1F',
        'secondary-text': '#6E6E7A',
        'accent-1': '#7F56D9',
        'accent-2': '#00C2FF',
        'positive': '#36D399',
        'negative': '#F87171',

        // For dark mode, you can define custom colors or rely on default "dark:" classes
        'dark-bg': '#1E1E2F',
        'dark-text': '#E4E4E7',
      },
    },
  },
  plugins: [],
}
