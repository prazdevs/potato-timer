import messages from '@intlify/vite-plugin-vue-i18n/messages'
import { createHead } from '@vueuse/head'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

const app = createApp(App)

//* @vueuse/head
const head = createHead()
app.use(head)

//* vue-router
const routes = setupLayouts(generatedRoutes)
const router = createRouter({ routes, history: createWebHistory() })
app.use(router)

//* vue-i18n
const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  messages,
})
app.use(i18n)

app.mount('#app')
