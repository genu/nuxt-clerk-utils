import type { InitialState } from '@clerk/types'
import type { Ref } from 'vue'

export interface ClerkSessionState extends Partial<InitialState> {}

export interface UserSessionComposable {
  session: Ref<ClerkSessionState | null>
  fetch: () => Promise<void>
}
