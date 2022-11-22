<template>
  <span class="space-x-1">
    <el-tag v-for="tag of tags" :key="tag._id">{{ tag.name }} </el-tag>
  </span>
</template>

<script setup lang="ts">
import { ElTag } from 'element-plus'
defineProps<{
  tags: CRMTag[]
}>()
</script>

<style scoped></style>
