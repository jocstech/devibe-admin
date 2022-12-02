<script lang="ts" setup>
import { ElButton, ElPopconfirm, ElTable, ElTableColumn, ElTag } from 'element-plus'

defineProps<{ tags: CMSTag[] }>()

const emit = defineEmits<{
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
}>()

const onEdit = (id: string) => emit('edit', id)
const onDelete = (id: string) => emit('delete', id)
</script>

<template>
  <div class="tags-list">
    <ElTable v-if="tags" :data="tags" stripe style="width: 100%">
      <ElTableColumn fixed prop="icon" label="Icon" width="60" class-name="text-center">
        <template #default="scope">
          <Icon :icon="scope.row.icon" />
        </template>
      </ElTableColumn>
      <ElTableColumn fixed prop="name" label="Name" min-width="100" />
      <ElTableColumn prop="slug" label="Slug" />
      <ElTableColumn prop="category" label="Category">
        <template #default="scope">
          <ElTag type="info" class="uppercase">
            {{ scope.row.category }}
          </ElTag>
        </template>
      </ElTableColumn>

      <ElTableColumn prop="visible" label="Visible" width="80">
        <template #default="scope">
          <Icon v-if="scope.row.visible" icon="ant-design:eye-outlined" />
          <Icon v-else icon="ant-design:eye-invisible-outlined" color="red" />
        </template>
      </ElTableColumn>
      <ElTableColumn prop="count" label="Count" width="80">
        <template #default="scope">
          <ElTag>
            {{ scope.row.count }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn fixed="right" label="Operations" width="120">
        <template #default="{ row }">
          <ElButton link type="primary" size="small" @click="onEdit(row._id)">
            Edit
          </ElButton>
          <ElPopconfirm title="确定删除？" @confirm="onDelete(row._id)">
            <template #reference>
              <ElButton link type="danger" size="small">
                Delete
              </ElButton>
            </template>
          </ElPopconfirm>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<style scoped></style>
