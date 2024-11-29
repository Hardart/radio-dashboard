<script setup lang="ts">
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { provide, reactive, watch } from 'vue'
import { Image } from './extensions/Image'
import ControllerBold from './controllers/Bold.vue'
import ControllerHeading from './controllers/Heading.vue'
import ControllerItalic from './controllers/Italic.vue'
import ControllerFloatRight from './controllers/FloatRight.vue'
import ControllerUploadImage from './controllers/UploadImage.vue'
import ControllerUnderline from './controllers/Underline.vue'
import ControllerFloatLeft from './controllers/FloatLeft.vue'
import ControllerBlockquote from './controllers/Blockquote.vue'
import ControllerTextWrap from './controllers/TextWrap.vue'
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

watch(
  content,
  () => {
    editor.value
      ?.chain()
      .setContent(content.value || '')
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
      <ControllerUnderline />
      <ControllerBlockquote />
      <ControllerFloatLeft />
      <ControllerFloatRight />
      <ControllerTextWrap />
      <ControllerUploadImage v-model="image.src" />
    </div>

    <EditorContent
      :editor="editor"
      class="hd-editor__container"
      @click="editor?.chain().focus().run()"
    />
  </div>
</template>

<style scoped lang="scss" src="./HdEditor.scss" />
