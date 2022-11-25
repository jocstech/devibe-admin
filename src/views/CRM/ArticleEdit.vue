<template>
  <div>
    <h1 class="text-2xl">{{ article.title }}</h1>
    <br />
    <article-editor v-model:article="article" @save="onSave" />
  </div>
</template>

<script setup lang="ts">
  import { ArticleEditor } from './components'
  import { getArticleById, updateArticleById } from '@/api/crm'
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  const { currentRoute, push } = useRouter()

  const article = ref({} as CRMArticle)

  onMounted(async () => {
    try {
      const { data } = await getArticleById(currentRoute.value.params.id as string)
      article.value = data
    } catch (error) {
      push('/crm')
    }
  })

  const onSave = async (updatedArticle: CRMArticle) => {
    if (updatedArticle) {
      const { type, data } = await updateArticleById(updatedArticle._id as string, updatedArticle)
      if (type === 'success') {
        ElMessage({ type: 'success', message: '成功更新' })
        article.value = data
      } else {
        ElMessage({ type: 'error', message: '成功失败' })
      }
    }
  }
</script>

<style scoped></style>
