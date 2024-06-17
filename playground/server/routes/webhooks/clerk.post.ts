export default defineClerkWebhook((_event, { payload, type }) => {
  console.log('pyload type', type)
  console.log('payload', payload)
})
