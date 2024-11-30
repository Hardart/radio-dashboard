<script setup lang="ts">
import type { Icon } from '@type/Icon'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

defineProps<{
  text?: unknown
  color?: 'primary' | 'success' | 'danger'
  variant?: 'link' | 'solid' | 'outline'
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
    :class="[
      color && `hd-button--${color}`,
      variant && `hd-button--${variant}`,
      square && 'hd-button--square',
    ]"
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
