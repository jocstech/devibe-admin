<template>
  <div>
    <h1>文章管理（一共{{ count }}篇文章）</h1>
    <div v-if="articles">
      <article-list :articles="articles" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticles } from '@/api/crm'
import { onMounted, ref, computed } from 'vue'
import { ArticleList } from './components'

const articles = ref()
const count = computed(() => articles.value?.length ?? 0)

onMounted(async () => {
  const { data } = await getArticles()
  articles.value = data
})
</script>

<style scoped></style>
