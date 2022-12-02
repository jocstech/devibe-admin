<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { TagList } from './components'
import { getTags } from '@/api/cms'

const tags = ref()
const count = computed(() => tags.value?.length ?? 0)

onMounted(async () => {
  const { data } = await getTags()
  tags.value = data
})
</script>

<template>
  <div>
    <h1>标签管理（一共{{ count }}个标签）</h1>
    <div v-if="tags">
      <TagList :tags="tags" />
    </div>
  </div>
</template>

<style scoped></style>
