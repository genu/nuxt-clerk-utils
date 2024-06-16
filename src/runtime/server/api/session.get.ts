import { eventHandler } from 'h3'

import { requireClerkSession } from '../utils/session'

export default eventHandler(async (event) => {
  const session = requireClerkSession(event)

  return session
})
