import { App } from 'vue'

export default {
  install(app: App) {
    app.config.globalProperties.$ui = {
      version: '1.0.0',
    }
    console.log('UI Library installed')
  },
}
