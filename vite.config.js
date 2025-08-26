import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import imagemin from 'vite-plugin-imagemin'
import postcssPxtorem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_BASE_URL || '/',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [VantResolver()],
        dts: './auto-imports.d.ts', // 生成类型声明文件
      }),
      Components({
        resolvers: [VantResolver()],
        dts: './components.d.ts', // 生成组件类型声明文件
      }),
      // 打包体积分析
      mode === 'production' && visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
      // 静态资源压缩
      mode === 'production' && viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 10240, // 10KB以上才压缩
      }),
      // 图片优化
      imagemin({
        gifsicle: { optimizationLevel: 7 },
        jpegtran: { quality: 80 },
        optipng: { optimizationLevel: 7 },
        svgo: { plugins: [{ removeViewBox: false }] },
      }),
    ],
    css: {
      postcss: {
        plugins: [
          postcssPxtorem({
            rootValue: 37.5,
            propList: ['*'],
            selectorBlackList: ['van-']
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
