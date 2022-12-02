<script setup lang="ts">
import { computed, reactive } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElSwitch,
} from 'element-plus'
import { icons } from '../data'

const props = defineProps<{
  tag: CMSTag
  mode: String
}>()

const emit = defineEmits<{
  (e: 'update:tag', tag: CMSTag): void
}>()

// v-model object 双向绑定的秘密
const tag = computed({
  get: () => props.tag,
  set: value => emit('update:tag', value),
})

const formDefaultData = reactive({
  slug: '',
  name: '',
  icon: '',
  cover: '',
  category: 'all',
  visible: true,
})
</script>

<template>
  <div v-if="tag">
    <ElForm :model="formDefaultData" label-width="100px">
      <ElFormItem label="Slug">
        <ElInput v-model="tag.slug" />
      </ElFormItem>
      <ElFormItem label="Name">
        <ElInput v-model="tag.name" />
      </ElFormItem>
      <ElFormItem label="Icon">
        <ElSelect v-model="tag.icon" placeholder="Select Icon">
          <ElOption
            v-for="icon in icons"
            :key="icon.value"
            :value="icon.value"
            :label="icon.label"
          >
            <div class="flex place-items-center gap-1">
              <Icon :icon="icon.value" /> <span>{{ icon.label }}</span>
            </div>
          </ElOption>
        </ElSelect>
        <span class="w-2" />
        <Icon v-if="tag.icon" :icon="tag.icon" />
      </ElFormItem>
      <ElFormItem label="Description">
        <ElInput v-model="tag.description" type="textarea" :rows="4" />
      </ElFormItem>
      <ElFormItem label="Visible">
        <ElSwitch v-model="tag.visible" />
      </ElFormItem>
      <ElFormItem label="Category">
        <ElRadioGroup v-model="tag.category">
          <ElRadio label="all" size="large">
            All
          </ElRadio>
          <ElRadio label="cms" size="large">
            CMS
          </ElRadio>
          <ElRadio label="resource" size="large">
            Resource
          </ElRadio>
        </ElRadioGroup>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped></style>
