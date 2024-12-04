<script setup lang="ts">
defineProps<{
  header?: boolean
  controllers?: boolean
  footer?: boolean
}>()
</script>

<template>
  <div class="dashboard__wrapper">
    <div class="dashboard__content">
      <div class="dashboard__header" v-if="header">
        <slot name="header"></slot>
      </div>
      <div class="dashboard__controllers" v-if="controllers">
        <slot name="controls"></slot>
      </div>
      <div class="dashboard__body">
        <slot />
      </div>
      <div class="dashboard__footer" v-if="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
