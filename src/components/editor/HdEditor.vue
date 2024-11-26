<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { provide, reactive, watch } from 'vue'
import { Image } from './extensions/Image'
import ControllerBold from './controllers/Bold.vue'
import ControllerHeading from './controllers/Heading.vue'
import ControllerItalic from './controllers/Italic.vue'
import ControllerFloatRight from './controllers/FloatRight.vue'
import ControllerUploadImage from './controllers/UploadImage.vue'
// import Underline from '@tiptap/extension-underline'
const content = defineModel<string | undefined>({ required: true })

const editor = useEditor({
  content: content.value,
  extensions: [StarterKit, Image],
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
    editor.value
      ?.chain()
      .focus()
      .setImage({ src: 'http://localhost:3068' + image.src })
      .run()
  }
)

watch(
  content,
  () => {
    editor.value
      ?.chain()
      .setContent(content.value || '')
      .blur()
      .run()
  },
  { once: true }
)

provide('tiptap', editor)
</script>

<template>
  <div class="hd-editor">
    <div v-if="editor" class="hd-editor__controllers">
      <ControllerHeading />
      <ControllerBold />
      <ControllerItalic />
      <ControllerFloatRight />
      <ControllerUploadImage v-model="image.src" />
      <!-- <EditorUnderline /> -->
      <!-- <EditorBlockquote /> -->
      <!-- <EditorFloatLeft /> -->
      <!-- <EditorFloatRight /> -->
      <!-- <EditorResetFloat /> -->
    </div>

    <EditorContent :editor="editor" class="hd-editor__container" />
  </div>
</template>

<style scoped lang="scss" src="./HdEditor.scss" />
