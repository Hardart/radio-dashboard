<script lang="ts" setup>
import HdSelect from '@/components/ui/hdSelect/hdSelect.vue'
import { inject, ref, watch } from 'vue'

const levels = [1, 2, 3, 4]
const headings = levels.map((level) => `Heading ${level}`)
const formatItems = ['Paragraph', ...headings]
const selected = ref(formatItems[0])
const editor = inject<any>('tiptap')

watch(
  () => editor.value?.isActive('paragraph'),
  () => {
    if (editor.value?.isActive('paragraph')) selected.value = 'Paragraph'
    else
      levels.forEach((level) => {
        if (editor.value?.isActive('heading', { level }))
          selected.value = formatItems[level]
      })
  }
)

watch(selected, () => {
  if (selected.value === 'Paragraph')
    editor.value?.chain().focus().setParagraph().run()
  else {
    const level: number = parseInt(selected.value.slice(-1))
    editor.value?.chain().focus().setHeading({ level }).run()
  }
})
</script>

<template>
  <HdSelect :options="formatItems" v-model="selected" />
</template>
