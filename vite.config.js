import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig(() => {
  return {
    envDir: 'env',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: [
          'vue',
          'vue-router',
          {
            '@unhead/vue': ['useHead', 'useSeoMeta', 'useServerHead']
          }
        ]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      sitemap({
        hostname: 'https://www.yddekd.com', // 请替换为实际域名
        generateRobotsTxt: true,
        robots: [
          {
            userAgent: '*',
            allow: ['/', '/article/', '/category/', '/tag/', '/archive', '/about', '/board'],
            sitemap: 'https://www.yddekd.com/sitemap.xml' // 请替换为实际域名
          }
        ],
        routes: ['/', '/archive', '/about', '/board', '/category', '/tag'],
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString()
      })
    ],
    ssr: {
      noExternal: ['element-plus', 'md-editor-v3']
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 816,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'static/js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]' // 资源文件像 字体，图片等
        }
      },
      chunkSizeWarningLimit: 1500
    }
  }
})
