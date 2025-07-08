<script lang="ts" setup>
defineProps<{
  text: any
}>()
</script>

<template>
  <div class="select-item">
    <span class="select-item__title">{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
