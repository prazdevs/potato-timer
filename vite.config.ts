import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import ViteComponents, { NaiveUiResolver } from 'vite-plugin-components'
import ViteFonts from 'vite-plugin-fonts'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),

    Pages(),

    Layouts(),

    ViteComponents({
      customComponentResolvers: [
        NaiveUiResolver(),
        ViteIconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    ViteFonts({
      google: {
        families: ['Quicksand'],
      },
    }),

    ViteIcons(),

    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Potato Timer',
        short_name: 'Potato Timer',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    VueI18n({
      include: [path.resolve(__dirname, 'locales/**')],
    }),
  ],

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
})
