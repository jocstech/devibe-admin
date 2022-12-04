<script setup lang="ts">
import { getRolesList } from '@/api/system'

const roles = ref<SystemRole[]>()

const fetchRolesList = async () => {
  const { data } = await getRolesList()
  if (data)
    roles.value = data
}

onMounted(async () => {
  await fetchRolesList()
})
</script>

<template>
  <ElSelect v-bind="$attrs" multiple clearable class="w-full" placeholder="Select Role">
    <ElOption v-for="role in roles" :key="role._id" :value="role._id" :label="role.name">
      {{ role.name }}
    </ElOption>
  </ElSelect>
</template>
