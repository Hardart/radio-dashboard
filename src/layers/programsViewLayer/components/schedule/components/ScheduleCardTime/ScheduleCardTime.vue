<script setup lang="ts">
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import HdSelect from '@/components/ui/hdSelect/hdSelect.vue'
import HdSwitch from '@/components/ui/hdSwitch/HdSwitch.vue'
import { hours, minutes } from '@/shared/helpers/time'
import type { ScheduleProperty } from '@/shared/schemes/schedule-schema'
import { computed, watch } from 'vue'

const props = defineProps<{
  property: ScheduleProperty
  isTimeEqual: boolean
}>()

const endHours = computed(calcEndHours)
const endMinutes = computed(calcEndMinutes)

const isHoursEqual = () => props.property.end.hh == props.property.start.hh
const isEndMinutesOverStart = () =>
  props.property.end.mm <= props.property.start.mm
const isEndHourOverStart = () =>
  props.property.end.hh <= props.property.start.hh
const isStartHourValueLast = () => props.property.start.hh === '23'
const isStarMinutesValueLast = () => props.property.start.mm === '55'

const watchStartHour = () => {
  props.property.end.hh = isEndHourOverStart()
    ? increaseTime(1, 'start', 'hh')
    : props.property.end.hh
  props.property.end.mm =
    isEndMinutesOverStart() && isHoursEqual()
      ? increaseTime(30, 'end', 'mm')
      : props.property.end.mm
  if (isHoursEqual() && isStarMinutesValueLast())
    props.property.end.hh = increaseTime(1, 'start', 'hh')
}

const watchStartMinutesAndEndHour = () => {
  props.property.end.mm =
    isEndMinutesOverStart() && isHoursEqual()
      ? increaseTime(5, 'start', 'mm')
      : props.property.end.mm
  if (isStarMinutesValueLast() && isHoursEqual())
    props.property.end.hh = increaseTime(1, 'end', 'hh')
}

watch(() => props.property.start.hh, watchStartHour)
watch(
  [() => props.property.start.mm, () => props.property.end.hh],
  watchStartMinutesAndEndHour
)

function calcEndHours() {
  const h = hours.filter((h) => {
    if (isStartHourValueLast()) return h
    else if (isStarMinutesValueLast()) return h > props.property.start.hh
    else return h >= props.property.start.hh
  })
  if (h.length <= 3) h.push('00')
  return h
}

function calcEndMinutes() {
  return isHoursEqual()
    ? minutes.filter((m) => m > props.property.start.mm)
    : minutes
}

function increaseTime(inc: number, key1: 'start' | 'end', key2: 'mm' | 'hh') {
  const value = props.property[key1][key2]
  const time = (typeof value === 'number' ? value : parseInt(value)) + inc
  const topValue = key2 === 'mm' ? 60 : 24
  return time >= topValue ? convertTimeToString(0) : convertTimeToString(time)
}

function convertTimeToString(value: number) {
  return value < 10 ? `0${value}` : `${value}`
}
</script>

<template>
  <li class="schedule-card__time">
    <div class="schedule-card__group">
      <p class="schedule-card__time-title">Начало</p>
      <HdSelect
        class="schedule-card__time-select"
        :options="hours"
        v-model="props.property.start.hh"
      />
      <HdSelect
        class="schedule-card__time-select"
        :options="minutes"
        v-model="props.property.start.mm"
      />
    </div>
    <div class="schedule-card__group">
      <p class="schedule-card__time-title">Конец</p>
      <HdSelect
        class="schedule-card__time-select"
        :options="endHours"
        v-model="props.property.end.hh"
      />
      <HdSelect
        class="schedule-card__time-select"
        :options="endMinutes"
        v-model="props.property.end.mm"
      />
    </div>
    <div class="schedule-card__group">
      <p class="schedule-card__time-title">Повтор</p>
      <HdSwitch v-model="property.isReplay" />
    </div>
  </li>
</template>

<style lang="scss" scoped src="./styles.scss" />
