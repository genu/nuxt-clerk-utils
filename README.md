<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# nuxt-clerk

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[Clerk](https://clerk.com/) module that builds on top of [vue-clerk](https://github.com/wobsoriano/vue-clerk)

## Features

- Server middleware based on [h3-clerk](https://github.com/wobsoriano/h3-clerk)

## Requirements

This module only works with SSR (server-side rendering) enabled as it uses server API routes. You cannot use this module with `nuxt generate`.

## Quick Setup

...

## Vue Composables

...

## Server Utils

The following helpers are auto-imported in your `server/` directory.

### Session Management

```ts
// Get the current clerk session if it exists, null otherwise
const clerkSession = await getClerkSession(event);

// Require a clerk session (send back 401 if not `user` session exists)
const clerkSession = await requireClerkSession(event);
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
