import type { H3Event } from 'h3'
import { getAuth } from 'h3-clerk'
import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/backend/internal'

export function requireClerkSession(event: H3Event): SignedInAuthObject {
  const auth = getAuth(event)

  if (!auth.userId)
    throw new Error('No session found')

  return auth
}

export function getClerkSession(event: H3Event): SignedInAuthObject | SignedOutAuthObject | null {
  let auth: ReturnType<typeof getAuth>

  try {
    auth = getAuth(event)
  }
  catch (e) {
    return null
  }

  return auth
}
