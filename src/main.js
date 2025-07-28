import './assets/main.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, initialState, isClient, onSSRAppRendered }) => {
    // 配置状态管理
    const store = createPinia()
    store.use(piniaPluginPersistedstate)

    // 使用状态管理和路由
    app.use(store).use(router)

    if (isClient) {
      store.state.value = initialState.pinia || {}
    } else {
      onSSRAppRendered(() => {
        initialState.pinia = store.state.value
      })
    }
  }
)
