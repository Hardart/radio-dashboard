<script lang="ts" setup>
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="hd-card">
    <div class="hd-card__header" v-if="title || $slots.header">
      <h3 class="hd-card__title">{{ title }}</h3>
      <slot name="header"></slot>
    </div>
    <div class="hd-card__body">
      <slot v-if="$slots.default"></slot>
    </div>

    <div class="hd-card__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" src="./HdCard.scss" />
