import { defineNuxtPlugin } from '#app'
import { useClerkSession } from '#imports'

export default defineNuxtPlugin({
  name: 'clerk-session-fetch-plugin',
  enforce: 'pre',
  async setup() {
    await useClerkSession().fetch()
  },
})
