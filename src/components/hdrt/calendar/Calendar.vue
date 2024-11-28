<script setup lang="ts">
import Calendar from './Calendar'
import Weekdays from './components/Weekdays/Weekdays.vue'
import Days from './components/Days/Days.vue'
import NextPrevButton from './components/NextPrevButton/NextPrevButton.vue'
import CalendarTime from './components/CalendarTime/CalendarTime.vue'
const selectedDate = defineModel<string>({ required: true })
const isShowCalendar = defineModel<boolean>('isShow')
const { minDate } = defineProps<{ minDate?: string; isTime?: boolean }>()
const calendar = new Calendar(selectedDate, minDate)

const onDay = (current: number) => {
  if (calendar.isDatePrev(current)) return
  calendar.setCurrentIndex(current)
  calendar.update()
}

const onChangeHour = (num: number) => {
  calendar.setHour(num)
}
const onChangeMinutes = (num: number) => {
  calendar.setMinutes(num)
}
</script>

<template>
  <div class="calendar" v-if="isShowCalendar" ref="$calendar">
    <header class="calendar__header">
      <NextPrevButton
        :disabled="!calendar.canClickOnPrev"
        @click="calendar.toMonth(-1)"
        prev
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
    <footer class="calendar__footer">
      <CalendarTime
        :is-today="calendar.isToday"
        @on-change-hours="onChangeHour"
        @on-change-minutes="onChangeMinutes"
        :h="calendar.hours"
        :m="calendar.minutes"
      />
    </footer>
  </div>
</template>

<style lang="scss" scoped src="./Calendar.scss" />
