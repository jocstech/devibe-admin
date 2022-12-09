<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { RoleEditDialog, RoleList } from './components'
import {
  createSystemRole,
  getSystemRoleById,
  getSystemRoles,
  updateSystemRoleById,
} from '@/api/system'

const roles = ref()
const dialogConfig = reactive({ visible: false, role: {} as SystemRole })

// data handler
const fetchRoles = async () => {
  const { data } = await getSystemRoles()
  roles.value = data
}

onMounted(async () => {
  await fetchRoles()
})

// Edge Handler
function openDialog(data?: SystemRole) {
  dialogConfig.visible = true
  if (data)
    dialogConfig.role = data
}

function closeDialog(data?: SystemRole) {
  dialogConfig.visible = false
  if (data)
    dialogConfig.role = data
}

// Callback actions
const onCreate = () => {
  openDialog({} as SystemRole)
}

// Update the tag
const onEdit = async (id: string) => {
  if (id) {
    const { data } = await getSystemRoleById(id)
    if (data)
      openDialog(data)
    else
      onFailed('服务端错误', '无法编辑该标签')
  }
}

// Save the new role
const onSave = async (role?: SystemRole) => {
  if (role?._id) {
    // update
    const { data } = await updateSystemRoleById(role._id, role)
    if (data?._id) {
      closeDialog(data)
      await fetchRoles()
    }
  }
  else {
    // create
    const { data } = await createSystemRole(role)
    closeDialog(data)
    if (data)
      await fetchRoles()
  }
  onSucceeded()
}

// Delete tag
const onDelete = async (type: string) => {
  if (type)
    await fetchRoles()
}

// Result handler
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
  <ContentWrap title="角色管理" message="角色管理" :body-style="{ padding: 0 }">
    <template #actions>
      <el-button @click="onCreate">
        添加新角色
      </el-button>
    </template>
    <RoleList v-if="roles" v-model:roles="roles" @edit="onEdit" @delete="onDelete" />
  </ContentWrap>
  <RoleEditDialog v-model:visible="dialogConfig.visible" :role="dialogConfig.role" @save="onSave" />
</template>

<style scoped>

</style>
