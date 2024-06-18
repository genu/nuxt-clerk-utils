export default defineEventHandler(async (event) => {
  const session = await getClerkSession(event)

  return session
})
