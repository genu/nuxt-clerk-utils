import {
  defineNuxtModule,
  createResolver,
  addServerHandler,
  addImportsDir,
  addPlugin,
  addComponent,
  addImports,
} from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-clerk-utils',
    configKey: 'clerk',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('./runtime/composables'))

    _nuxt.options.alias['#clerk'] = resolver.resolve('./runtime/types/index')

    /**
     * App
     */
    addPlugin(resolver.resolve('./runtime/plugins/clerk-session.server'))
    addPlugin(resolver.resolve('./runtime/plugins/vue-clerk'))

    /**
     * Server
     */
    if (_nuxt.options.nitro.imports !== false) {
      _nuxt.options.nitro.imports = defu(_nuxt.options.nitro.imports, {
        presets: [
          {
            from: resolver.resolve('./runtime/server/utils/webhook'),
            imports: ['defineClerkWebhook'],
          },
          {
            from: resolver.resolve('./runtime/server/utils/session'),
            imports: ['requireClerkSession', 'getClerkSession'],
          },
        ],
      })
    }

    addServerHandler({
      handler: resolver.resolve('./runtime/server/middleware/clerk'),
      middleware: true,
    })
    addServerHandler({
      handler: resolver.resolve('./runtime/server/api/session.get'),
      route: '/api/_clerk/session',
    })
    addServerHandler({
      handler: resolver.resolve('./runtime/server/api/session.delete'),
      route: '/api/_clerk/session',
    })

    // Runtime configuration
    _nuxt.options.runtimeConfig.public.clerk = defu(
      _nuxt.options.runtimeConfig.public.clerk,
      {
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      },
    )

    /**
     * Vue Clerk
     */
    const components = [
      // Authentication Components
      'SignIn',
      'SignUp',
      // Unstyled Components
      'SignInButton',
      'SignOutButton',
      'SignUpButton',
      // User Components
      'UserButton',
      'UserProfile',
      // Organization Components
      'CreateOrganization',
      'OrganizationProfile',
      'OrganizationSwitcher',
      'OrganizationList',
      // Control Components
      'ClerkLoaded',
      'ClerkLoading',
      'Protect',
      'RedirectToSignIn',
      'RedirectToSignUp',
      'RedirectToUserProfile',
      'RedirectToOrganizationProfile',
      'RedirectToCreateOrganization',
      'SignedIn',
      'SignedOut',
    ]
    const composables = [
      // Composables
      'useAuth',
      'useClerk',
      'useSession',
      'useSessionList',
      'useSignIn',
      'useSignUp',
      'useUser',
      'useOrganization',
    ]

    addImports(
      composables.map(composable => ({
        name: composable,
        from: 'vue-clerk',
      })),
    )

    components.forEach(component =>
      addComponent({
        name: component,
        export: component,
        filePath: 'vue-clerk',
      }),
    )
  },
})

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    apiSecret: string
  }
  interface PublicRuntimeConfig {
    clerk: {
      publishableKey: string
    }
  }
}
