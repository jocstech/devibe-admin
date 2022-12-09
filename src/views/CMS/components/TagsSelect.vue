<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElOption, ElSelect } from 'element-plus'
import { getTagsList } from '@/api/cms'

const tags = ref<CMSTag[]>()

const fetchTagsList = async () => {
  const { data } = await getTagsList()
  if (data)
    tags.value = data
}

onMounted(async () => {
  await fetchTagsList()
})
</script>

<template>
  <ElSelect v-bind="$attrs" multiple clearable placeholder="Select Tag">
    <ElOption v-for="tag in tags" :key="tag._id" :value="tag._id as any" :label="tag.name">
      {{ tag.name }}
    </ElOption>
  </ElSelect>
</template>

<style scoped></style>
