<script setup lang="ts">
import type { EditorControls } from '@/shared/enums/editor-controls'
import { Image } from './extensions/Image'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { inject, provide, reactive, watch, type CSSProperties } from 'vue'
import * as EditorAction from './controllers'
import HdFormGroup from '../hdFormGroup/HdFormGroup.vue'

const content = defineModel<string | undefined>({ required: true })

const editor = useEditor({
  content: content.value,
  extensions: [StarterKit, Image, Underline],
  editorProps: {
    attributes: {
      class: 'hd-editor__textarea',
    },
  },
  onUpdate() {
    content.value = editor.value?.getText().trim()
      ? editor.value?.getHTML()
      : editor.value?.getText().trim()
  },
})

const image = reactive({
  src: '',
  description: '',
})

watch(
  () => image.src,
  () => {
    editor.value?.chain().focus().setImage({ src: image.src }).run()
  }
)
watch(content, () => {
  if (!content.value) editor.value?.chain().clearContent().run()
})
provide('tiptap', editor)

const id = inject<string | undefined>('input-id', undefined)

defineProps<{
  label: string
  controls: (keyof typeof EditorControls)[]
  containerStyles?: CSSProperties
}>()
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="hd-editor">
    <div v-if="editor" class="hd-editor__controllers">
      <component
        v-for="action in controls"
        :is="EditorAction[action]"
        v-model:src="image.src"
      />
    </div>
    <HdFormGroup :label name="content" required>
      <EditorContent
        :editor
        class="hd-editor__container"
        v-bind:style="{ ...containerStyles }"
        @click="editor?.chain().focus().run()"
      />
    </HdFormGroup>
  </div>
</template>

<style scoped lang="scss" src="./HdEditor.scss" />
