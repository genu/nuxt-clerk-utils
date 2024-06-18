import { eventHandler, getHeader, readRawBody, createError } from 'h3'
import type { WebhookEventType, WebhookEvent } from '@clerk/backend'
import { Webhook } from 'svix'

export const defineClerkWebhook = <T = unknown>(
  fn: (data: { payload: T, type: WebhookEventType }) => Promise<void> | void,
) => {
  return eventHandler(async (event) => {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET!)

    const body = await readRawBody(event)

    try {
      const payload = wh.verify(body!, {
        'svix-id': getHeader(event, 'svix-id')!,
        'svix-signature': getHeader(event, 'svix-signature')!,
        'svix-timestamp': getHeader(event, 'svix-timestamp')!,
      }) as WebhookEvent

      return fn({
        payload: payload.data as T,
        type: payload.type,
      })
    }
    catch (e) {
      throw createError({
        statusCode: 401,
        message: 'Clerk webhook signature verification failed',
      })
    }
  })
}
