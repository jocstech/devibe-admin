<template>
  <div class="p-0">
    <div class="article-list" v-if="articles.length">
      <ul>
        <li
          class="bg-white even:bg-light-100 rounded"
          v-for="article of articles"
          :key="article._id"
        >
          <div class="flex">
            <div class="cover">
              <el-image class="w-60 rounded m-1" :src="article.cover" fit="cover" />
            </div>
            <div class="info flex flex-col py-1 px-3 space-y-1">
              <div class="title font-sans text-2xl text-gray-800 font-semibold hover:text-blue-500">
                <router-link :to="`/cms/articles/${article._id}`">
                  <h2> {{ article.title }}</h2>
                </router-link>
              </div>
              <div class="subtitle font-sans text-lg text-dark-200">
                <h3> {{ article.subtitle }}</h3>
              </div>
              <div class="excerpt flex-1">
                <p class="text-dark-100 leading-7">
                  {{ article.excerpt }}
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <div v-if="article.author" class="author">
                  <author-info :author="article.author as SystemUser" />
                </div>
                <div v-if="article.tags?.length" class="tags">
                  <tags-info :tags="article.tags as CMSTag[]" />
                </div>
                <div class="actions text-sm">
                  <button>编辑</button> | <button>下架</button> | <button>删除</button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { AuthorInfo, TagsInfo } from './'
  import { ElImage } from 'element-plus'
  defineProps<{
    articles: CMSArticle[]
  }>()
</script>

<style scoped></style>
