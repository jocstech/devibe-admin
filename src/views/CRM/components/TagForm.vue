<template>
  <div v-if="tag">
    <el-form :model="formDefaultData" label-width="100px">
      <el-form-item label="Slug">
        <el-input v-model="tag.slug" />
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="tag.name" />
      </el-form-item>
      <el-form-item label="Icon">
        <el-select v-model="tag.icon" placeholder="Select Icon">
          <el-option
            v-for="icon in icons"
            :key="icon.value"
            :value="icon.value"
            :label="icon.label"
          >
            <div class="flex place-items-center gap-1">
              <Icon :icon="icon.value" /> <span>{{ icon.label }}</span>
            </div>
          </el-option>
        </el-select>
        <span class="w-2"></span>
        <Icon v-if="tag.icon" :icon="tag.icon" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="tag.description" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item label="Visible">
        <el-switch v-model="tag.visible" />
      </el-form-item>
      <el-form-item label="Category">
        <el-radio-group v-model="tag.category">
          <el-radio label="all" size="large">All</el-radio>
          <el-radio label="crm" size="large">CRM</el-radio>
          <el-radio label="resource" size="large">Resource</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { icons } from '../data'
  import { reactive, computed } from 'vue'
  import {
    ElForm,
    ElFormItem,
    ElInput,
    ElSwitch,
    ElRadioGroup,
    ElRadio,
    ElSelect,
    ElOption
  } from 'element-plus'

  const props = defineProps<{
    tag: CRMTag
    mode: String
  }>()

  const emit = defineEmits<{
    (e: 'update:tag', tag: CRMTag): void
  }>()

  // v-model object 双向绑定的秘密
  const tag = computed({
    get: () => props.tag,
    set: (value) => emit('update:tag', value)
  })

  const formDefaultData = reactive({
    slug: '',
    name: '',
    icon: '',
    cover: '',
    category: 'all',
    visible: true
  })
</script>

<style scoped></style>
