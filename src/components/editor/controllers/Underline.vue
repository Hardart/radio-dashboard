<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { inject } from 'vue'

const editor = inject<any>('tiptap')
</script>

<template>
  <HdButton
    icon="format-underline"
    class="hd-editor__button"
    :class="{ 'hd-editor__button--active': editor.isActive('underline') }"
    @click="editor.chain().focus().toggleUnderline().run()"
    v-tooltip="{ label: 'подчеркнутый текст' }"
  />
</template>
