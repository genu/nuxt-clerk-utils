import { eventHandler } from 'h3'
// import { clearUserSession } from '../utils/session'

export default eventHandler(async (_event) => {
  // await clearUserSession(event)

  return { loggedOut: true }
})
