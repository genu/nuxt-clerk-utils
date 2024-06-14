import type { Ref } from 'vue'

export interface UserSessionComposable {
  // loggedIn: ComputedRef<boolean>
  // user: ComputedRef<string | null>
  session: Ref<string>
  fetch: () => Promise<void>
  // clear: () => Promise<void>
}
