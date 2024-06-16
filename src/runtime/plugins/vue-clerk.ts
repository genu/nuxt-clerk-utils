import { clerkPlugin } from 'vue-clerk'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { useClerkSession } from '#imports'

export default defineNuxtPlugin({
  name: 'clerk-plugin',
  dependsOn: ['clerk-session-fetch-plugin'],
  setup(nuxtApp) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config: any = useRuntimeConfig()
    const { session } = useClerkSession()
    const publishableKey = config.public.clerk.publishableKey

    nuxtApp.vueApp.use(clerkPlugin, { publishableKey, initialState: session.value })
  },
})
