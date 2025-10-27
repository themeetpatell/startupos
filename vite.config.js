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
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core vendor chunks (load first)
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
            if (id.includes('react-helmet-async')) {
              return 'seo-vendor';
            }
            if (id.includes('web-vitals')) {
              return 'analytics-vendor';
            }
            return 'vendor';
          }
          
          // Critical path chunks (load immediately)
          if (id.includes('src/components/Dashboard') || id.includes('src/components/Navigation')) {
            return 'dashboard';
          }
          if (id.includes('src/App.jsx') || id.includes('src/main.jsx')) {
            return 'app-core';
          }
          
          // Feature chunks (lazy load)
          if (id.includes('src/components/auth/')) {
            return 'auth';
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
          if (id.includes('src/components/StartupHub') || id.includes('src/components/StartupOnboarding') || id.includes('src/components/StartupRoadmap')) {
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
          
          // Utility chunks
          if (id.includes('src/utils/') || id.includes('src/hooks/')) {
            return 'utils';
          }
          if (id.includes('src/contexts/')) {
            return 'contexts';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500, // Reduced from 1000
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    },
    sourcemap: false, // Disable sourcemaps in production
    reportCompressedSize: false // Disable size reporting for faster builds
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ],
    exclude: ['recharts'] // Exclude heavy charting library
  }
})
