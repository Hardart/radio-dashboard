<script setup lang="ts">
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import CalendarNew from '@/components/hdrt/calendar/Calendar'
import { ref } from 'vue'
import { format } from '@formkit/tempo'
import CalendarTime from '@/components/hdrt/calendar/components/CalendarTime/CalendarTime.vue'
const selectedDate = ref('2024-11-26T14:52:38.660Z')
const calendar = new CalendarNew(selectedDate)
</script>

<template>
  <div class="test">
    <div>
      <HdButton
        text="Пример кнопки"
        color="primary"
        variant="link"
        icon="dashboard"
      />
      <HdButton text="Пример кнопки" color="primary" variant="solid" />
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
      <HdButton text="Пример кнопки" color="gray" variant="solid" />
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
      <HdButton text="Пример кнопки" color="success" variant="solid" />
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
      <HdButton text="Пример кнопки" color="danger" variant="solid" />
      <HdButton text="Пример кнопки" color="danger" variant="outline" />
      <HdButton text="Пример кнопки" color="danger" />
    </div>
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
