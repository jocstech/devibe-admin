<script lang="ts" setup>
import type { PropType } from 'vue'
import { UserForm } from './'
import { propTypes } from '@/utils/propTypes'

const props = defineProps({
  visible: propTypes.bool.def(false),
  user: {
    type: Object as PropType<SystemUser>,
    default: () => undefined,
  },
})

const emit = defineEmits<{
  (e: 'save', user: SystemUser): void
  (e: 'update:user', user: SystemUser): void
  (e: 'update:visible', visible: Boolean): void
}>()

const mode = computed(() => (props.user?._id ? 'edit' : 'create'))
const title = computed(() => (mode.value === 'edit' ? '修改用户信息' : '新建一个用户'))

// v-model object 双向绑定的秘密
const user = computed({
  get: () => props.user,
  set: (value: SystemUser) => emit('update:user', value),
})

const visible = computed({
  get: () => props.visible,
  set: value => emit('update:visible', value),
})

const onSave = () => {
  emit('save', user.value as SystemUser)
}
</script>

<template>
  <Dialog v-model="visible" :title="title" max-height="400px">
    <UserForm v-if="user" v-model:user="user" :mode="mode" />
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="visible = false">Cancel</ElButton>
        <ElButton type="primary" @click="onSave">
          {{ mode === 'edit' ? 'Update' : 'Create' }}
        </ElButton>
      </span>
    </template>
  </Dialog>
</template>
