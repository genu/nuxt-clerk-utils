import { eventHandler } from 'h3'
import { getClerkSession } from '../utils/session'

export default eventHandler(async (event) => {
  return getClerkSession(event)
})
