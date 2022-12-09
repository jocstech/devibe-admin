<script setup lang="ts">
import { RoleSelect } from './'

const props = defineProps<{
  user: SystemUser
  mode: String
}>()

const emit = defineEmits<{
  (e: 'update:user', user: SystemUser): void
}>()

// v-model object 双向绑定的秘密
const user = computed({
  get: () => props.user,
  set: value => emit('update:user', value),
})

const roles = computed({
  get: () => user.value.roles?.map(i => i._id),
  set: (_: string[]) =>
    (user.value.roles = _.map((_id) => {
      return { _id }
    })),
})

const formDefaultData = reactive({
  username: '',
  name: '',
})

const onRealNameChange = () => {
  user.value.name = `${user.value.first_name ?? ''} ${user.value.last_name ?? ''}`.trim()
}
</script>

<template>
  <div v-if="user">
    <ElForm :model="formDefaultData" label-width="100px">
      <ElFormItem label="Username">
        <ElInput v-model="user.username" placeholder="Input an unique username" />
      </ElFormItem>
      <ElFormItem label="Nickname">
        <ElInput v-model="user.nickname" placeholder="Input nickname" />
      </ElFormItem>
      <ElFormItem label="Real Name" @change="onRealNameChange">
        <el-row :gutter="20">
          <el-col :span="12">
            <ElInput v-model="user.first_name" placeholder="Input first name" />
          </el-col>
          <el-col :span="12">
            <ElInput v-model="user.last_name" placeholder="Input last name" />
          </el-col>
        </el-row>
      </ElFormItem>
      <ElFormItem label="Full Name">
        <ElInput v-model="user.name" placeholder="Input full name" />
      </ElFormItem>
      <ElFormItem label="Phone">
        <ElInput v-model="user.phone" placeholder="Input phone number" />
      </ElFormItem>
      <ElFormItem label="Email">
        <ElInput v-model="user.email" placeholder="Input email address" />
      </ElFormItem>
      <ElFormItem label="Security">
        <ElCheckbox v-model="user.verified">
          Verified
        </ElCheckbox>
        <ElCheckbox v-model="user.blocked">
          Blocked
        </ElCheckbox>
      </ElFormItem>
      <ElFormItem label="Roles">
        <RoleSelect v-model="roles" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped></style>
