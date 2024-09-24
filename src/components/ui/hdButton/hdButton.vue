<script setup lang="ts">
import SvgIcon, { type Icon } from '@/components/SvgIcon/SvgIcon.vue'

defineProps<{
  text?: string
  type?: 'primary' | 'success' | 'danger'
  icon?: Icon
  flipIcon?: Icon
  iconClass?: string
}>()
</script>

<template>
  <button class="hd-button" :class="type && `hd-button--${type}`">
    <SvgIcon v-if="icon" :icon class="hd-button__icon" :class="iconClass" />
    <span class="hd-button__text" v-if="text">{{ text }}</span>
    <SvgIcon
      v-if="flipIcon"
      :icon="flipIcon"
      class="hd-button__flip-icon"
      :class="iconClass"
    />
  </button>
</template>

<style lang="scss" scoped src="./hdButton.scss"></style>
