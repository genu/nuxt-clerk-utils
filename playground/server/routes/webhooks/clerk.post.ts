export default defineClerkWebhook('session.created', ({ payload }) => {
  console.log('payload', payload)
})
