<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Error } from '@/components/Error'
import { usePermissionStore } from '@/store/modules/permission'

const { push } = useRouter()

const permissionStore = usePermissionStore()

const errorClick = () => {
  push(permissionStore.addRouters[0]?.path as string)
}
</script>

<template>
  <Error @error-click="errorClick" />
</template>
