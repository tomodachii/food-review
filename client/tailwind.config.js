module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'home-background': "url('/images/bg.png')",
      }),
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        yujiboku: ['Yuji Boku', 'sans-serif'],
      },
      color: {
        'custom-footer-color': '#F8F8F8',
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
