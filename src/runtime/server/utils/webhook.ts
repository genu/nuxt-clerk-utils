import type { WebhookEventType, WebhookEvent } from '@clerk/backend'
import type { UserJSON, SessionJSON, OrganizationJSON } from '@clerk/types'
import { eventHandler, getHeader, readRawBody, createError } from 'h3'
import { Webhook } from 'svix'

// Create a type that maps each WebhookEventType to its corresponding payload type
type WebhookPayloadMap = {
  [K in WebhookEventType]: K extends `user.${string}`
    ? UserJSON
    : K extends `session.${string}`
      ? SessionJSON
      : K extends `organization.${string}`
        ? OrganizationJSON
        : never;
}

export const defineClerkWebhook = <T extends keyof WebhookPayloadMap>(
  type: T,
  fn: (data: { payload: WebhookPayloadMap[T] }) => Promise<void> | void,
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
        payload: payload.data as unknown as WebhookPayloadMap[T],
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
