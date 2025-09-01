/**
 * Vite 构建配置
 * 支持 Vue 3、SSG、自动导入、SVG 图标、站点地图等功能
 */

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

      // Vue 3 和 Element Plus 自动导入
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

      // 组件自动导入
      Components({
        resolvers: [ElementPlusResolver()]
      }),

      // SVG 图标系统
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),

      // 站点地图生成
      sitemap({
        hostname: 'https://www.yddekd.com',
        generateRobotsTxt: true,
        robots: [
          {
            userAgent: '*',
            allow: ['/', '/article/', '/category/', '/tag/', '/archive', '/about', '/board'],
            sitemap: 'https://www.yddekd.com/sitemap.xml'
          }
        ],
        routes: ['/', '/archive', '/about', '/board', '/category', '/tag'],
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString()
      })
    ],
    // SSR 配置
    ssr: {
      noExternal: ['element-plus', 'md-editor-v3', '@unhead/vue']
    },

    // 路径别名配置
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    // 开发服务器配置
    server: {
      port: 816,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true
        }
      }
    },

    // 构建配置
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      },
      chunkSizeWarningLimit: 1500
    }
  }
})
