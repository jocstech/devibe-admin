<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { Icon } from '@/components/Icon'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'

defineProps({
  color: propTypes.string.def(''),
})

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('screenfull')

const { toggle, isFullscreen } = useFullscreen()

const toggleFullscreen = () => {
  toggle()
}
</script>

<template>
  <div :class="prefixCls" @click="toggleFullscreen">
    <Icon
      :size="18"
      :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
      :color="color"
    />
  </div>
</template>
