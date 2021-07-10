import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'

import App from './App.vue'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(App, { routes }, ctx => {
  Object.values(import.meta.globEager('./modules/*.ts')).map(i =>
    i.install?.(ctx)
  )
})
