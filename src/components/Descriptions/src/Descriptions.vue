<script setup lang="ts">
import { ElCollapseTransition, ElDescriptions, ElDescriptionsItem, ElTooltip } from 'element-plus'
import type { PropType } from 'vue'
import { computed, ref, unref, useAttrs, useSlots } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
import { propTypes } from '@/utils/propTypes'
import { useAppStore } from '@/store/modules/app'
import type { DescriptionsSchema } from '@/types/descriptions'

const props = defineProps({
  title: propTypes.string.def(''),
  message: propTypes.string.def(''),
  collapse: propTypes.bool.def(true),
  schema: {
    type: Array as PropType<DescriptionsSchema[]>,
    default: () => [],
  },
  data: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
})

const appStore = useAppStore()

const mobile = computed(() => appStore.getMobile)

const attrs = useAttrs()

const slots = useSlots()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('descriptions')

const getBindValue = computed(() => {
  const delArr: string[] = ['title', 'message', 'collapse', 'schema', 'data', 'class']
  const obj = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.includes(key))
      delete obj[key]
  }
  return obj
})

const getBindItemValue = (item: DescriptionsSchema) => {
  const delArr: string[] = ['field']
  const obj = { ...item }
  for (const key in obj) {
    if (delArr.includes(key))
      delete obj[key]
  }
  return obj
}

// 折叠
const show = ref(true)

const toggleClick = () => {
  if (props.collapse)
    show.value = !unref(show)
}
</script>

<template>
  <div
    class="bg-[var(--el-color-white)] dark:(bg-[var(--el-bg-color)] border-[var(--el-border-color)] border-1px)" :class="[
      prefixCls,
    ]"
  >
    <div
      v-if="title"
      class="h-50px flex justify-between items-center mb-10px border-bottom-1 border-solid border-[var(--tags-view-border-color)] px-10px cursor-pointer dark:border-[var(--el-border-color)]" :class="[
        `${prefixCls}-header`,
      ]"
      @click="toggleClick"
    >
      <div class="relative font-18px font-bold ml-10px" :class="[`${prefixCls}-header__title`]">
        <div class="flex items-center">
          {{ title }}
          <ElTooltip v-if="message" :content="message" placement="right">
            <Icon icon="ep:warning" class="ml-5px" />
          </ElTooltip>
        </div>
      </div>
      <Icon v-if="collapse" :icon="show ? 'ep:arrow-down' : 'ep:arrow-up'" />
    </div>

    <ElCollapseTransition>
      <div v-show="show" class="p-10px" :class="[`${prefixCls}-content`]">
        <ElDescriptions
          :column="2"
          border
          :direction="mobile ? 'vertical' : 'horizontal'"
          v-bind="getBindValue"
        >
          <template v-if="slots.extra" #extra>
            <slot name="extra" />
          </template>
          <ElDescriptionsItem
            v-for="item in schema"
            :key="item.field"
            v-bind="getBindItemValue(item)"
          >
            <template #label>
              <slot :name="`${item.field}-label`" :label="item.label">
                {{ item.label }}
              </slot>
            </template>

            <template #default>
              <slot :name="item.field" :row="data">
                {{ data[item.field] }}
              </slot>
            </template>
          </ElDescriptionsItem>
        </ElDescriptions>
      </div>
    </ElCollapseTransition>
  </div>
</template>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-descriptions';

  .@{prefix-cls}-header {
    &__title {
      &::after {
        position: absolute;
        top: 3px;
        left: -10px;
        width: 4px;
        height: 70%;
        background: var(--el-color-primary);
        content: '';
      }
    }
  }

  .@{prefix-cls}-content {
    :deep(.@{elNamespace}-descriptions__cell) {
      width: 0;
    }
  }
</style>
