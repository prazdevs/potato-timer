import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Vue from '@vitejs/plugin-vue'
import path from 'path'
import ViteIconsResolver from 'unplugin-icons/resolver'
import ViteIcons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import ViteComponents from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import ViteFonts from 'vite-plugin-fonts'
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
      resolvers: [
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
    include: ['vue', 'vue-router', '@vueuse/core'],
    exclude: ['vue-demi'],
  },
})
