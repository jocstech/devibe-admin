<script lang="ts" setup>
import { ElAvatar } from 'element-plus'

defineProps<{
  author: SystemUser
}>()
</script>

<template>
  <div v-if="author" class="flex place-content-center space-x-1">
    <template v-if="typeof author !== 'string'">
      <ElAvatar :size="20" :src="author.avatar" />
      <span class="text-gray-600 font-light text-sm">{{ author.nickname }}</span>
    </template>
  </div>
</template>

<style scoped></style>
