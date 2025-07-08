<script lang="ts" setup>
import SelectedItem from '../SelectedItem/SelectedItem.vue'

defineProps<{
  isActive?: boolean
  option: string | Record<string, any>
  text: string
}>()
defineEmits(['onSelect'])
</script>

<template>
  <li class="hd-select-item" :class="{ 'hd-select-item--active': isActive }">
    <SelectedItem :text />
  </li>
</template>

<style lang="scss" scoped src="./styles.scss" />
