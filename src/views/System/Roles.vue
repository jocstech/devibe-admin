<script setup lang="ts">
import { getSystemRoles } from '@/api/system'
const roles = ref()

const fetchData = async () => {
  const { data } = await getSystemRoles()
  roles.value = data
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div class="roles-view">
    <ContentWrap title="角色管理" message="角色管理">
      <div class="text-xl">
        {{ roles }}
      </div>
    </ContentWrap>
  </div>
</template>

<style scoped>

</style>
