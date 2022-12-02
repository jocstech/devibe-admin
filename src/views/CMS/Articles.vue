<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ArticleList } from './components'
import { getArticles } from '@/api/cms'

const articles = ref()
const count = computed(() => articles.value?.length ?? 0)

onMounted(async () => {
  const { data } = await getArticles()
  articles.value = data
})
</script>

<template>
  <ContentWrap :title="`文章管理（一共${count}篇文章）`">
    <ArticleList v-if="articles" :articles="articles" />
  </ContentWrap>
</template>

<style scoped></style>
