import { ViteSSG } from 'vite-ssg'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import App from './App.vue'
import { routes } from './router'
import store from './stores'

import 'virtual:svg-icons-register'
import svgIcon from './components/svgIcon/index.vue'

import './assets/styles/index.scss'

export const createApp = ViteSSG(App, { routes }, ({ app, initialState, router, onSSRAppRendered }) => {
  app.component('SvgIcon', svgIcon)
  app.use(store)

  if (!import.meta.env.SSR) {
    router.beforeEach((to, from) => {
      if (to.path !== from.path) {
        NProgress.start()
      }
    })
    router.afterEach(() => {
      NProgress.done()
    })
    store.state.value = initialState.pinia || {}
  } else {
    onSSRAppRendered(() => {
      initialState.pinia = store.state.value
    })
  }
})
