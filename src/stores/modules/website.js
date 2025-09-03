/*
 * @Description: 网站store
 */
import config from '@/config'
import { defineStore } from 'pinia'

export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    info: {},
    articleStats: {}
  }),
  actions: {
    setInfo(info) {
      this.info = info
    },
    setArticleStats(stats) {
      this.articleStats = stats
    }
  },
  persist: import.meta.env.SSR === false && {
    storage: config.PINIASTORY
  }
})
