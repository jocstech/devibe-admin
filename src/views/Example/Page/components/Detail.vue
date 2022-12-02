<script setup lang="ts">
import type { PropType } from 'vue'
import { reactive } from 'vue'
import { ElTag } from 'element-plus'
import type { TableData } from '@/api/table/types'
import { Descriptions } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import type { DescriptionsSchema } from '@/types/descriptions'

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null,
  },
})

const { t } = useI18n()

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'title',
    label: t('exampleDemo.title'),
    span: 24,
  },
  {
    field: 'author',
    label: t('exampleDemo.author'),
  },
  {
    field: 'display_time',
    label: t('exampleDemo.displayTime'),
  },
  {
    field: 'importance',
    label: t('exampleDemo.importance'),
  },
  {
    field: 'pageviews',
    label: t('exampleDemo.pageviews'),
  },
  {
    field: 'content',
    label: t('exampleDemo.content'),
    span: 24,
  },
])
</script>

<template>
  <Descriptions :schema="schema" :data="currentRow || {}">
    <template #importance="{ row }: { row: TableData }">
      <ElTag :type="row.importance === 1 ? 'success' : row.importance === 2 ? 'warning' : 'danger'">
        {{
          row.importance === 1
            ? t('tableDemo.important')
            : row.importance === 2
              ? t('tableDemo.good')
              : t('tableDemo.commonly')
        }}
      </ElTag>
    </template>

    <template #content="{ row }: { row: TableData }">
      <div v-html="row.content" />
    </template>
  </Descriptions>
</template>
