<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArticleEditor } from './components'
import { getArticleById, updateArticleById } from '@/api/cms'
import { ContentDetailWrap } from '@/components/ContentDetailWrap'
const { currentRoute, push } = useRouter()

const article = ref({} as CMSArticle)

onMounted(async () => {
  try {
    const { data } = await getArticleById(currentRoute.value.params.id as string)
    article.value = data
  }
  catch (error) {
    push('/cms')
  }
})

const onSave = async (updatedArticle: CMSArticle) => {
  if (updatedArticle) {
    const { type, data } = await updateArticleById(updatedArticle._id as string, updatedArticle)
    if (type === 'success') {
      ElMessage({ type: 'success', message: '成功更新' })
      article.value = data
    }
    else {
      ElMessage({ type: 'error', message: '成功失败' })
    }
  }
}
</script>

<template>
  <ContentDetailWrap :title="article.title" @back="$router.push('/cms/articles')">
    <ArticleEditor v-model:article="article" @save="onSave" />
  </ContentDetailWrap>
</template>

<style scoped></style>
