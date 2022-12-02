<script setup lang="ts">
import type { PropType } from 'vue'
import { Highlight } from '@/components/Highlight'
import { useDesign } from '@/hooks/web/useDesign'
import { propTypes } from '@/utils/propTypes'
import type { TipSchema } from '@/types/infoTip'

defineProps({
  title: propTypes.string.def(''),
  schema: {
    type: Array as PropType<Array<string | TipSchema>>,
    required: true,
    default: () => [],
  },
  showIndex: propTypes.bool.def(true),
  highlightColor: propTypes.string.def('var(--el-color-primary)'),
})

const emit = defineEmits(['click'])

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('infotip')

const keyClick = (key: string) => {
  emit('click', key)
}
</script>

<template>
  <div
    class="p-20px mb-20px border-1px border-solid border-[var(--el-color-primary)] bg-[var(--el-color-primary-light-9)]" :class="[
      prefixCls,
    ]"
  >
    <div v-if="title" class="flex items-center" :class="[`${prefixCls}__header`]">
      <Icon icon="bi:exclamation-circle-fill" :size="22" color="var(--el-color-primary)" />
      <span class="pl-5px text-16px font-bold" :class="[`${prefixCls}__title`]">{{ title }}</span>
    </div>
    <div :class="`${prefixCls}__content`">
      <p v-for="(item, $index) in schema" :key="$index" class="text-14px mt-15px">
        <Highlight
          :keys="typeof item === 'string' ? [] : item.keys"
          :color="highlightColor"
          @click="keyClick"
        >
          {{ showIndex ? `${$index + 1}、` : '' }}{{ typeof item === 'string' ? item : item.label }}
        </Highlight>
      </p>
    </div>
  </div>
</template>
