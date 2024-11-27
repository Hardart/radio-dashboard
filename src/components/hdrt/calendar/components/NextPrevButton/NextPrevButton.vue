<script setup lang="ts">
import HdButton from '@/components/ui/hdButton/hdButton.vue'
defineProps<{
  next?: boolean
  prev?: boolean
}>()
</script>

<template>
  <HdButton
    square
    :class="`calendar__${next ? 'next' : 'prev'}`"
    :icon="next ? 'sort-up' : 'sort-down'"
  />
</template>

<style></style>
