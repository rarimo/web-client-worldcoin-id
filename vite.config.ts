import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react'
import * as fs from 'fs'
import * as path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import { checker } from 'vite-plugin-checker'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import tsconfigPaths from 'vite-tsconfig-paths'

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relative: string) => path.resolve(appDirectory, relative)
const root = path.resolve(__dirname, resolveApp('src'))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // const isProduction = env.VITE_ENVIRONMENT === 'production'
  // const isDevelopment = env.VITE_ENVIRONMENT === 'development'
  const isAnalyze = env.VITE_ENVIRONMENT === 'analyze'
  // const buildVersion = env.VITE_APP_BUILD_VERSION

  return {
    test: {
      environment: 'jsdom',
    },
    ...(env.VITE_PORT
      ? {
          server: {
            port: Number(env.VITE_PORT),
          },
        }
      : {}),
    define: {
      'process.env': {},
    },
    publicDir: 'static',
    plugins: [
      splitVendorChunkPlugin(),
      react(),

      tsconfigPaths(),
      createSvgIconsPlugin({
        iconDirs: [
          path.resolve(process.cwd(), 'src/assets/icons'),
          path.resolve(process.cwd(), 'static/images/providers'),
        ],
        symbolId: '[name]',
      }),
      checker({
        overlay: {
          initialIsOpen: false,
        },
        typescript: true,
        eslint: {
          lintCommand:
            'eslint "{src,config}/**/*.{jsx,tsx}" --cache --max-warnings=0',
        },
      }),
      ...(isAnalyze
        ? [
            visualizer({
              open: true,
            }),
          ]
        : []),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [
            '@import "@/styles/_functions.scss";',
            '@import "@/styles/_mixins.scss";',
          ].join(''),
        },
      },
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      dedupe: ['react', 'lodash'],
      alias: {
        '@': `${root}/`,
        '@config': `${root}/config.ts`,
        '@static': `${root}/../static`,

        util: path.resolve(__dirname, 'node_modules/util/util.js'),
        ejc: path.resolve(__dirname, 'node_modules/ejs/ejs.min.js'),

        snarkjs: path.resolve(
          __dirname,
          'node_modules/snarkjs/build/snarkjs.min.js',
        ),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
    build: {
      target: 'esnext',
      sourcemap: true,
      rollupOptions: {
        plugins: [
          // Enable rollup polyfills plugin
          // used during production bundling
          nodePolyfills(),
        ],

        output: {
          manualChunks: {
            lodash: ['lodash'],
            react: ['react', 'react-dom'],
          },
        },
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  }
})
