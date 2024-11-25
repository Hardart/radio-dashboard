<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { inject } from 'vue'

const editor = inject<any>('tiptap')
</script>

<template>
  <HdButton
    text="I"
    class="hd-editor__button"
    :class="{ 'hd-editor__button--active': editor.isActive('italic') }"
    @click="editor.chain().focus().toggleItalic().run()"
    v-tooltip="{ label: 'наклонный текст' }"
  />
</template>
