<script lang="ts" setup>
import { inject } from 'vue'
const editor = inject<any>('tiptap')
</script>
<template>
  <UButton
    square
    variant="outline"
    color="gray"
    icon="i-material-symbols-layers-outline-rounded"
    class="editor__button"
    @click="editor.chain().focus().resetAttributes('image', ['class']).run()"
  />
</template>
