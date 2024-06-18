import { useClerkSession } from '../composables/useClerkSession'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'clerk-session-fetch-plugin',
  enforce: 'pre',
  async setup() {
    await useClerkSession().fetch()
  },
})
