<script setup lang="ts">
import { WEEKDAYS } from '../utils/constants'
</script>

<template>
  <div class="schedule-header">
    <div class="time-label"></div>
    <div class="day" v-for="day in WEEKDAYS" :key="day">{{ day }}</div>
  </div>
</template>

<style scoped>
.schedule-header {
  display: grid;
  grid-template-columns: 70px repeat(7, 1fr);
  font-weight: bold;
  text-align: center;
}

.day {
  align-content: center;
  min-width: 100px;
}
</style>
