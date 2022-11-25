<template>
  <div>
    <h1>标签管理（一共{{ count }}个标签）</h1>
    <div v-if="tags">
      <tag-list :tags="tags" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getTags } from '@/api/crm'
  import { onMounted, ref, computed } from 'vue'
  import { TagList } from './components'

  const tags = ref()
  const count = computed(() => tags.value?.length ?? 0)

  onMounted(async () => {
    const { data } = await getTags()
    tags.value = data
  })
</script>

<style scoped></style>
