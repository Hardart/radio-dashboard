<script setup lang="ts">
import type { Icon } from '@type/Icon'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

const {
  color = 'gray',
  variant = 'soft',
  type = 'button',
} = defineProps<{
  text?: unknown
  color?: 'primary' | 'success' | 'danger' | 'gray' | 'contrast'
  variant?: 'link' | 'solid' | 'outline' | 'soft'
  icon?: Icon
  flipIcon?: Icon
  iconClass?: string
  flipIconClass?: string
  disabled?: boolean
  square?: boolean
  type?: 'button' | 'submit'
}>()
</script>

<template>
  <button
    class="hd-button"
    :class="[`hd-button--${color}-${variant}`, square && 'hd-button--square']"
    :type
    :disabled
  >
    <SvgIcon v-if="icon" :icon class="hd-button__icon" :class="iconClass" />
    <span class="hd-button__text" v-if="text">{{ text }}</span>
    <SvgIcon
      v-if="flipIcon"
      :icon="flipIcon"
      class="hd-button__flip-icon"
      :class="flipIconClass"
    />
  </button>
</template>

<style lang="scss" scoped src="./hdButton.scss"></style>
