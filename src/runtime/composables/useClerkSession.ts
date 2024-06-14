import { ref } from 'vue'
import type { UserSessionComposable } from '#clerk'
import { useState, useRequestFetch } from '#imports'

const useClerkSessionState = () => useState('clerk-session', () => ({}))

export function useClerkSession(): UserSessionComposable {
  const clerkSessionState = useClerkSessionState()

  const fetch = async () => {
    const requestFetch = useRequestFetch()

    clerkSessionState.value = await requestFetch('/api/_clerk/session', {
      retry: false,
    })
  }

  const session = ref('your-session-id-here')

  return { fetch, session }
}
