<script setup lang="ts">
import Weekdays from './components/Weekdays/Weekdays.vue'
import Days from './components/Days/Days.vue'
import NextPrevButton from './components/NextPrevButton/NextPrevButton.vue'
import CalendarTime from './components/CalendarTime/CalendarTime.vue'
import Calendar from './Calendar'
const selectedDate = defineModel<string>({ required: true })
const isShowCalendar = defineModel<boolean>('isShow')
defineProps<{ minDate?: string; isTime?: boolean }>()
const calendar = new Calendar(selectedDate)
</script>

<template>
  <div class="calendar" v-if="isShowCalendar" ref="$calendar">
    <header class="calendar__header">
      <NextPrevButton
        :disabled="!calendar.canClickOnPrev"
        @click="calendar.setPrevMonth()"
        prev
      />
      <span class="calendar__date font-medium uppercase">
        {{ calendar.title }}
      </span>
      <NextPrevButton next @click="calendar.setNextMonth()" />
    </header>
    <main>
      <Weekdays />
      <Days :calendar />
    </main>
    <footer class="calendar__footer">
      <CalendarTime
        :h="calendar.hours"
        :m="calendar.minutes"
        :is-today="calendar.isToday"
        @on-change-hours="calendar.setHours"
        @on-change-minutes="calendar.setMinutes"
      />
    </footer>
  </div>
</template>

<style lang="scss" scoped src="./Calendar.scss" />
