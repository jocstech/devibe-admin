<script setup lang="ts">
import { AuthorInfo, TagsInfo } from './'
defineProps<{
  articles: CMSArticle[]
}>()
const articleHook = useArticle()

const size = ref(5)
const spacer = h(ElDivider, { direction: 'vertical' })
</script>

<template>
  <div class="p-0">
    <div v-if="articles.length" class="article-list">
      <ul>
        <li
          v-for="article of articles"
          :key="article._id"
          class="bg-white even:bg-light-100 rounded"
        >
          <div class="flex">
            <div class="cover">
              <ElImage class="w-60 rounded m-1" :src="article.cover" fit="cover" />
            </div>
            <div class="info flex flex-col py-1 px-3 space-y-1 overflow-auto">
              <div class="title font-sans text-2xl text-gray-800 font-semibold hover:text-blue-500">
                <router-link :to="`/cms/articles/${article._id}`">
                  <h2 class="truncate">
                    {{ article.title }}
                  </h2>
                </router-link>
              </div>
              <div class="subtitle font-sans text-lg text-dark-200 italic">
                <h3 class="truncate">
                  {{ article.subtitle }}
                </h3>
              </div>
              <div class="excerpt flex-1">
                <p class="text-md text-dark-50 leading-7">
                  {{ article.excerpt }}
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <div v-if="article.author" class="author">
                  <AuthorInfo :author="article.author as SystemUser" />
                </div>
                <div v-if="article.tags?.length" class="tags flex-auto">
                  <TagsInfo :tags="article.tags as CMSTag[]" />
                </div>
                <div class="actions text-sm">
                  <el-space :size="size" :spacer="spacer">
                    <ElButton size="small" type="primary" link @click="articleHook.onEdit(article._id as string)">
                      编辑
                    </ElButton><ElButton size="small" link @click="articleHook.onUnpublish(article._id as string)">
                      下架
                    </ElButton>
                    <ElButton size="small" type="danger" link @click="articleHook.onDelete(article._id as string)">
                      删除
                    </ElButton>
                  </el-space>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
