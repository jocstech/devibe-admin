<template>
  {{ mode }}
  <div v-if="tag">
    {{ tag }}
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    tag: CRMTag
  }>()

  const emit = defineEmits<{
    (e: 'update:tag', tag: CRMTag): void
  }>()

  // v-model object 双向绑定的秘密
  const tag = computed({
    get: () => props.tag,
    set: (value) => emit('update:tag', value)
  })

  const mode = computed(() => (props.tag._id ? 'edit' : 'create'))
</script>

<style scoped></style>
