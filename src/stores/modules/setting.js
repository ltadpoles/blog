/*
 * @Description: 项目配置store
 */
import config from '@/config'
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
  persist: import.meta.env.SSR === false && {
    storage: config.PINIASTORY
  }
})
