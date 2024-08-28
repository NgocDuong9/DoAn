/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        1: '1px'
      },
      fontSize: {
        md: '16px'
      },
      maxWidth: {
        main: '1360px'
      },
      colors: {
        main: '#333333',
        red: {
          500: '#EB5757'
        }
      },
      backgroundImage: {
        'text-gradient':
          'linear-gradient(90deg, #52BAE6 0%, #67F2D1 50%, #51C2A7 100%)',
        'gradient-order':
          'linear-gradient(to right, #258DBA, #26D3E0, #8BF6C8)',
        ai: 'radial-gradient(circle, #8BF6C8 62%, #B9E1EC 100%, #FFFFFF 100%)',
        'ai-message': 'linear-gradient(to right, #258DBA, #26D3E0, #8BF6C8)',
        'tab-gradient':
          'linear-gradient(91.49deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF7C8 126.97%)',
        'header-search-gradient':
          'radial-gradient(111.72% 483.64% at 101.05% 3.36%, rgba(139, 247, 200, 0.62) 0%, #B9E1EC 51.56%, #FFFFFF 100%)'
      },
      boxShadow: {
        custom: '0px 27px 30px 0px rgba(0, 0, 0, 0.05)'
      }
    }
  },
  plugins: []
}
