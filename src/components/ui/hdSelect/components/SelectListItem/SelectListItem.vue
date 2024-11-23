<script lang="ts" setup>
defineProps<{
  isActive?: boolean
  option: string | Record<string, any>
}>()
defineEmits(['onSelect'])
</script>

<template>
  <li class="hd-select-item" :class="isActive && 'hd-select-item--active'">
    <slot />
  </li>
</template>

<style lang="scss" scoped src="./styles.scss" />
