import UILib from '@pnpm-monorepo-nuxt/ui'

export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(UILib)
})
