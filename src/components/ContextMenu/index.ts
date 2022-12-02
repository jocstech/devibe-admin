import type { ElDropdown } from 'element-plus'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import ContextMenu from './src/ContextMenu.vue'

export interface ContextMenuExpose {
  elDropdownMenuRef: ComponentRef<typeof ElDropdown>
  tagItem: RouteLocationNormalizedLoaded
}

export { ContextMenu }
