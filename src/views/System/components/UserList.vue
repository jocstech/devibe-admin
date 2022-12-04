<script setup lang="ts">
const props = defineProps<{
  users: Nullable<SystemUser[]> | undefined
}>()

const emit = defineEmits<{
  (e: 'update:users', users: SystemUser[]): void
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
}>()

// v-model object 双向绑定的秘密
const users = computed({
  get: () => props.users,
  set: value => emit('update:users', value ?? []),
})

const onEdit = (id: string) => emit('edit', id)
const onDelete = (id: string) => emit('delete', id)
</script>

<template>
  <el-table :data="users" stripe class="w-full">
    <el-table-column :label="$t('common.avatar')" width="70">
      <template #default="scope">
        <div class="flex items-center">
          <el-avatar :src="scope.row.avatar" />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="name" :label="$t('common.name')" />
    <el-table-column prop="username" :label="$t('common.username')" />
    <el-table-column prop="email" :label="$t('common.email')" />
    <el-table-column :label="$t('common.phone')">
      <template #default="scope">
        {{ String(scope.row.phone).replace(/^(.{3})(.*)(.{4})/, '$1-$2-$3') }}
      </template>
    </el-table-column>
    <el-table-column :label="$t('common.roles')">
      <template #default="scope">
        <div class="flex items-center space-x-1">
          <ElTag v-for="role in scope.row.roles" :key="role._id" size="small">
            {{ role.name }}
          </ElTag>
        </div>
      </template>
    </el-table-column>
    <el-table-column fixed="right" :label="$t('system.operations')" width="120">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="onEdit(row._id)">
          编辑
        </el-button>
        <el-button link type="danger" size="small" @click="onDelete(row._id)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
