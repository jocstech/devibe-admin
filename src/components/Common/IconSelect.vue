<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
const props = defineProps({
  icon: {
    type: String,
    default: 'mdi:question-mark-circle-outline',
    required: false,
  },
})

const emit = defineEmits<{
  (e: 'update:icon', value: string | undefined): void
}>()

const DEFAULT_ICON = 'mdi:question-mark-circle-outline'

// const ICONIFY_API = 'https://api.iconify.design/collections'
const ICONIFY_SEARCH_API = 'https://api.iconify.design/search?query='

// v-model object 双向绑定的秘密
const icon = computed({
  get: () => props.icon,
  set: value => emit('update:icon', value || undefined),
})

interface ListItem {
  label: string
  value: string
}

const options = ref<ListItem[]>([])
const loading = ref(false)

const debounceSearch = useDebounceFn((query: string) => {
  fetch(`${ICONIFY_SEARCH_API}${query.trim().toLowerCase()}`).then(_ => _.json()).then((data) => {
    options.value = data.icons.map(icon => ({ label: icon, value: icon }))
    loading.value = false
  })
}, 200)

const searchIcon = (query: string) => {
  if (query !== '') {
    loading.value = true
    debounceSearch(query)
  }
  else {
    options.value = []
    loading.value = false
  }
}
</script>

<template>
  <Suspense v-if="options">
    <div class="flex gap-2 w-full">
      <Icon v-show="icon" :icon="icon || DEFAULT_ICON" :size="28" />
      <ElSelectV2
        v-model="icon" clearable filterable remote :remote-method="searchIcon" :options="options" :loading="loading"
        placeholder="Search Icon" autocomplete class="w-full transition"
      >
        <template #default="{ item }">
          <div class="flex items-center">
            <Icon :icon="item.value" :size="25" />
            <span class="ml-2 text-true-gray-700">{{ item.label }}</span>
          </div>
        </template>
      </ElSelectV2>
    </div>
  </Suspense>
</template>

<style scoped>

</style>
