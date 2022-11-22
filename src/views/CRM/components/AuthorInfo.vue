<template>
  <div v-if="author" class="flex place-content-center space-x-1">
    <el-avatar :size="25" :src="author.avatar" />
    <span class="text-gray-600 font-light">{{ author.nickname }}</span>
  </div>
</template>

<script setup lang="ts">
import { ElAvatar } from 'element-plus'

defineProps<{
  author: SystemUser
}>()
</script>

<style scoped></style>
