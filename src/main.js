import { createApp, h } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store/store'

// Create global app instance

createApp({
  router,
  store,
  render () {
    return h(App)
  }
}).mount('#app')
