<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const props = defineProps<{
  url: Nullable<string> | undefined
}>()

const emit = defineEmits<{
  (e: 'update:url', url: string): void
  (e: 'uploadSuccess', url: string): void
}>()

// v-model object 双向绑定的秘密
const url = computed({
  get: () => props.url,
  set: value => emit('update:url', value ?? ''),
})

const onUploadSuccess: UploadProps['onSuccess'] = (response: IResponse<any>) => {
  if (response.code === 0)
    emit('uploadSuccess', response.data.url)
}
</script>

<template>
  <div v-if="url" class="relative">
    <img :src="url" alt="Cover Setter" class="rounded">
    <div class="absolute w-full h-full left-0 top-0 bg-dark-50 bg-opacity-30 flex justify-center items-center opacity-0 hover:opacity-100 transition">
      <ElButton plain @click="(url = null)">
        更换封面
      </ElButton>
    </div>
  </div>
  <el-upload
    v-else
    class="upload-demo"
    action="https://api.devibe.cn/v1/resource/upload"
    drag
    :on-success="onUploadSuccess"
  >
    <el-icon class="el-icon--upload">
      <UploadFilled />
    </el-icon>
    <div class="el-upload__text">
      {{ $t('cms.coverUpload.dropFileHere') }}
      {{ $t('cms.coverUpload.or') }}
      <em> {{ $t('cms.coverUpload.clickToUpload') }}</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<style scoped>

</style>
