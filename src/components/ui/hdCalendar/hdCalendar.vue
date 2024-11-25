<script lang="ts" setup>
import { format } from '@formkit/tempo'
import HdButton from '../hdButton/hdButton.vue'
import Calendar from '@/components/hdrt/calendar/Calendar.vue'
import { ref } from 'vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { useToggle } from '@/composables/useToggle'
const date = defineModel<string>({ required: true })
defineProps<{ label?: string }>()
const [isShow, toggle] = useToggle()
const $calendar = ref()
useClickOutside($calendar, () => toggle(false))
</script>

<template>
  <div class="hd-calendar" ref="$calendar">
    <span class="hd-calendar__label" v-if="label">{{ label }}</span>
    <HdButton
      class="hd-calendar__button"
      :text="format(date, 'short')"
      @click="toggle()"
    />
    <Teleport defer to=".hd-calendar">
      <Calendar v-model="date" v-if="isShow" class="hd-calendar__container" />
    </Teleport>
  </div>
</template>

<style lang="scss" scoped src="./hdCalendar.scss" />
