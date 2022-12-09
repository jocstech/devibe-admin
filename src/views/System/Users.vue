<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { UserEditDialog, UserList } from './components'
import {
  createSystemUser,
  getSystemUserById,
  getSystemUsers,
  updateSystemUserById,
} from '@/api/system'

const users = ref()
const dialogConfig = reactive({ visible: false, user: {} as SystemUser })

// data handler
const fetchUsers = async () => {
  const { data } = await getSystemUsers()
  users.value = data
}

onMounted(async () => {
  await fetchUsers()
})

// Edge Handler
function openDialog(data?: SystemUser) {
  dialogConfig.visible = true
  if (data)
    dialogConfig.user = data
}

function closeDialog(data?: SystemUser) {
  dialogConfig.visible = false
  if (data)
    dialogConfig.user = data
}

// Callback actions
const onCreate = () => {
  openDialog({ } as SystemUser)
}

// Update the tag
const onEdit = async (id: string) => {
  if (id) {
    const { data } = await getSystemUserById(id)
    if (data)
      openDialog(data)
    else
      onFailed('服务端错误', '无法编辑该标签')
  }
}

// Save the new user
const onSave = async (user?: SystemUser) => {
  if (user?._id) {
    // update
    const { data } = await updateSystemUserById(user._id, user)
    if (data?._id) {
      closeDialog(data)
      await fetchUsers()
    }
  }
  else {
    // create
    const { data } = await createSystemUser(user)
    closeDialog(data)
    if (data)
      await fetchUsers()
  }
  onSucceeded()
}

// Delete tag
const onDelete = async (type: string) => {
  if (type)
    await fetchUsers()
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
  <ContentWrap title="用户管理" message="用户管理" :body-style="{ padding: 0 }">
    <template #actions>
      <el-button @click="onCreate">
        添加新用户
      </el-button>
    </template>
    <UserList v-if="users" v-model:users="users" @edit="onEdit" @delete="onDelete" />
  </ContentWrap>
  <UserEditDialog
    v-model:visible="dialogConfig.visible"
    :user="dialogConfig.user"
    @save="onSave"
  />
</template>

<style scoped>

</style>
