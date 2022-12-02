<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
const emit = defineEmits<{
  (e: 'onUploadSuccess', url: string): void
}>()

const onUploadSuccess: UploadProps['onSuccess'] = (response: IResponse<any>) => {
  if (response.code === 0)
    emit('onUploadSuccess', response.data.url)
}
</script>

<template>
  <el-upload
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
