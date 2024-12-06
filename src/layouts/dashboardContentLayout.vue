<script setup lang="ts">
defineProps<{
  controllers?: boolean
  footer?: boolean
}>()
</script>

<template>
  <div class="dashboard__wrapper">
    <div class="dashboard__content">
      <div class="dashboard__controllers" v-if="controllers">
        <slot name="controls"></slot>
      </div>
      <slot />
      <div class="dashboard__footer" v-if="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
