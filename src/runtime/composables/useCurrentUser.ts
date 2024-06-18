import { useState, useRequestFetch } from '#imports'
import type { ClerkCurrentUserState, UserCurrentUserComposable } from '#clerk'

const useClerkCurrentUser = () =>
  useState<ClerkCurrentUserState>('clerk-current-user')

export const useCurrentUser = (): UserCurrentUserComposable => {
  const currentUser = useClerkCurrentUser()

  const fetch = async () => {
    const requestFetch = useRequestFetch()

    try {
      currentUser.value = await requestFetch('/api/_clerk/me', {
        retry: false,
      })
    }
    catch (e) {
      console.log('Failed to fetch current user')
    }
  }

  return { fetch, currentUser }
}
