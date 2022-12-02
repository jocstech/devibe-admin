<script setup lang="ts">
import type { IDomEditor } from '@wangeditor/editor'
import { onMounted, ref, unref } from 'vue'
import type { EditorExpose } from '@/components/Editor'
import { Editor } from '@/components/Editor'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const change = (editor: IDomEditor) => {
  console.log(editor.getHtml())
}

const editorRef = ref<typeof Editor & EditorExpose>()

const defaultHtml = ref('')

onMounted(async () => {
  const editor = await unref(editorRef)?.getEditorRef()
  console.log(editor)
})

setTimeout(() => {
  defaultHtml.value = '<p>hello <strong>world</strong></p>'
}, 3000)
</script>

<template>
  <ContentWrap :title="t('richText.richText')" :message="t('richText.richTextDes')">
    <Editor ref="editorRef" v-model="defaultHtml" @change="change" />
  </ContentWrap>
</template>
