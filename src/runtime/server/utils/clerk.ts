import { createClerkClient } from '@clerk/backend'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export const $clerk = createClerkClient({
  secretKey: config.clerk.secretKey,
  publishableKey: config.public.clerk.publishableKey,
})
