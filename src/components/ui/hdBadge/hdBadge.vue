<script setup lang="ts">
defineProps<{
  text: string
  type?: 'warning' | 'danger' | 'success'
}>()
</script>

<template>
  <div class="hd-badge" :class="type && `hd-badge--${type}`">{{ text }}</div>
</template>

<style lang="scss" scoped src="./hdBadge.scss"></style>
