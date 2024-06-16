import type { UserSessionComposable, ClerkSessionState } from '#clerk'
import { useState, useRequestFetch, computed } from '#imports'

const useClerkSessionState = () => useState<ClerkSessionState>('clerk-session', () => ({}))

export function useClerkSession(): UserSessionComposable {
  const session = useClerkSessionState()

  const fetch = async () => {
    const requestFetch = useRequestFetch()

    session.value = await requestFetch('/api/_clerk/session', {
      retry: false,
    })
  }

  return { fetch, session, loggedIn: computed(() => Boolean(session.value.userId)) }
}
