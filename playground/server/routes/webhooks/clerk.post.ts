export default defineClerkWebhook(({ payload, type }) => {
  console.log('pyload type', type)
  console.log('payload', payload)
})
