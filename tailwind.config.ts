import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin')],
  theme: {
    extend: {
      textColor: {
        'finpay-tosca': '#009CB0',
        'finpay-yellow': '#F7B818'
      },
      fontFamily: {
        kiro: ['Kiro', 'sans-serif']
      }
    }
  }
}

export default config
