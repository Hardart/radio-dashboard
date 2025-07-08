<script lang="ts" setup generic="T">
import SelectedItem from '../SelectedItem/SelectedItem.vue'

defineProps<{
  isSelected: boolean
  text: T
}>()
defineEmits(['onSelect'])
</script>

<template>
  <li class="hd-select-item" :class="{ 'hd-select-item--active': isSelected }">
    <SelectedItem :text />
  </li>
</template>

<style lang="scss" scoped src="./styles.scss" />
