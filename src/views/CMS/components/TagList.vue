<template>
  <div class="tags-list">
    <el-table v-if="tags" :data="tags" stripe style="width: 100%">
      <el-table-column fixed prop="icon" label="Icon" width="60" class-name="text-center">
        <template #default="scope">
          <Icon :icon="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column fixed prop="name" label="Name" min-width="100" />
      <el-table-column prop="slug" label="Slug" />
      <el-table-column prop="category" label="Category">
        <template #default="scope">
          <el-tag type="info" class="uppercase">
            {{ scope.row.category }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="visible" label="Visible" width="80">
        <template #default="scope">
          <Icon v-if="scope.row.visible" icon="ant-design:eye-outlined" />
          <Icon v-else icon="ant-design:eye-invisible-outlined" color="red" />
        </template>
      </el-table-column>
      <el-table-column prop="count" label="Count" width="80">
        <template #default="scope">
          <el-tag>
            {{ scope.row.count }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="onEdit(row._id)">Edit</el-button>
          <el-popconfirm title="确定删除？" @confirm="onDelete(row._id)">
            <template #reference>
              <el-button link type="danger" size="small">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
  import { ElTable, ElTableColumn, ElTag, ElButton, ElPopconfirm } from 'element-plus'

  defineProps<{ tags: CMSTag[] }>()

  const emit = defineEmits<{
    (e: 'edit', id: string): void
    (e: 'delete', id: string): void
  }>()

  const onEdit = (id: string) => emit('edit', id)
  const onDelete = (id: string) => emit('delete', id)
</script>

<style scoped></style>
