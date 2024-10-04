import path from 'path'

const TRANS_VIRTUAL_MODULE_NAME = 'virtual-lingui-trans'

class LinguiTransRscResolver {
  apply(resolver) {
    const target = resolver.ensureHook('resolve')
    resolver.getHook('resolve').tapAsync('LinguiTransRscResolver', (request, resolveContext, callback) => {
      if (request.request === TRANS_VIRTUAL_MODULE_NAME) {
        const req = {
          ...request,
          request:
            request.context.issuerLayer === 'rsc'
              ? // RSC Version without Context
                path.resolve('./src/i18n/rsc-trans.tsx')
              : // Regular version
                '@lingui/react',
        }

        return resolver.doResolve(target, req, null, resolveContext, callback)
      }

      callback()
    })
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  experimental: {
    swcPlugins: [
      [
        '@lingui/swc-plugin',
        {
          runtimeModules: {
            trans: [TRANS_VIRTUAL_MODULE_NAME, 'Trans'],
          },
        },
      ],
    ],
    optimizePackageImports: [
      'antd',
      'lodash-es',
      'date-fns',
      'rc-util',
      'rc-pagination',
      'rc-picker',
      'rc-notification',
      'rc-tooltip',
      'rc-tree',
      'rc-table',
      '@ant-design/charts',
    ],
  },

  webpack: (config) => {
    config.resolve.plugins.push(new LinguiTransRscResolver())
    config.resolve.fallback = { fs: false }
    return config
  },

  transpilePackages: [
    'antd',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
  ],

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development', // Remove console.log in production
  },

  pageExtensions: process.env.NODE_ENV !== 'development' ? ['ts', 'tsx'] : ['ts', 'tsx', 'dev.tsx', 'dev.ts'],
}

export default nextConfig
