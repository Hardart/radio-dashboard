<script setup lang="ts">
import SvgIcon, { type Icon } from '@/components/SvgIcon/SvgIcon.vue'

defineProps<{
  text?: string
  type?: 'primary'
  icon?: Icon
  iconClass?: string
}>()
</script>

<template>
  <button class="hd-button" :class="type && `hd-button--${type}`">
    <SvgIcon v-if="icon" :icon :class="iconClass" />
    {{ text }}
  </button>
</template>

<style lang="scss" scoped src="./hdButton.scss"></style>
