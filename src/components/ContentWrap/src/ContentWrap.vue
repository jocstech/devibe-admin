<script setup lang="ts">
import { ElCard, ElTooltip } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'

defineProps({
  title: propTypes.string.def(''),
  message: propTypes.string.def(''),
})

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('content-wrap')
</script>

<template>
  <ElCard :class="[prefixCls]" shadow="never">
    <template v-if="title" #header>
      <div class="flex justify-between">
        <div class="flex items-center">
          <span class="text-16px font-700">{{ title }}</span>
          <ElTooltip v-if="message" effect="dark" placement="right">
            <template #content>
              <div class="max-w-200px">
                {{ message }}
              </div>
            </template>
            <Icon class="ml-5px" icon="bi:question-circle-fill" :size="14" />
          </ElTooltip>
        </div>
        <slot name="actions" />
      </div>
    </template>
    <div>
      <slot />
    </div>
  </ElCard>
</template>
