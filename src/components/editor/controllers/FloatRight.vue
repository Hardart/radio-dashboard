<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { inject, type Ref } from 'vue'

const editor = inject<Ref<any>>('tiptap')
const onClick = () => {
  editor?.value
    .chain()
    .focus()
    .updateAttributes('image', { class: 'float-right' })
    .run()
}
</script>

<template>
  <HdButton
    text="Right"
    class="hd-editor__button"
    @click="onClick"
    v-tooltip="{ label: 'по правому краю' }"
  />
</template>
