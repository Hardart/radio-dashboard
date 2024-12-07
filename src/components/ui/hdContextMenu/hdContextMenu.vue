<script lang="ts" setup>
import { useClickOutside } from '@/composables/useClickOutside'
import { usePointerCoords } from '@/composables/usePointerCoords'
import { computed, provide, ref, type Ref } from 'vue'
const context = ref()
const isOpen = defineModel({ required: true })

defineProps<{
  contextItem: unknown
}>()
useClickOutside(context, () => (isOpen.value = false))
defineEmits(['on-edit', 'on-delete'])

const x = ref()
const y = ref()

function onDocumentClick() {
  document.body.addEventListener('pointerdown', (event: PointerEvent) => {
    x.value = event.pageX
  })
}
onDocumentClick()
</script>

<template>
  <ul
    v-if="isOpen"
    ref="context"
    class="context-menu"
    :style="{ left: `${x}px` }"
  >
    <li class="context-menu__item" @click="$emit('on-edit', contextItem)">
      {{ contextItem }}
    </li>
    <li class="context-menu__item" @click="$emit('on-delete')">Удалить</li>
  </ul>
</template>

<style lang="scss" scoped src="./hdContextMenu.scss" />
