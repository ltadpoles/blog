/*
 * @Description: 用户store
 */
import config from '@/config'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {},
    message: {}
  }),
  actions: {
    setUser(user) {
      this.user = user
    },
    setMessage(message) {
      this.message = message
    }
  },
  persist: import.meta.env.SSR === false && {
    storage: config.PINIASTORY
  }
})
