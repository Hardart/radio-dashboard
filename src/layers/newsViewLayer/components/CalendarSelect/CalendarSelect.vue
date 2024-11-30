<script lang="ts" setup>
import { inject, ref } from 'vue'
import { format } from '@formkit/tempo'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import Calendar from '@/components/hdrt/calendar/Calendar.vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { useToggle } from '@/composables/useToggle'

const date = defineModel<string>({ required: true })
defineProps<{ minDate?: string }>()
const [isShow, toggle] = useToggle()
const $calendar = ref()
useClickOutside($calendar, () => toggle(false))
const id = inject<string | undefined>('input-id', undefined)
</script>

<template>
  <div class="hd-calendar" ref="$calendar">
    <HdButton
      type="button"
      class="hd-calendar__button"
      :text="format(date, 'D.MM.YYYY, HH:mm')"
      @click="toggle()"
      :id
    />
    <Calendar
      v-model="date"
      v-model:is-show="isShow"
      class="hd-calendar__container"
    />
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
