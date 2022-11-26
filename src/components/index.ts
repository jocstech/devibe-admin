import type { App } from 'vue'
import { Icon } from './Icon'
import { ContentWrap } from './ContentWrap'
import { ContentDetailWrap } from './ContentDetailWrap'

export const setupGlobCom = (app: App<Element>): void => {
  app.component('Icon', Icon)
  app.component('ContentWrap', ContentWrap)
  app.component('ContentDetailWrap', ContentDetailWrap)
}
