import { eventHandler } from 'h3'
import { getClerkSession } from '../utils/session'
import { $clerk } from '../utils/clerk'

export default eventHandler(async (event) => {
  const auth = getClerkSession(event)

  if (!auth || !auth.userId) return null

  return await $clerk.users.getUser(auth.userId)
})
