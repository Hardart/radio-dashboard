<script lang="ts" setup>
import { inject } from 'vue'
const editor = inject<any>('tiptap')
</script>
<template>
  <UButton
    square
    variant="outline"
    color="gray"
    icon="i-material-symbols-format-image-left-rounded"
    class="editor__button"
    @click="
      editor
        .chain()
        .focus()
        .updateAttributes('image', { class: 'w-72 float-left not-prose mr-4' })
        .run()
    "
  />
</template>
