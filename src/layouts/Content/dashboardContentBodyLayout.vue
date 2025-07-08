<script setup lang="ts">
defineProps<{
  column?: boolean
  noPadding?: boolean
}>()
</script>

<template>
  <div
    class="dashboard__body"
    :class="[
      column && 'dashboard__body--column',
      noPadding && 'dashboard__body--no-padding',
    ]"
  >
    <slot></slot>
  </div>
</template>
