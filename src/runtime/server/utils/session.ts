import { type H3Event, getRequestURL } from 'h3'
import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from '@clerk/backend/internal'
import { $clerk } from './clerk'

export async function requireClerkSession(event: H3Event): Promise<SignedInAuthObject> {
  const auth = await getClerkSession(event)

  if (!auth || !auth.userId) throw new Error('No session found')

  return auth
}

export async function getClerkSession(
  event: H3Event,
): Promise<SignedInAuthObject | SignedOutAuthObject | null> {
  const url = getRequestURL(event)

  const clerkRequest = new Request(url, {
    headers: event.headers,
  })

  const requestState = await $clerk.authenticateRequest(clerkRequest)

  return requestState.toAuth()
}
