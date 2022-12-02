<script setup lang="ts">
import type { PropType } from 'vue'
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
  detailSchema: {
    type: Array as PropType<DescriptionsSchema[]>,
    default: () => [],
  },
})

const { t } = useI18n()
</script>

<template>
  <Descriptions :schema="detailSchema" :data="currentRow || {}">
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
