<script setup lang="ts">
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import CalendarNew from '@/components/hdrt/calendar/CalendarNew'
import { ref } from 'vue'
import { format } from '@formkit/tempo'
import CalendarTime from '@/components/hdrt/calendar/components/CalendarTime/CalendarTime.vue'
const selectedDate = ref('2024-11-26T14:52:38.660Z')
const calendar = new CalendarNew(selectedDate)
</script>

<template>
  <!-- <div class="test">
    <div>
      <HdButton
        text="Пример кнопки"
        color="primary"
        variant="link"
        icon="dashboard"
      />
      <HdButton text="Пример кнопки" color="primary" variant="soft" />
      <HdButton text="Пример кнопки" color="primary" variant="outline" />
      <HdButton text="Пример кнопки" color="primary" />
    </div>
    <div>
      <HdButton
        text="Пример кнопки"
        color="gray"
        variant="link"
        icon="dashboard"
      />
      <HdButton text="Пример кнопки" color="gray" variant="soft" />
      <HdButton text="Пример кнопки" color="gray" variant="outline" />
      <HdButton text="Пример кнопки" color="gray" />
    </div>
    <div>
      <HdButton
        text="Пример кнопки"
        color="success"
        variant="link"
        icon="dashboard"
      />
      <HdButton text="Пример кнопки" color="success" variant="soft" />
      <HdButton text="Пример кнопки" color="success" variant="outline" />
      <HdButton text="Пример кнопки" color="success" />
    </div>
    <div>
      <HdButton
        text="Пример кнопки"
        color="danger"
        variant="link"
        icon="dashboard"
      />
      <HdButton text="Пример кнопки" color="danger" variant="soft" />
      <HdButton text="Пример кнопки" color="danger" variant="outline" />
      <HdButton text="Пример кнопки" color="danger" />
    </div>
  </div> -->
  <div class="calendar">
    <div>DATE FROM NEWS - {{ selectedDate }}</div>
    <div>DATE FROM INSTANCE - {{ selectedDate }}</div>
    <div>CURRENT - {{ calendar.currentDate }}</div>
    <div>CALENDAR - {{ calendar.calendarDate }}</div>
    <div>SELECTED DATE - {{ format(selectedDate, 'DD.MM.YYг. HH:mm') }}</div>
  </div>
  <div class="test">
    {{ calendar.isToday }}
    <HdButton text="месяц вперед" @click="calendar.setNextMonth()" />
    <HdButton
      text="месяц назад"
      :disabled="!calendar.canClickOnPrev"
      @click="calendar.setPrevMonth()"
    />
    <CalendarTime
      v-model:h="calendar.hours"
      v-model:m="calendar.minutes"
      :is-today="calendar.isToday"
      @on-change-hours="calendar.setHours"
    />
  </div>
  <ul class="hd-calendar">
    <li
      class="day"
      v-for="item in calendar.daysInMonth"
      :key="item"
      @click="calendar.onDate(item)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<style lang="scss" scoped src="./style.scss" />
