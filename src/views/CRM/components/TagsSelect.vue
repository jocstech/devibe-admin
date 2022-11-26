<template>
  <el-select v-bind="$attrs" multiple clearable class="m-2" placeholder="Select Tag">
    <el-option v-for="tag in tags" :key="tag._id" :value="tag._id" :label="tag.name">
      {{ tag.name }}
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { getTagsList } from '@/api/crm'
  import { ElSelect, ElOption } from 'element-plus'

  const tags = ref<CRMTag[]>()

  const fetchTagsList = async () => {
    const { data } = await getTagsList()
    if (data) tags.value = data
  }

  onMounted(async () => {
    await fetchTagsList()
  })
</script>

<style scoped></style>
