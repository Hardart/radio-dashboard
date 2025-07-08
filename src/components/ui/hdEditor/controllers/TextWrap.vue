<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { inject } from 'vue'

const editor = inject<any>('tiptap')
</script>

<template>
  <HdButton
    square
    icon="format-text-wrap"
    class="hd-editor__button"
    @click="editor.chain().focus().setHardBreak().run()"
    v-tooltip="{ label: 'разрыв строки' }"
  />
</template>
