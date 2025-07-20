import type { Config} from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom background colors for sections
    //   backgroundColor: {
    //     'section': '#0000', // mobile default
    //     'section-desktop': '#FFFFFF', // desktop
    //   }
    },
  },  plugins: [],
}

export default config