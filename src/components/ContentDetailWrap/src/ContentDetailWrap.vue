<script setup lang="ts">
import { ElButton, ElCard } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'
// import { Sticky } from '@/components/Sticky'
import { useI18n } from '@/hooks/web/useI18n'
defineProps({
  title: propTypes.string.def(''),
  message: propTypes.string.def(''),
})
const emit = defineEmits(['back'])
const { t } = useI18n()
const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('content-detail-wrap')
const offset = ref(1)
const contentDetailWrap = ref()
onMounted(() => {
  offset.value = contentDetailWrap.value.getBoundingClientRect().top
})
</script>

<template>
  <div ref="contentDetailWrap" class="relative bg-white dark:bg-v-dark" :class="[`${prefixCls}-container`]">
    <div
      class="flex border-bottom-1 h-50px items-center text-center bg-white dark:bg-v-dark pr-10px" :class="[
        `${prefixCls}-header`,
      ]"
    >
      <div class="flex pl-10px pr-10px " :class="[`${prefixCls}-header__back`]">
        <ElButton @click="emit('back')">
          <Icon icon="ep:arrow-left" class="mr-5px" />
          {{ t('common.back') }}
        </ElButton>
      </div>
      <div class="flex flex-1  justify-center" :class="[`${prefixCls}-header__title`]">
        <slot name="title">
          <label class="text-16px font-700">{{ title }}</label>
        </slot>
      </div>
      <div class="flex  pl-10px pr-10px" :class="[`${prefixCls}-header__right`]">
        <slot name="right" />
      </div>
    </div>

    <div style="padding: var(--app-content-padding)">
      <ElCard class="mb-20px" :class="[`${prefixCls}-body`]" shadow="never">
        <div>
          <slot />
        </div>
      </ElCard>
    </div>
  </div>
</template>
