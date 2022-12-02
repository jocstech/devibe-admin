<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArticleEditor } from './components'
import { createArticle } from '@/api/cms'

const { push } = useRouter()

let article = reactive<CMSArticle>({ title: '无标题' })

const onSave = async () => {
  if (article) {
    const { type, data } = await createArticle(article)
    if (type === 'success') {
      ElMessage.success('成功创建')
      article = data
      push('/cms/articles')
    }
    else {
      ElMessage.error('创建失败')
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
