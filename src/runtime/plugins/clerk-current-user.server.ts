import { useCurrentUser } from '../composables/useCurrentUser'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'clerk-current-user-fetch-plugin',
  enforce: 'pre',
  async setup() {
    await useCurrentUser().fetch()
  },
})
