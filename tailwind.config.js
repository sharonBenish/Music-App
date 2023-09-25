/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily:{
        body: ['Nunito Sans']
      },
      dropShadow: {
        'light': '0 2px 2px rgba(255, 255, 255, 0.1)'
      },
      colors:{
        e:{
          'sidebar-bg':'#0E0E0E',
          'orange':'#FF7A01',
          'orange-blur':'#ff7c0163',
          'grey':'#898A8D',
          'blackLight': '#171718',
          'background': '#151516'
        }
      }
    },
  },
  plugins: [],
}
