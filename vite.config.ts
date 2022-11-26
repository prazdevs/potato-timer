import path from 'path'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Fonts from 'vite-plugin-fonts'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    Fonts({
      google: {
        families: ['Quicksand'],
      },
    }),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'vue-i18n', 'vue-router'],
    }),
    Icons({}),
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
})
