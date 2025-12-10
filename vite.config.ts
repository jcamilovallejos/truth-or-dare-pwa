import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/truth-or-dare-pwa/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Verdad o Reto - Juego para Adultos',
        short_name: 'Verdad o Reto',
        description: 'El juego más picante de verdad o reto para adultos. Tres modos: Soft, Horny y Hot.',
        theme_color: '#FF9AA2',
        background_color: '#FFF5F7',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/truth-or-dare-pwa/',  // 👈 Cambiado
        start_url: '/truth-or-dare-pwa/',  // 👈 Cambiado
        icons: [
          {
            src: '/truth-or-dare-pwa/pwa-192x192.png',  // 👈 Cambiado
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/truth-or-dare-pwa/pwa-512x512.png',  // 👈 Cambiado
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/truth-or-dare-pwa/pwa-512x512.png',  // 👈 Cambiado
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/truth-or-dare-pwa/pwa-512x512.png',  // 👈 Cambiado
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        categories: ['games', 'entertainment']
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
})
