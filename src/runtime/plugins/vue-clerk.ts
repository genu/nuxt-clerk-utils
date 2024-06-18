import { clerkPlugin } from 'vue-clerk'
import { useClerkSession } from '../composables/useClerkSession'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin({
  name: 'clerk-plugin',
  setup(nuxtApp) {
    const {
      public: {
        clerk: { publishableKey },
      },
    } = useRuntimeConfig()

    const { session } = useClerkSession()

    nuxtApp.vueApp.use(clerkPlugin, {
      publishableKey,
      initialState: session.value,
    })
  },
})
