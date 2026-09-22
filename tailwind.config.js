/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        portal: {
          bg: '#f4f6fa',
          sidebar: '#14233c',
          sidebarHover: '#1c3153',
          sidebarActive: '#223c63',
          sidebarBorder: '#1c3153',
          accentYellow: '#f59e0b',
          navy: '#1d3557',
          primary: '#204d80',
          primaryHover: '#173c66',
          hero: '#1f3c64',
          card: '#ffffff',
          border: '#e5e9f0',
          muted: '#6b7280',
          dark: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['Cairo', 'Segoe UI', 'Tahoma', 'sans-serif']
      }
    },
  },
  plugins: [],
}
