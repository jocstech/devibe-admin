<template>
  <Dialog v-model="visible" :title="title" maxHeight="400px">
    <tag-form v-if="tag" v-model:tag="tag" :mode="mode" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="onSave">
          {{ mode === 'edit' ? 'Update' : 'Create' }}
        </el-button>
      </span>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
  import { ElButton } from 'element-plus'
  import { Dialog } from '@/components/Dialog'
  import { computed, PropType } from 'vue'
  import { TagForm } from './index'
  import { propTypes } from '@/utils/propTypes'

  // const props = defineProps<{ tag: CRMTag; visible: Boolean }>()

  const props = defineProps({
    visible: propTypes.bool.def(false),
    tag: {
      type: Object as PropType<CRMTag>,
      default: () => undefined
    }
  })

  const emit = defineEmits<{
    (e: 'save', tag: CRMTag): void
    (e: 'update:tag', tag: CRMTag): void
    (e: 'update:visible', visible: Boolean): void
  }>()

  const mode = computed(() => (props.tag?._id ? 'edit' : 'create'))
  const title = computed(() => (mode.value === 'edit' ? '编辑标签内容' : '新建一个标签'))

  // v-model object 双向绑定的秘密
  const tag = computed({
    get: () => props.tag,
    set: (value: CRMTag) => emit('update:tag', value)
  })

  const visible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
  })

  const onSave = () => {
    emit('save', tag.value as CRMTag)
  }
</script>

<style scoped></style>
