<script lang="ts" setup>
import type { Option } from '../../hdSelect.vue'

defineProps<{
  isActive?: boolean
  option: Option
}>()
defineEmits(['onSelect'])
</script>

<template>
  <li
    class="hd-select-item"
    :class="isActive && 'hd-select-item--active'"
    @click="$emit('onSelect', option)"
  >
    <slot />
  </li>
</template>

<style lang="scss" scoped src="./styles.scss" />
