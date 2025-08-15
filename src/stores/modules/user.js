/*
 * @Description: 用户store
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      name: '测试'
    }
  }),
  actions: {
    setUser(user) {
      this.user = user
    }
  },
  persist: import.meta.env.SSR === false && {
    storage: localStorage
  }
})
