<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { inject } from 'vue'

const editor = inject<any>('tiptap')

function setLink() {
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('Введите ссылку', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  // update link
  editor.value
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run()
}
</script>

<template>
  <HdButton
    square
    icon="format-link-add"
    class="hd-editor__button"
    :class="{ 'hd-editor__button--active': editor.isActive('link') }"
    @click="setLink()"
    v-tooltip="{ label: 'добавить ссылку' }"
  />
  <HdButton
    square
    icon="format-link-off"
    class="hd-editor__button"
    :disabled="!editor.isActive('link')"
    @click="editor.chain().focus().unsetLink().run()"
    v-tooltip="{ label: 'удалить ссылку' }"
  />
</template>
