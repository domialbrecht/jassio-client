import typography from '@tailwindcss/typography'
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif']
    },
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-3deg)'
          },
          '50%': {
            transform: 'rotate(3deg)'
          }
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      colors: {
        light: '#DAE1E7',
        default: '#27496D',
        chroma: '#2B2E4A',
        dark: '#142850',
        darker: '#06132f',
        accent: '#00909E',
        deep: '#283149',
        sky: '#DBEDF3',
        skylight: '#abe2f5',
        subdue: '#903749',
        mellow: '#53354A',
        contrast: '#E84545',
        highlight: '#F73859'
      }
    }
  },
  plugins: [typography],
  safelist: ['prose', 'prose-sm', 'm-auto', 'text-left']
}
