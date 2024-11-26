<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { inject } from 'vue'

const editor = inject<any>('tiptap')
</script>

<template>
  <HdButton
    icon="format-quote"
    class="hd-editor__button"
    :class="{ 'hd-editor__button--active': editor.isActive('blockquote') }"
    @click="editor.chain().focus().toggleBlockquote().run()"
    v-tooltip="{ label: 'блок цитаты' }"
  />
</template>
