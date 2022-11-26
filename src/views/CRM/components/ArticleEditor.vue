<template>
  <div class="flex flex-col lg:flex-row gap-2">
    <div class="editor-section flex flex-col gap-2 flex-1">
      <div class="title-section flex flex-col gap-2">
        <el-input v-model="article.title" size="large" placeholder="请输入标题" />
        <el-input v-model="article.subtitle" size="large" placeholder="请输入副标题" />
      </div>
      <div class="content-section">
        <Editor v-model:modelValue="article.content" editorId="editor-1" height="600px" />
      </div>
    </div>
    <div class="side-section flex flex-col gap-2 flex-auto lg:max-w-sm">
      <div class="meta-section flex flex-col gap-2">
        <div class="bg-white border p-2">
          <div class="section-title">访问地址</div>
          <el-input v-model="article.slug" placeholder="请输入文章访问地址" />
        </div>
        <div class="bg-white border p-2">
          <div class="section-title">文章封面图</div>
          <img v-if="article.cover" :src="article.cover" :alt="article.title" />
        </div>
        <div class="bg-white border p-2">
          <div class="section-title">文章摘要</div>
          <el-input
            v-model="article.excerpt"
            :rows="4"
            type="textarea"
            placeholder="Please input"
          />
        </div>
        <div class="bg-white border p-2">
          <div class="section-title">文章标签</div>
          <tags-select v-model="tags" />
        </div>
      </div>
      <div class="actions">
        <div class="bg-white border p-2">
          <el-button size="large" type="success" :icon="Edit" @click="save">保存</el-button>
          <el-button size="large" type="primary" :icon="Upload" @click="publish">发布</el-button>
          <el-button size="large" type="danger" :icon="Delete" @click="recover">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ElInput, ElButton } from 'element-plus'
  import { Delete, Edit, Upload } from '@element-plus/icons-vue'
  import { Editor } from '@/components/Editor'
  import { ref, computed, watch } from 'vue'
  import { TagsSelect } from './'

  const props = defineProps<{
    article: CRMArticle
  }>()

  // const isEditing = computed(() => props.article.hasOwnProperty('_id'))
  const isModified = ref(false)

  const emit = defineEmits<{
    (e: 'update:article', article: CRMArticle): void
    (e: 'save', article: CRMArticle): void
  }>()

  // v-model object 双向绑定的秘密
  const article = computed({
    get: () => props.article,
    set: (value) => emit('update:article', value)
  })

  const tags = computed({
    get: () => article.value.tags?.map((i) => i._id),
    set: (tagsStr: string[]) =>
      (article.value.tags = tagsStr.map((_id) => {
        return { _id }
      }))
  })

  // 监听文章数据是否已经更新
  watch(article, () => (isModified.value = true), { deep: true })

  const save = () => {
    emit('save', article.value)
  }

  const publish = () => {
    delete article.value.published_at
  }

  const recover = () => {
    article.value = {}
  }
</script>

<style scoped>
  .section-title {
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
  }
</style>
