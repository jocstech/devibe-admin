<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { TagEditDialog, TagList } from './components'
import { createTag, getTagById, getTags, updateTagById } from '@/api/cms'

const tags = ref()
const count = computed(() => tags.value?.length ?? 0)
const dialogConfig = reactive({ visible: false, tag: {} })

// data handler
const fetchTags = async () => {
  const { data } = await getTags()
  tags.value = data
}

// lifecycle
onMounted(async () => {
  await fetchTags()
})

// callback actions
const onCreate = () => {
  openDialog({ visible: true, category: 'all' })
}

// Update the tag
const onEdit = async (id: string) => {
  if (id) {
    const { data } = await getTagById(id)
    if (data)
      openDialog(data)
    else
      onFailed(undefined, '无法编辑该标签')
  }
}

// Save the new tag
const onSave = async (tag: CMSTag) => {
  if (tag?._id) {
    // update
    const { data } = await updateTagById(tag._id, tag)
    if (data?._id) {
      closeDialog(data)
      await fetchTags()
    }
  }
  else {
    // create
    const { data } = await createTag(tag)
    closeDialog(data)
    if (data)
      await fetchTags()
  }
  onSucceeded()
}

// Delete tag
const onDelete = async (type: string) => {
  if (type)
    await fetchTags()
}

// Edge Handler
function openDialog(data?: CMSTag) {
  dialogConfig.visible = true
  if (data)
    dialogConfig.tag = data
}

function closeDialog(data?: CMSTag) {
  dialogConfig.visible = false
  if (data)
    dialogConfig.tag = data
}

function onSucceeded(title?: string, message?: string) {
  ElNotification({
    title: title || '成功',
    message: message || '操作成功',
    type: 'success',
  })
}
function onFailed(title?: string, message?: string) {
  ElNotification({
    title: title || '失败',
    message: message || '操作失败',
    type: 'error',
  })
}
</script>

<template>
  <ContentWrap :title="`标签管理（一共${count}个标签）`" message="标签管理" :body-style="{ padding: 0 }">
    <template #actions>
      <ElButton type="primary" @click="onCreate">
        创建新标签
      </ElButton>
    </template>
    <TagList v-if="tags" :tags="tags" @edit="onEdit" @delete="onDelete" />
  </ContentWrap>
  <TagEditDialog
    v-model:visible="dialogConfig.visible"
    :tag="dialogConfig.tag"
    @save="onSave"
  />
</template>

<style scoped></style>
