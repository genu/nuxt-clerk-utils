# nuxt-clerk-utils

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[Clerk](https://clerk.com/) module that builds on top of [vue-clerk](https://github.com/wobsoriano/vue-clerk)

## Features

- Server middleware based on [h3-clerk](https://github.com/wobsoriano/h3-clerk)
- Utilities for handling clerk webhooks

## Requirements

This module only works with SSR (server-side rendering) enabled as it uses server API routes. You cannot use this module with `nuxt generate`.

## Quick Setup

1. Add `nuxt-clerk-utils`

```bash
# Using pnpm
pnpm add -D nuxt-clerk-utils

# Using yarn
yarn add --dev nuxt-clerk-utils

# Using npm
npm install --save-dev nuxt-clerk-utils

```

2. Add `nuxt-clerk-utils` to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ["nuxt-clerk-utils"],
});
```

## Configuration

The following environment variables are required in order for this module to function correctly to be defined in your `.env`:

```bash
CLERK_PUBLISHABLE_KEY=".."
CLERK_SECRET_KEY="..."

# Optional: Enable this if you want to handle clerk webhooks
CLERK_WEBHOOK_SIGNING_SECRET=".."
```

## Vue Composables

> NOTE: All of the composables and components are re-exported from [vue-clerk](https://github.com/wobsoriano/vue-clerk). See project [documentation](https://vue-clerk.vercel.app) for usage

## Server Utils

The following helpers are auto-imported in your `server/` directory.

### Session Management

```ts
// Get the current clerk session if it exists, null otherwise
const clerkSession = await getClerkSession(event);

// Require a clerk session (send back 401 if no `user` session exists)
const clerkSession = await requireClerkSession(event);
```

### Webhooks

To work with webhooks, first create the webhook on the clerk dashboard, and define a handler for it in your app like so:

> Note: You must provide the `CLERK_WEBHOOK_SIGNING_SECRET` env (see above)

When defining a webhook in this way, you can assume that the webhook is valid as **its signature is automatically verified.**

```ts
// server/routes/clerk.post.ts
export default defineClerkWebhook((_event, { payload, type }) => {
  // ...
});
```

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

## Prior art and acknowledgments

- [nuxt-clerk](https://github.com/RodrigoProjects/nuxt-clerk)
- [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils)

[npm-version-src]: https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/my-module
[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/my-module
[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/my-module
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
