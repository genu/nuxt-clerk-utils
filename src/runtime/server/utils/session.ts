import type { H3Event } from 'h3'
import { getAuth } from 'h3-clerk'
// import { clerkClient } from '@clerk/clerk-sdk-node'

export function requireClerkSession(event: H3Event) {
  const auth = getAuth(event)

  if (!auth.userId)
    throw new Error('No session found')

  return auth
}

export function getClerkSession(event: H3Event) {
  let auth: ReturnType<typeof getAuth>

  try {
    auth = getAuth(event)
  }
  catch (e) {
    return null
  }

  return auth
}
