import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { routes } from './router'
import store from './stores'

import 'virtual:svg-icons-register'
import svgIcon from './components/svgIcon/index.vue'

import './assets/styles/index.scss'

export const createApp = ViteSSG(App, { routes }, ({ app, initialState, onSSRAppRendered }) => {
  app.component('SvgIcon', svgIcon)
  app.use(store)

  if (!import.meta.env.SSR) {
    store.state.value = initialState.pinia || {}
  } else {
    onSSRAppRendered(() => {
      initialState.pinia = store.state.value
    })
  }
})
