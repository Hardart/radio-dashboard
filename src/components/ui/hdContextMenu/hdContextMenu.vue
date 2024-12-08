<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useClickOutside } from '@/composables/useClickOutside'

import { ref } from 'vue'

const context = ref()
const isOpen = defineModel({ required: true })

defineProps<{
  coords: { x: number; y: number }
}>()
useClickOutside(context, () => (isOpen.value = false))
defineEmits(['on-edit', 'on-delete'])
</script>

<template>
  <ul
    v-if="isOpen"
    ref="context"
    class="context-menu"
    :style="{ left: `${coords.x}px`, top: `${coords.y}px` }"
  >
    <li class="context-menu__item" @click="$emit('on-edit')">
      <SvgIcon icon="edit" class="context-menu__icon" />
      <span>Редактировать</span>
    </li>
    <li
      class="context-menu__item context-menu__item--danger"
      @click="$emit('on-delete')"
    >
      <SvgIcon icon="delete" class="context-menu__icon" />
      <span>Удалить</span>
    </li>
  </ul>
</template>

<style lang="scss" scoped src="./hdContextMenu.scss" />
