import type { InitialState } from '@clerk/types'
import type { Ref, ComputedRef } from 'vue'

export interface ClerkSessionState extends Partial<InitialState> {}

export interface UserSessionComposable {
  loggedIn: ComputedRef<boolean>
  session: Ref<ClerkSessionState | null>
  fetch: () => Promise<void>
}
