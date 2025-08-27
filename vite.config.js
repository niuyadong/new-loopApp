import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postcssPxtorem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  
  return {
    base: env.VITE_BASE_URL || '/',
    plugins: [
      vue(),
      // 自动导入Vue相关API
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n'],
        dts: './auto-imports.d.ts',
      }),
      // Vant组件自动按需导入 - 官方推荐的简洁配置
      Components({
        resolvers: [VantResolver()],
        dts: './components.d.ts',
      }),
    ],
    css: {
      postcss: {
        plugins: [
          postcssPxtorem({
            rootValue: 37.5, // 基于375px设计稿
            propList: ['*'], // 转换所有属性中的px为rem
            unitPrecision: 5, // 保留5位小数
            selectorBlackList: ['van-'], // 关键修改：排除vant组件的转换
            replace: true, // 直接替换px为rem
            mediaQuery: false, // 不在媒体查询中转换
            minPixelValue: 1 // 小于1px的不转换
          })
        ]
      },
      preprocessorOptions: {
        scss: {
          // 修改为不引用已删除的文件
          additionalData: ``,
        }
      }
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            // 代码分割
            if (id.includes('node_modules')) {
              if (id.includes('vant')) {
                return 'vant'
              } else if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
                return 'vue'
              } else {
                return 'vendor'
              }
            }
          }
        }
      },
      // 启用缓存
      cacheDir: '.vite/cache',
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      // 禁用缓存
      cacheDir: false
    }
  }
})
