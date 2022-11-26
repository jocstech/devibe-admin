<template>
  <ContentWrap :title="`标签管理（一共${count}个标签）`" message="标签管理">
    <div class="operations mb-2">
      <el-button :icon="Edit" type="primary" @click="onCreate">创建新标签</el-button>
    </div>
    <tag-list v-if="tags" :tags="tags" @edit="onEdit" @delete="onDelete" />
  </ContentWrap>
  <tag-edit-dialog
    v-model:visible="editDialogConfig.visible"
    :tag="editDialogConfig.tag"
    @save="onSave"
  />
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from 'vue'
  import { Edit } from '@element-plus/icons-vue'
  import { ElButton, ElNotification } from 'element-plus'
  import { getTags, getTagById, updateTagById, createTag } from '@/api/crm'

  import { TagList, TagEditDialog } from './components'

  const tags = ref()
  const count = computed(() => tags.value?.length ?? 0)
  const editDialogConfig = reactive({ visible: false, tag: {} })

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
      if (data) {
        openDialog(data)
      } else {
        onFailed(undefined, '无法编辑该标签')
      }
    }
  }

  // Save the new tag
  const onSave = async (tag: CRMTag) => {
    if (tag?._id) {
      // update
      const { data } = await updateTagById(tag._id, tag)
      if (data?._id) {
        closeDialog(data)
        await fetchTags()
      }
    } else {
      // create
      const { data } = await createTag(tag)
      closeDialog(data)
      if (data) await fetchTags()
    }
    onSucceeded()
  }

  // Delete tag
  const onDelete = async (type: string) => {
    if (type) {
      await fetchTags()
    }
  }

  // Edge Handler
  function openDialog(data?: CRMTag) {
    editDialogConfig.visible = true
    if (data) editDialogConfig.tag = data
  }

  function closeDialog(data?: CRMTag) {
    editDialogConfig.visible = false
    if (data) editDialogConfig.tag = data
  }

  function onSucceeded(title?: string, message?: string) {
    ElNotification({
      title: title || '成功',
      message: message || '操作成功',
      type: 'success'
    })
  }
  function onFailed(title?: string, message?: string) {
    ElNotification({
      title: title || '失败',
      message: message || '操作失败',
      type: 'error'
    })
  }
</script>

<style scoped></style>
