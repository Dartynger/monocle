module.exports = {
  purge: {
    content: ['./*.html']
  },
  theme: {
    extend: {
      screens: {
        xl: '1144px',
        xxl: '1280px'
      },
      fontFamily: {
        sans: ['Fira Sans', 'sans-serif']
      },
      rotate: {
        '-15': '-15deg'
      }
    }
  },
  variants: {},
  plugins: []
}
