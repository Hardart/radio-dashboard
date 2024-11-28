<script setup lang="ts">
import type Calendar from '../../Calendar'

defineProps<{
  calendar: Calendar
}>()

const emits = defineEmits(['onDay'])
</script>

<template>
  <div class="days select-none gap-1">
    <div v-for="_ in calendar.weekdayStartIndex"></div>
    <div
      v-for="current in calendar.daysInMonth"
      class="day"
      :class="[
        calendar.isSelected(current) && 'day--selected',
        calendar.isDatePrev(current) && 'day--disabled',
      ]"
      @click="$emit('onDay', current)"
    >
      <span class="day__value">{{ current }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
