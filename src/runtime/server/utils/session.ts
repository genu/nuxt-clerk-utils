import type { H3Event } from 'h3'
import { getAuth } from 'h3-clerk'
import { stripPrivateDataFromObject } from '@clerk/backend/internal';

export function requireClerkSession(event: H3Event) {
  const auth = getAuth(event)

  if (!auth.userId)
    throw new Error('No session found')

  return stripPrivateDataFromObject(auth)
}

export function getClerkSession(event: H3Event) {
  let auth: ReturnType<typeof getAuth>

  try {
    auth = getAuth(event)
  }
  catch (e) {
    return null
  }

  return stripPrivateDataFromObject(auth)
}
