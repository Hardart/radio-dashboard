<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { inject, type Ref } from 'vue'

const editor = inject<Ref<any>>('tiptap')
const onClick = () => {
  editor?.value
    .chain()
    .focus()
    .updateAttributes('image', { class: 'float-left' })
    .run()
}
</script>

<template>
  <HdButton
    icon="format-image-left"
    class="hd-editor__button"
    @click="onClick"
    v-tooltip="{ label: 'по левому краю' }"
  />
</template>
