import { clerkPlugin } from 'vue-clerk'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { useClerkSession } from '#imports'

export default defineNuxtPlugin({
  name: 'clerk-plugin',
  setup(nuxtApp) {
    const { public: { clerk: { publishableKey } } } = useRuntimeConfig()

    const { session } = useClerkSession()

    nuxtApp.vueApp.use(clerkPlugin, { publishableKey, initialState: session.value })
  },
})
