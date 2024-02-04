import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#F0F0FF',
          100: '#DBDBFF',
          200: '#BDBDFF',
          300: '#9999FF',
          400: '#7575FF',
          500: '#5757FF',
          600: '#3333FF',
          700: '#1212FF',
          800: '#0000B8',
          900: '#00005C',
          950: '#00002E',
        },
        'white-bg': 'hsl(0, 0%, 94.9%)',
        primary: 'hsl(240, 100%, 53.5%)',
        destructive: 'hsl(351.9, 100%, 45.1%)',
      },
    },
  },
  plugins: [],
};
export default config;
