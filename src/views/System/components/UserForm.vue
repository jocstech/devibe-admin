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
</script>

<template>
  <div v-if="user">
    <ElForm :model="formDefaultData" label-width="100px">
      <ElFormItem label="Username">
        <ElInput v-model="user.username" />
      </ElFormItem>
      <ElFormItem label="Nickname">
        <ElInput v-model="user.nickname" />
      </ElFormItem>
      <ElFormItem label="Name">
        <ElInput v-model="user.name" />
      </ElFormItem>
      <ElFormItem label="First Name">
        <ElInput v-model="user.first_name" />
      </ElFormItem>
      <ElFormItem label="Last Name">
        <ElInput v-model="user.last_name" />
      </ElFormItem>
      <ElFormItem label="Phone">
        <ElInput v-model="user.phone" />
      </ElFormItem>
      <ElFormItem label="Email">
        <ElInput v-model="user.email" />
      </ElFormItem>
      <ElFormItem label="Roles">
        <RoleSelect v-model="roles" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped></style>
