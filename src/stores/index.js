/**
 * Pinia 状态管理实例
 * 配置状态持久化插件，支持 localStorage/sessionStorage
 */

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建 Pinia 实例
const pinia = createPinia()

// 注册状态持久化插件
pinia.use(piniaPluginPersistedstate)

export default pinia
