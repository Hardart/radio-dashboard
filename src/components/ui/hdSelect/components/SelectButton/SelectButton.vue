<script lang="ts" setup>
import SelectedItem from '../SelectedItem/SelectedItem.vue'

defineProps<{
  text: string
}>()
</script>

<template>
  <button type="button" class="hd-select-button">
    <SelectedItem :text />
  </button>
</template>

<style lang="scss" scoped src="./styles.scss" />
