// Plugins
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Fonts from 'unplugin-fonts/vite';
import Layouts from 'vite-plugin-vue-layouts';
import Vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import vueDevTools from 'vite-plugin-vue-devtools'
// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { execSync } from 'node:child_process';

function getGitTag() {
  try {
    return execSync('git describe --tags --abbrev=0').toString().trim();
  } catch (error) {
    console.warn('Failed to get Git tag:', error);
    return 'unknown';
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts'
    }),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        {
          'vue-router/auto': ['useRoute', 'useRouter']
        }
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true
      },
      vueTemplate: true
    }),
    Components({
      dts: 'src/components.d.ts'
    }),
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss'
      }
    }),
    Fonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900'
          }
        ]
      }
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',

      /**
       * custom insert position
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first',

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__'
    }),
    vueDevTools()
  ],
  define: {
    'process.env': {},
    __GIT_TAG__: JSON.stringify(getGitTag()),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  },
  server: {
    port: 3000
  },
  ssr: {
    noExternal: ['vuetify']
  },
  ssgOptions: {
    includedRoutes(paths, routes) {
      paths.push('/download/thank_you/_/_/_/');
      return paths.filter(i => !i.includes(':') || i === '/download/thank_you');
    },
  },
});
