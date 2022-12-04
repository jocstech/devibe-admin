<script setup lang="ts">
import { ArticleList } from './components'
import { getArticles } from '@/api/cms'

const articleHook = useArticle()
const articles = ref()

onMounted(async () => {
  const { data } = await getArticles()
  articles.value = data
})
</script>

<template>
  <ContentWrap title="文章管理" :body-style="{ padding: '0.5rem' }">
    <template #actions>
      <el-button type="primary" @click="articleHook.onCreate">
        添加新文章
      </el-button>
    </template>
    <ArticleList v-if="articles" :articles="articles" />
  </ContentWrap>
</template>

<style scoped></style>
