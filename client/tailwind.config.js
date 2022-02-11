module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'home-background': "url('/images/bg.png')",
        'reviews-background': "url('/images/bg.png')",
        'restaurants-background': "url('/images/bg.png')",
        'search-background': "url('/images/searchicon.png')",
      }),
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        yujiboku: ['Yuji Boku', 'sans-serif'],
      },
      colors: {
        'custom-footer-color': '#F8F8F8',
        'custom-overlay-color': 'rgba(0, 0, 0, 0.5)',
      },
      fontSize: {
        '10xl': '12rem',
        default: '18px',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
