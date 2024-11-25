<script setup lang="ts">
import type Calendar from '../../state'

defineProps<{
  calendar: Calendar
}>()

const emits = defineEmits(['onDay'])
</script>

<template>
  <div class="days select-none gap-1">
    <div v-for="prev in calendar.weekdayStartIndex - 1"></div>
    <div
      v-for="current in calendar.daysInMonth"
      class="day"
      :class="[
        calendar.isSelected(current) && 'day--selected',
        calendar.isDatePrev(current) && 'day--disabled',
      ]"
      @click="$emit('onDay', calendar.currentToISO(current))"
    >
      <span class="day__value">{{ current }}</span>
      <!-- <span class="day__value">{{  }}</span> -->
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
