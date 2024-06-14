import {
  defineNuxtModule,
  createResolver,
  addServerHandler,
  addImportsDir,
  addPlugin,
} from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-clerk',
    configKey: 'clerk',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    // const runtimeConfig = nuxt.options.runtimeConfig

    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('./runtime/composables'))

    _nuxt.options.alias['#clerk'] = resolver.resolve('./runtime/types/index')

    /**
     * App
     */
    addPlugin(resolver.resolve('./runtime/plugins/clerk-session.server'))

    /**
     * Server
     */
    if (_nuxt.options.nitro.imports !== false) {
      _nuxt.options.nitro.imports = defu(_nuxt.options.nitro.imports, {
        presets: [
          {
            from: resolver.resolve('./runtime/server/utils/session'),
            imports: ['requireClerkSession', 'getClerkSession'],
          },
        ],
      },
      )
    }

    addServerHandler({
      handler: resolver.resolve('./runtime/server/middleware/clerk'),
      middleware: true,
    })
    addServerHandler({
      handler: resolver.resolve('./runtime/server/api/session.get'),
      route: '/api/_clerk/session.get',
    })
    addServerHandler({
      handler: resolver.resolve('./runtime/server/api/session.delete'),
      route: '/api/_clerk/session.delete',
    })
  },
})
