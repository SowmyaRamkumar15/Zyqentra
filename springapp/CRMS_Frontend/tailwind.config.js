export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // Deep Indigo
          light: '#e0e7ff',
          hover: '#4338ca',
        },
        secondary: '#0f172a', // Slate 900
        accent: '#6366f1', // Indigo 500
        background: '#f8fafc', // Slate 50
        surface: '#ffffff',
        'text-main': '#0f172a', // Slate 900
        'text-muted': '#64748b', // Slate 500
        border: '#e2e8f0', // Slate 200
      },
      borderRadius: {
        DEFAULT: '16px', // Modern, sleek radius
      },
      boxShadow: {
        sm: '0 2px 4px 0 rgb(0 0 0 / 0.02)',
        DEFAULT: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        md: '0 10px 30px -4px rgba(0, 0, 0, 0.08)',
        lg: '0 20px 40px -8px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
      }
    },
  },
  plugins: [],
}
