export default defineEventHandler(async (event) => {
  const session = requireClerkSession(event)

  // const _session = await requireUserSession(event)

  // console.log(session.user.auth0)
  return session
})
