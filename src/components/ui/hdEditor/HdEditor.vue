<script setup lang="ts">
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { inject, provide, reactive, watch, type CSSProperties } from 'vue'
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
import HdFormGroup from '../hdFormGroup/HdFormGroup.vue'
import type { EditorControls } from '@/shared/enums/editor-controls'
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
      <ControllerHeading v-if="controls.includes('heading')" />
      <ControllerBold v-if="controls.includes('bold')" />
      <ControllerItalic v-if="controls.includes('italic')" />
      <ControllerUnderline v-if="controls.includes('underline')" />
      <ControllerBlockquote v-if="controls.includes('blockquote')" />
      <ControllerFloatLeft v-if="controls.includes('floatLeft')" />
      <ControllerFloatRight v-if="controls.includes('floatRight')" />
      <ControllerTextWrap v-if="controls.includes('textWrap')" />
      <ControllerUploadImage
        v-model="image.src"
        v-if="controls.includes('uploadImage')"
      />
    </div>
    <HdFormGroup :label name="content" required>
      <EditorContent
        :editor
        class="hd-editor__container"
        @click="editor?.chain().focus().run()"
        v-bind:style="{ ...containerStyles }"
      />
    </HdFormGroup>
  </div>
</template>

<style scoped lang="scss" src="./HdEditor.scss" />
