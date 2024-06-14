export default defineEventHandler(async (event) => {
  const session = await getClerkSession(event)

  // console.log(session.user.auth0)
  return session
})
