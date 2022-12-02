import path, { resolve } from 'path'
import { loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
// i18n
import VueI18n from '@intlify/vite-plugin-vue-i18n'
// vite-plugins
// import { ElementPlusResolve, createStyleImportPlugin } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import PurgeIcons from 'vite-plugin-purge-icons'
import { viteMockServe } from 'vite-plugin-mock'
import { createHtmlPlugin } from 'vite-plugin-html'
import WindiCSS from 'vite-plugin-windicss'
import VueJsx from '@vitejs/plugin-vue-jsx'

// unplugin
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueMacros from 'unplugin-vue-macros/vite'
// types
import type { ConfigEnv, UserConfig } from 'vite'

// https://vitejs.dev/config/
const root = process.cwd()

function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  const env = isBuild ? loadEnv(mode, root) : loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root)

  return {
    base: env.VITE_BASE_PATH,
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        '/\@\//': `${path.resolve(__dirname, 'src')}/`,
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },

    },
    plugins: [
      VueJsx(),
      createSvgIconsPlugin({
        iconDirs: [pathResolve('src/assets/svgs')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: true,
      }),
      PurgeIcons(),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer'
          setupProdMockServer()
          `,
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
            injectScript: '<script src="./inject.js"></script>',
          },
        },
      }),
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
            reactivityTransform: true,
          }),
        },
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
        ],
        resolvers: [ElementPlusResolver()],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/store',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        resolvers: [ElementPlusResolver()],
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
      }),

      WindiCSS(),
      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/variables.module.less";',
          javascriptEnabled: true,
        },
      },
    },
    build: {
      minify: 'terser',
      outDir: env.VITE_OUT_DIR || 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true' ? 'inline' : false,
      // brotliSize: false,
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
          drop_console: env.VITE_DROP_CONSOLE === 'true',
        },
      },
    },
    server: {
      port: 4000,
      proxy: {
        // 选项写法
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
      hmr: {
        overlay: false,
      },
      host: '0.0.0.0',
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'vue-types',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/locale/lang/en',
        '@iconify/iconify',
        '@vueuse/core',
        'axios',
        'qs',
        'echarts',
        'echarts-wordcloud',
        'intro.js',
        'qrcode',
        '@wangeditor/editor',
        '@wangeditor/editor-for-vue',
      ],
    },
  }
}
