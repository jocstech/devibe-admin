<script setup lang="ts">
const props = defineProps<{
  roles: Nullable<SystemRole[]> | undefined
}>()

const emit = defineEmits<{
  (e: 'update:roles', roles: SystemRole[]): void
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
}>()

// v-model object 双向绑定的秘密
const roles = computed({
  get: () => props.roles,
  set: value => emit('update:roles', value ?? []),
})

const onEdit = (id: string) => emit('edit', id)
const onDelete = (id: string) => emit('delete', id)
</script>

<template>
  <el-table :data="roles" stripe class="w-full">
    <el-table-column :label="$t('common.icon')" width="70">
      <template #default="{ row }">
        <div class="flex items-center">
          <icon :icon="row.icon" />
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="name" :label="$t('common.name')" />
    <el-table-column prop="value" :label="$t('common.value')" />
    <el-table-column prop="description" :label="$t('common.description')" min-width="100px" />

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
