import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);// todo

  return {
    base: env.VITE_BASE_PATH,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: `${pathResolve('src')}/`
        }
      ],
      dedupe: ['vue'],
      extensions: ['.js', '.ts', '.jsx', '.tsx']// 导入时想要省略的扩展名列表
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`,
          charset: false
        },
      }
    },
    server: {
      host: true,
      port: Number(env.VITE_PORT),
      open: true,
      strictPort: false,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
    },
    build: {
      rollupOptions: {
        input: [
          './index.html',
          './mine/index.html',
          './performance/index.html',
          './shortVideo/index.html',
          './video/index.html'
        ],
        output: {
          dir: './dist'
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      svgLoader(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',// 开发环境打包开关
        prodEnabled: command !== 'serve' && Boolean(env.VITE_USE_MOCK),// 生产环境打包开关
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `
      }),
    ],
  }
}
