import type { App } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '~/styles/element/index.scss'

export const setupElementPlus = (app: App<Element>) => {
  app.use(ElementPlus)
}
