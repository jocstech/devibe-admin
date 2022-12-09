<script lang="ts" setup>
import type { PropType } from 'vue'
import { RoleForm } from '.'
import { propTypes } from '@/utils/propTypes'

const props = defineProps({
  visible: propTypes.bool.def(false),
  role: {
    type: Object as PropType<SystemRole>,
    default: () => undefined,
  },
})

const emit = defineEmits<{
  (e: 'save', role: SystemRole): void
  (e: 'update:role', role: SystemRole): void
  (e: 'update:visible', visible: Boolean): void
}>()

const mode = computed(() => (props.role?._id ? 'edit' : 'create'))
const title = computed(() => (mode.value === 'edit' ? '修改用户信息' : '新建一个用户'))

// v-model object 双向绑定的秘密
const role = computed({
  get: () => props.role,
  set: (value: SystemRole) => emit('update:role', value),
})

const visible = computed({
  get: () => props.visible,
  set: value => emit('update:visible', value),
})

const onSave = () => {
  emit('save', role.value as SystemRole)
}
</script>

<template>
  <Dialog v-model="visible" :title="title" max-height="400px">
    <RoleForm v-if="role" v-model:role="role" :mode="mode" />
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
