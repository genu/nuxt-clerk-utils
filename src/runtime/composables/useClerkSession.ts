import type { UserSessionComposable, ClerkSessionState } from '#clerk'
import { useState, useRequestFetch } from '#imports'

const useClerkSessionState = () =>
  useState<ClerkSessionState | null>('clerk-session', () => ({}))

export function useClerkSession(): UserSessionComposable {
  const session = useClerkSessionState()

  const fetch = async () => {
    const requestFetch = useRequestFetch()

    try {
      session.value = await requestFetch('/api/_clerk/session', {
        retry: false,
      })
    }
    catch (e) {
      console.log('Failed to fetch session')
    }
  }

  return {
    fetch,
    session,
  }
}
