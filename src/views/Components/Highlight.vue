<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { Highlight } from '@/components/Highlight'

const { t } = useI18n()

const keyClick = (key: string) => {
  ElMessage.info(key)
}
</script>

<template>
  <ContentWrap :title="t('highlightDemo.highlight')">
    <Highlight :keys="[t('highlightDemo.keys1'), t('highlightDemo.keys2')]" @click="keyClick">
      {{ t('highlightDemo.message') }}
    </Highlight>
  </ContentWrap>
</template>
