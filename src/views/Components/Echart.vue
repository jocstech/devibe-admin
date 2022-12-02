<script setup lang="ts">
import { ElCard, ElCol, ElRow } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { barOptions, lineOptions, pieOptions, wordOptions } from '@/views/Dashboard/echarts-data'
import { Echart } from '@/components/Echart'

const { t } = useI18n()
</script>

<template>
  <ContentWrap :title="t('echartDemo.echart')" :message="t('echartDemo.echartDes')">
    <ElRow :gutter="20" justify="space-between">
      <ElCol :xl="10" :lg="10" :md="24" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-20px">
          <Echart :options="pieOptions" :height="300" />
        </ElCard>
      </ElCol>
      <ElCol :xl="14" :lg="14" :md="24" :sm="24" :xs="24">
        <ElCard shadow="hover" class="mb-20px">
          <Echart :options="barOptions" :height="300" />
        </ElCard>
      </ElCol>
      <ElCol :span="24">
        <ElCard shadow="hover" class="mb-20px">
          <Echart :options="lineOptions" :height="350" />
        </ElCard>
      </ElCol>
      <ElCol :span="24">
        <ElCard shadow="hover" class="mb-20px">
          <Echart :options="wordOptions" :height="300" />
        </ElCard>
      </ElCol>
    </ElRow>
  </ContentWrap>
</template>
