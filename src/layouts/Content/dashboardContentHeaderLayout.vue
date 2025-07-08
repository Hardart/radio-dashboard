<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div class="dashboard__header">
    <div class="dashboard__header--left" v-if="title || $slots.header">
      <h3 class="dashboard__header-title" v-if="title">{{ title }}</h3>
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>
