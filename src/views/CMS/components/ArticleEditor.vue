<script setup lang="ts">
import { Delete, Edit, Link, Upload } from '@element-plus/icons-vue'
import { ArticleCover, TagsSelect } from './'

const props = defineProps<{
  article: CMSArticle
}>()

const emit = defineEmits<{
  (e: 'update:article', article: CMSArticle): void
  (e: 'save', article: CMSArticle): void
}>()

// const isEditing = computed(() => props.article.hasOwnProperty('_id'))
const isModified = ref(false)

// v-model object 双向绑定的秘密
const article = computed({
  get: () => props.article,
  set: value => emit('update:article', value),
})

const tags = computed({
  get: () => article.value.tags?.map(i => i._id),
  set: (tagsStr: string[]) =>
    (article.value.tags = tagsStr.map((_id) => {
      return { _id }
    })),
})

// 监听文章数据是否已经更新
watch(article, () => (isModified.value = true), { deep: true })

const doSave = () => {
  emit('save', article.value)
}

const doPublish = () => {
  delete article.value.published_at
}

const doDelete = () => {
  article.value = {}
}

const onUploadSuccess = (url: string) => {
  if (url)
    article.value.cover = url
}
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-2">
    <div class="editor-section flex flex-col gap-2 flex-1">
      <div class="title-section flex flex-col gap-2">
        <ElInput v-model="article.title" size="large" placeholder="请输入标题" />
        <ElInput v-model="article.subtitle" size="large" placeholder="请输入副标题" />
      </div>
      <div class="content-section">
        <Editor v-model:modelValue="article.content" editor-id="editor-1" height="600px" />
      </div>
    </div>
    <div class="side-section flex flex-col gap-2 flex-auto lg:max-w-sm">
      <div class="meta-section flex flex-col gap-2">
        <el-space direction="vertical" fill>
          <ElCard shadow="hover" :body-style="{ padding: '1rem' }">
            <span class="text-sm font-semibold true-gray-500">访问地址</span>
            <ElInput v-model="article.slug" placeholder="请输入文章访问地址" :prefix-icon="Link" />
          </ElCard>
          <ElCard shadow="hover" :body-style="{ padding: '1rem' }">
            <span class="text-sm font-semibold true-gray-500">
              文章封面图
            </span>
            <ArticleCover v-model:url="article.cover" @upload-success="onUploadSuccess" />
          </ElCard>
          <ElCard shadow="hover" :body-style="{ padding: '1rem' }">
            <span class="text-sm font-semibold true-gray-500">
              文章摘要
            </span>
            <ElInput
              v-model="article.excerpt"
              :rows="6"
              type="textarea"
              placeholder="Please input"
            />
          </ElCard>
          <ElCard shadow="hover" :body-style="{ padding: '1rem' }">
            <span class="text-sm font-semibold true-gray-500">
              文章标签
            </span>
            <TagsSelect v-model="tags" />
          </ElCard>
          <ElCard shadow="hover" :body-style="{ padding: '0' }">
            <div class="flex flex-row place-items-center px-4 py-1">
              <span class="text-sm font-semibold true-gray-500 mr-2">
                文章置顶
              </span>
              <ElSwitch v-model="article.pinned" />
            </div>
          </ElCard>
          <ElCard shadow="hover" :body-style="{ padding: '1rem' }">
            <ElButton size="large" type="success" :icon="Edit" @click="doSave">
              保存
            </ElButton>
            <ElButton size="large" type="primary" :icon="Upload" @click="doPublish">
              发布
            </ElButton>
            <ElButton size="large" type="danger" :icon="Delete" @click="doDelete">
              删除
            </ElButton>
          </ElCard>
        </el-space>
      </div>
    </div>
  </div>
</template>
