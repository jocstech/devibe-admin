<script setup lang="ts">
const props = defineProps<{
  role: SystemRole
  mode: String
}>()

const emit = defineEmits<{
  (e: 'update:role', role: SystemRole): void
}>()

const DEFAULT_ICON = 'mdi:question-mark-circle-outline'

// v-model object 双向绑定的秘密
const role = computed({
  get: () => props.role,
  set: value => emit('update:role', value),
})

const formDefaultData = reactive({
  icon: DEFAULT_ICON,
  name: '',
  value: '',
})
</script>

<template>
  <div v-if="role">
    <ElForm :model="formDefaultData" label-width="100px">
      <ElFormItem :label="$t('common.icon')">
        <IconSelect v-model:icon="role.icon" />
      </ElFormItem>
      <ElFormItem :label="$t('common.name')">
        <ElInput v-model="role.name" />
      </ElFormItem>
      <ElFormItem :label="$t('common.value')">
        <ElInput v-model="role.value" />
      </ElFormItem>
      <ElFormItem :label="$t('common.description')">
        <ElInput v-model="role.description" :rows="5" type="textarea" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped></style>
