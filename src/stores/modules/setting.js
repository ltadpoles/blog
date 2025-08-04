/*
 * @Description: 项目配置store
 */
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('settingStore', {
  state: () => ({
    theme: 'light'
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme
    }
  },
  // 持久化存储
  persist: {
    storage: localStorage
  }
})
