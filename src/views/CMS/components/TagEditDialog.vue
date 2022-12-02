<script lang="ts" setup>
import type { PropType } from 'vue'
import { TagForm } from './index'
import { propTypes } from '@/utils/propTypes'

// const props = defineProps<{ tag: CMSTag; visible: Boolean }>()

const props = defineProps({
  visible: propTypes.bool.def(false),
  tag: {
    type: Object as PropType<CMSTag>,
    default: () => undefined,
  },
})

const emit = defineEmits<{
  (e: 'save', tag: CMSTag): void
  (e: 'update:tag', tag: CMSTag): void
  (e: 'update:visible', visible: Boolean): void
}>()

const mode = computed(() => (props.tag?._id ? 'edit' : 'create'))
const title = computed(() => (mode.value === 'edit' ? '编辑标签内容' : '新建一个标签'))

// v-model object 双向绑定的秘密
const tag = computed({
  get: () => props.tag,
  set: (value: CMSTag) => emit('update:tag', value),
})

const visible = computed({
  get: () => props.visible,
  set: value => emit('update:visible', value),
})

const onSave = () => {
  emit('save', tag.value as CMSTag)
}
</script>

<template>
  <Dialog v-model="visible" :title="title" max-height="400px">
    <TagForm v-if="tag" v-model:tag="tag" :mode="mode" />
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="visible = false">Cancel</ElButton>
        <ElButton type="primary" @click="onSave">
          {{ mode === 'edit' ? 'Update' : 'Create' }}
        </ElButton>
      </span>
    </template>
  </Dialog>
</template>

<style scoped></style>
