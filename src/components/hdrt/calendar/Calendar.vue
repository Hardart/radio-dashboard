<script setup lang="ts">
import Calendar from './state'
import Weekdays from './components/Weekdays/Weekdays.vue'
import Days from './components/Days/Days.vue'
import NextPrevButton from './components/NextPrevButton/NextPrevButton.vue'
const selectedDate = defineModel<string>({ required: true })
const { minDate } = defineProps<{ minDate?: string }>()
const calendar = new Calendar(selectedDate, minDate)

const onDay = () => calendar.updateSelected(selectedDate)
</script>

<template>
  <div class="calendar">
    <header class="calendar__header">
      <NextPrevButton
        v-if="calendar.canClickOnPrev"
        prev
        @click="calendar.toMonth(-1)"
      />
      <span class="calendar__date font-medium uppercase">
        {{ calendar.title }}
      </span>
      <NextPrevButton next @click="calendar.toMonth(1)" />
    </header>
    <main>
      <Weekdays />
      <Days :calendar @on-day="onDay" />
    </main>
  </div>
</template>

<style lang="scss" scoped src="./Calendar.scss" />
