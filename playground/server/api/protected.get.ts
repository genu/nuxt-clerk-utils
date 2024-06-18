export default defineEventHandler(async (event) => {
  const session = requireClerkSession(event)

  return session
})
