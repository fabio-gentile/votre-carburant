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
        placeholder: 'hsla(240, 3.8%, 46.1%, 0.6)',
      },
      theme: {
        extend: {
          screens: {
            lg: '992px',
          },
        },
        // height: {
        //   screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
        // },
      },
    },
  },
  plugins: [],
};
export default config;
