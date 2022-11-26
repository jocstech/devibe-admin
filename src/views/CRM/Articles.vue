<template>
  <ContentWrap :title="`文章管理（一共${count}篇文章）`">
    <article-list v-if="articles" :articles="articles" />
  </ContentWrap>
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
