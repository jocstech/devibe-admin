import type { VNode } from 'vue'
import { createVNode, render } from 'vue'
import ImageViewer from './src/ImageViewer.vue'
import type { ImageViewerProps } from './src/types'
import { isClient } from '@/utils/is'

let instance: Nullable<VNode> = null

export function createImageViewer(options: ImageViewerProps) {
  if (!isClient)
    return
  const {
    urlList,
    initialIndex = 0,
    infinite = true,
    hideOnClickModal = false,
    appendToBody = false,
    zIndex = 2000,
    show = true,
  } = options

  const propsData: Partial<ImageViewerProps> = {}
  const container = document.createElement('div')
  propsData.urlList = urlList
  propsData.initialIndex = initialIndex
  propsData.infinite = infinite
  propsData.hideOnClickModal = hideOnClickModal
  propsData.appendToBody = appendToBody
  propsData.zIndex = zIndex
  propsData.show = show

  document.body.appendChild(container)
  instance = createVNode(ImageViewer, propsData)
  render(instance, container)
}
