<script lang="ts" setup>
import { inject } from 'vue'
import SelectedItem from '../SelectedItem/SelectedItem.vue'

defineProps<{
  text: any
}>()
const id = inject<string | undefined>('input-id', undefined)
</script>

<template>
  <button type="button" class="hd-select-button" :id>
    <SelectedItem :text />
  </button>
</template>

<style lang="scss" scoped src="./styles.scss" />
