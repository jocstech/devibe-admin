<template>
  <el-dialog v-model="visible" title="编辑标签内容">
    <h1>Tag Edit</h1>
    <div v-if="tag">
      <TagEditor v-model:tag="tag" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElDialog } from 'element-plus'
  import { computed } from 'vue'
  import { TagEditor } from './index'

  const props = defineProps<{ tag: CRMTag; visible: Boolean }>()

  const emit = defineEmits<{
    (e: 'update:tag', tag: CRMTag): void
    (e: 'update:visible', visible: Boolean): void
    (e: 'save', article: CRMArticle): void
  }>()

  // v-model object 双向绑定的秘密
  const tag = computed({
    get: () => props.tag,
    set: (value) => emit('update:tag', value)
  })

  const visible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
  })
</script>

<style scoped></style>
