/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        old_lace: {
          DEFAULT: '#F5EDE0',
          100: '#473517',
          200: '#8e692e',
          300: '#c79a52',
          400: '#dec499',
          500: '#f5ede0',
          600: '#f7f1e6',
          700: '#f9f4ed',
          800: '#fbf8f3',
          900: '#fdfbf9'
        },
        midnight_green: {
          DEFAULT: '#073139',
          100: '#010a0c',
          200: '#031418',
          300: '#041e23',
          400: '#06282f',
          500: '#073139',
          600: '#11768a',
          700: '#1bb9d9',
          800: '#61d4eb',
          900: '#b0eaf5'
        },
        baby_powder: {
          DEFAULT: '#FEFEF5',
          100: '#5b5b09',
          200: '#b6b612',
          300: '#ecec40',
          400: '#f5f59b',
          500: '#fefef5',
          600: '#fefef8',
          700: '#fefef9',
          800: '#fffffb',
          900: '#fffffd'
        },
        zomp: {
          DEFAULT: '#5FA192',
          100: '#13201d',
          200: '#26403a',
          300: '#396057',
          400: '#4b8174',
          500: '#5fa192',
          600: '#7eb4a7',
          700: '#9fc6bd',
          800: '#bfd9d3',
          900: '#dfece9'
        },
        ash_gray: {
          DEFAULT: '#B2B9AD',
          100: '#232721',
          200: '#464d42',
          300: '#6a7463',
          400: '#8d9886',
          500: '#b2b9ad',
          600: '#c1c7bd',
          700: '#d0d5cd',
          800: '#e0e3de',
          900: '#eff1ee'
        }
      }
    },
  },
  variants: {},
  plugins: [],
}
