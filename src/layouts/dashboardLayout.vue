<script setup lang="ts">
import DashboardAside from './dashboardAside.vue'
</script>

<template>
  <div class="dashboard">
    <DashboardAside />
    <slot />
  </div>
</template>
