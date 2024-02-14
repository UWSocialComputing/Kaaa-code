/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html', // Include HTML files
    './src/**/*.js',   // Include JavaScript files
    './src/**/*.ts',  // Include TS files
    './src/**/*.jsx',  // Include JSX files
    './src/**/*.tsx',  // Include TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

