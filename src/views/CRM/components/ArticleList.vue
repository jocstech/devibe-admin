<template>
  <div class="p-2">
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
            <div class="info py-1 px-3 space-y-1">
              <div class="title font-sans text-2xl text-gray-800 font-semibold">
                <router-link :to="`/crm/articles/${article._id}`">
                  <h2> {{ article.title }}</h2>
                </router-link>
              </div>
              <div class="subtitle font-serif text-lg text-dark-200">
                <h3> {{ article.subtitle }}</h3>
              </div>
              <div class="excerpt">
                <p class="text-dark-100 leading-9">
                  {{ article.excerpt }}
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <div v-if="article.author" class="author">
                  <author-info :author="article.author as SystemUser" />
                </div>
                <div v-if="article.tags?.length" class="tags">
                  <tags-info :tags="article.tags as CRMTag[]" />
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
const props = defineProps<{
  articles: CRMArticle[]
}>()
console.log(props.articles)
</script>

<style scoped></style>
