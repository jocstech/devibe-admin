<script setup lang="ts">
import { ElTag } from 'element-plus'
defineProps<{
  tags: CMSTag[]
}>()
</script>

<template>
  <span v-if="tags" class="space-x-1">
    <ElTag v-for="tag of tags" :key="tag._id">{{ tag.name }} </ElTag>
  </span>
</template>

<style scoped></style>
