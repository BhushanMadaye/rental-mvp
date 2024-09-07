/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     './src/**/*.{html,js,ts,jsx,tsx,scss}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('tailwindcss'),
    // require('autoprefixer'),
    require('@tailwindcss/forms'),
    // require('postcss-nested'),
  ],
}

