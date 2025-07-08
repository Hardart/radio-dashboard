<script lang="ts" setup>
import type { CSSProperties } from 'vue'

defineProps<{
  times: string[]
  timeColumnStyle: CSSProperties
}>()
</script>

<template>
  <div class="time-column">
    <div
      class="time"
      v-for="time in times"
      :key="time"
      :style="timeColumnStyle"
    >
      {{ time }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.time-column {
  display: flex;
  flex-direction: column;

  & .time {
    display: grid;
    place-content: center;
    height: 40px;
    border-top: 1px solid var(--color-border);
  }
}
</style>
