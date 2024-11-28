<script setup lang="ts">
import HdButton from '@/components/ui/hdButton/hdButton.vue'
defineProps<{
  next?: boolean
  prev?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <HdButton
    square
    :class="`calendar__${next ? 'next' : 'prev'}`"
    icon="arrow-forward-ios"
    :disabled
  />
</template>
