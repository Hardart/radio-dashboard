<script setup lang="ts">
import { MIN_HEIGHT, WEEKDAYS } from '../utils/constants'
import { baseTimes } from '../utils/timeUtils'
</script>

<template>
  <div class="schedule-grid">
    <div v-for="(_, dayIndex) in WEEKDAYS" :key="dayIndex" class="day-column">
      <div
        v-for="time in baseTimes"
        :key="time"
        class="cell"
        :style="{ height: MIN_HEIGHT }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.schedule-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.cell {
  border: 1px solid #ddd;
}
</style>
