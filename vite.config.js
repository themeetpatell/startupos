import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('recharts')) {
              return 'chart-vendor';
            }
            return 'vendor';
          }
          
          // Feature chunks
          if (id.includes('src/components/auth/')) {
            return 'auth';
          }
          if (id.includes('src/components/Dashboard') || id.includes('src/components/Navigation')) {
            return 'dashboard';
          }
          if (id.includes('src/components/AICoBuilder')) {
            return 'ai-tools';
          }
          if (id.includes('src/components/EcosystemHub')) {
            return 'ecosystem';
          }
          if (id.includes('src/components/M&A/')) {
            return 'ma-tools';
          }
          if (id.includes('src/components/AdvancedAnalytics')) {
            return 'analytics';
          }
          if (id.includes('src/components/StartupHub') || id.includes('src/components/StartupProfile') || id.includes('src/components/StartupOnboarding') || id.includes('src/components/StartupRoadmap')) {
            return 'startup-tools';
          }
          if (id.includes('src/components/DigitalHQ') || id.includes('src/components/PeopleManagement')) {
            return 'workplace';
          }
          if (id.includes('src/components/OpenCommunity')) {
            return 'community';
          }
          if (id.includes('src/components/UserProfile') || id.includes('src/components/Profile')) {
            return 'profile';
          }
          if (id.includes('src/components/GamificationDashboard')) {
            return 'gamification';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
