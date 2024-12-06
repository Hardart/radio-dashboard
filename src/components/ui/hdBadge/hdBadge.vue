<script setup lang="ts">
defineProps<{
  label: string | number
  type?: 'warning' | 'danger' | 'success'
}>()
</script>

<template>
  <div class="hd-badge" :class="type && `hd-badge--${type}`">{{ label }}</div>
</template>

<style lang="scss" scoped src="./hdBadge.scss"></style>
