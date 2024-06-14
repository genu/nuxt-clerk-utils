import { eventHandler } from 'h3'
import { clerkClient, getAuth, withClerkMiddleware } from 'h3-clerk'

// import { requireUserSession, sessionHooks } from '../utils/session'

export default eventHandler(async (event) => {
  const a = getAuth(event)
  //   const session = await requireUserSession(event)

  //   await sessionHooks.callHookParallel('fetch', session, event)

  //   return session

  return a
})
