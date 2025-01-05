<script lang="ts" setup>
import { computed } from 'vue'
import type { ScheduleProperty } from '@/shared/schemes/schedule-schema'
import type { ISchedule } from '@/shared/types/schedule'
import type { ProgramForm } from '@/shared/schemes/program-form-schema'

const props = defineProps<{
  program: ProgramForm
  property: ScheduleProperty
  size: ISchedule.NearDay
}>()

const LEFT_OFFSET = 60
const CELL_HEIGHT = 30
const CELL_WIDTH = 120
const MINUTES_DIVIDER = 60 / CELL_HEIGHT

const getHH = (type: 'start' | 'end') => parseInt(props.property[type].hh)
const getMM = (type: 'start' | 'end') =>
  parseInt(props.property[type].mm) / MINUTES_DIVIDER

const WIDTH = computed(() => CELL_WIDTH * props.size?.width)
const TOP = computed(() => CELL_HEIGHT * getHH('start') + getMM('start'))
const HEIGHT = computed(
  () =>
    CELL_HEIGHT * ((getHH('end') || 24) - getHH('start')) +
    getMM('end') -
    getMM('start')
)
const LEFT = computed(
  () => LEFT_OFFSET + (props.size?.startFromId - 1) * CELL_WIDTH
)
</script>

<template>
  <div
    class="schedule-item"
    :style="{
      width: `${WIDTH}px`,
      height: `${HEIGHT}px`,
      top: `${TOP}px`,
      left: `${LEFT}px`,
      backgroundColor: program.color,
    }"
    v-tooltip="{
      label: `${program.title} ${property.isReplay ? '(повтор)' : ''}`,
    }"
  >
    <div class="schedule-item__media">
      <img
        class="schedule-item__image"
        v-if="program.image"
        :src="program.image"
      />
    </div>
    <span class="schedule-item__replay" v-if="property.isReplay">п</span>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
