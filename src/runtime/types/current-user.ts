import type { UserResource } from '@clerk/types'
import type { Ref } from 'vue'

export interface ClerkCurrentUserState extends UserResource {}

export interface UserCurrentUserComposable {
  currentUser: Ref<ClerkCurrentUserState | null>
  fetch: () => Promise<void>
}
