<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { inject } from 'vue'

const editor = inject<any>('tiptap')
</script>

<template>
  <HdButton
    icon="format-bold"
    class="hd-editor__button"
    :class="{ 'hd-editor__button--active': editor.isActive('bold') }"
    @click="editor.chain().focus().toggleBold().run()"
    v-tooltip="{ label: 'жирный текст' }"
  />
</template>
