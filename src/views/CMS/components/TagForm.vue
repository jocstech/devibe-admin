<script setup lang="ts">
const props = defineProps<{
  tag: CMSTag
}>()

const emit = defineEmits<{
  (e: 'update:tag', tag: CMSTag): void
}>()

// v-model object 双向绑定的秘密
const tag = computed({
  get: () => props.tag,
  set: value => emit('update:tag', value),
})
</script>

<template>
  <div v-if="tag">
    <ElForm :model="tag" label-width="100px">
      <ElFormItem label="Category">
        <ElRadioGroup v-model="tag.category">
          <ElRadioButton label="all">
            All
          </ElRadioButton>
          <ElRadioButton label="cms">
            CMS
          </ElRadioButton>
          <ElRadioButton label="resource">
            Resource
          </ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="Slug">
        <ElInput v-model="tag.slug" />
      </ElFormItem>
      <ElFormItem label="Name">
        <ElInput v-model="tag.name" />
      </ElFormItem>
      <ElFormItem label="Icon">
        <IconSelect v-model:icon="tag.icon" />
      </ElFormItem>
      <ElFormItem label="Description">
        <ElInput v-model="tag.description" type="textarea" :rows="4" />
      </ElFormItem>
      <ElFormItem label="Visible">
        <ElSwitch v-model="tag.visible" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped></style>
