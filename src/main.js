/**
 * 应用程序入口文件
 * 基于 ViteSSG 的 Vue 3 博客系统
 * 支持 SSR/SSG、状态管理、SVG 图标、进度条等功能
 */

import { ViteSSG } from 'vite-ssg'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import App from './App.vue'
import { routes } from './router'
import store from './stores'

// SVG 图标注册和组件导入
import 'virtual:svg-icons-register'
import svgIcon from './components/svgIcon/index.vue'

// 全局样式导入
import './assets/styles/index.scss'

/**
 * 创建 ViteSSG 应用实例
 * 配置路由、状态管理、进度条等功能
 * @param {Object} App - Vue 根组件
 * @param {Object} routes - 路由配置
 * @param {Function} callback - 初始化回调函数
 * @returns {Object} ViteSSG 应用实例
 */
export const createApp = ViteSSG(App, { routes }, ({ app, initialState, router, onSSRAppRendered }) => {
  // 全局注册 SVG 图标组件
  app.component('SvgIcon', svgIcon)

  // 注册 Pinia 状态管理
  app.use(store)

  // 客户端特定配置
  if (!import.meta.env.SSR) {
    // 路由切换进度条
    router.beforeEach((to, from) => {
      if (to.path !== from.path) {
        NProgress.start()
      }
    })
    router.afterEach(() => {
      NProgress.done()
    })

    // 水合状态（从 SSR 到客户端）
    store.state.value = initialState.pinia || {}
  } else {
    // SSR 渲染完成后保存状态
    onSSRAppRendered(() => {
      initialState.pinia = store.state.value
    })
  }
})
