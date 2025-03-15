/** @type {import('tailwindcss').Config} */
import colors from './tailwindcss/colors'
import screens from './tailwindcss/screens'
import { keyframes, animation } from './tailwindcss/animation'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      antonio: ['Antonio']
    },
    container: {
      center: true
    },
    screens,
    extend: {
      colors,
      keyframes,
      animation,
      fontSize: {
        // 中文
        'caption-2': '0.75rem', // font-size: 12px;
        'caption-1': '0.875rem', // font-size: 14px;
        body: '0.9375rem', // font-size: 15px;
        'heading-4': '1.25rem', // font-size: 20px;
        'heading-3': '1.5rem', // font-size: 24px;
        'heading-2': '1.75rem', // font-size: 28px;
        'heading-1': '2.125rem', // font-size: 34px;
        display: '2.5rem', // font-size: 40px;

        // 英文
        'en-display': '5rem', // font-size: 80px
        'en-title': '2.5rem', // font-size: 40px;
        'en-body': '1.5rem', // font-size: 24px;
        'en-caption-01': '1.125rem', // font-size: 18px
        'en-caption-02': '1rem' // font-size: 16px
      },
      spacing: {
        full: '100%'
      },
      lineHeight: {
        5.5: '1.375rem', // line-height: 22px
        7.5: '1.875rem', // line-height: 30px
        12.5: '3.125rem', // line-height: 50px
        15: '3.75rem', //ine-height: 60px
        24: '6rem' // line-height: 96px
      }
    }
  },
  plugins: []
}
