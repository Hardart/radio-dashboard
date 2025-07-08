<script setup lang="ts">
import * as UI from '@ui'
import { computed, watch } from 'vue'
import { timeToMinutes } from '../utils/timeUtils'
import type { ScheduleWithStyle } from '@schema/schedule-schema'
import type { ProgramForm } from '@schema/program-form-schema'
import ScheduleSettings from './scheduleSettings.vue'
import { templateRef, useToggle } from '@vueuse/core'
import { useClickOutside } from '@/composables/useClickOutside'
import { TABLE_BORDER_WIDTH } from '../utils/constants'

defineEmits(['copy', 'delete', 'edit', 'update'])

const { schedule, cellHeight, cellWidth, program } = defineProps<{
  program: ProgramForm
  schedule: ScheduleWithStyle
  cellHeight: number
  cellWidth: number
}>()

// Рассчитать стиль позиционирования и размера элемента
function calcItemStyle(item: ScheduleWithStyle) {
  const start = timeToMinutes(item.startTime)
  const minuteHeight = cellHeight / 60
  const totalMinutesInDay = 24 * 60
  const totalTableHeight = totalMinutesInDay * minuteHeight
  const rawHeightPx = item.duration * minuteHeight
  const topPx = start * minuteHeight + TABLE_BORDER_WIDTH
  // Ограничиваем высоту
  const adjustedHeightPx =
    Math.min(rawHeightPx, totalTableHeight - topPx) - TABLE_BORDER_WIDTH

  const style = {
    top: topPx,
    height: adjustedHeightPx,
    left: cellWidth * item.dayIndex + item.dayIndex + TABLE_BORDER_WIDTH,
    width: cellWidth * item.dayRange + item.dayRange - TABLE_BORDER_WIDTH,
  }
  if (item.style) Object.assign(item.style, style)
  else item.style = style
}

watch(
  () => [
    cellWidth,
    schedule.startTime,
    cellHeight,
    schedule.duration,
    program.color,
  ],
  () => calcItemStyle(schedule),
  { immediate: true }
)

const showTime = computed(() => schedule.duration * (cellHeight / 60) >= 60)
const showStartTime = computed(
  () => schedule.duration * (cellHeight / 60) >= 40
)
const showYResize = computed(() => schedule.duration * (cellHeight / 60) >= 20)
const showTitle = computed(() => schedule.duration * (cellHeight / 60) >= 18)
const showActions = computed(() => schedule.duration * (cellHeight / 60) >= 24)

const style = computed(() => {
  const { top, height, left, width, zIndex } = schedule.style

  return {
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
    zIndex,
    backgroundColor: program.color,
  }
})

const duration = (durationValue: number) =>
  `${Math.trunc(durationValue / 60)}ч ${durationValue % 60}мин`

const [showSettings, toggleSettingsState] = useToggle()
const scheduleRef = templateRef('schedule')

useClickOutside(scheduleRef, () => toggleSettingsState(false))
</script>

<template>
  <div class="schedule-item" :style ref="schedule">
    <div class="schedule-item__content">
      <div class="schedule-item__actions" v-if="showActions">
        <UI.Button
          icon="edit"
          square
          size="xs"
          @click="toggleSettingsState()"
          @mousedown.stop
          @mouseup.stop
          v-tooltip="{ label: 'редактировать', to: '.schedule-table' }"
        />
        <UI.Button
          icon="copy"
          square
          size="xs"
          @mousedown.stop
          @mouseup.stop
          @click="$emit('copy', program.id, schedule)"
          v-tooltip="{ label: 'дублировать', to: '.schedule-table' }"
        />
        <UI.Button
          icon="trash"
          square
          size="xs"
          @mousedown.stop
          @mouseup.stop
          @click="$emit('delete', program.id, schedule.id)"
          v-tooltip="{ label: 'удалить', to: '.schedule-table' }"
        />
      </div>
      <p v-if="showTitle" class="schedule-item__title">
        {{ program.title }}
        <span class="schedule-item__replay" v-if="schedule.isReplay"
          >(повтор)</span
        >
      </p>
      <p v-if="showStartTime">Начало в {{ schedule.startTime }}</p>
      <p class="schedule-item__time" v-if="showTime">
        Длительность: {{ duration(schedule.duration) }}
      </p>
      <div class="schedule-item__grab" data-resize="x"></div>
      <div class="schedule-item__grab" data-resize="y" v-if="showYResize"></div>
    </div>
    <ScheduleSettings
      :schedule
      :is-show="showSettings"
      @on-update="$emit('update', schedule, toggleSettingsState)"
    />
  </div>
</template>

<style lang="scss">
.schedule-item {
  --schedule-bg: 211, 100%, 50%;

  position: absolute;
  color: #fff;
  background-color: hsl(var(--schedule-bg), 0.5);
  font-size: var(--fs-s);
  border-radius: 4px;
  z-index: 1;

  &__content {
    padding: 2px 4px;
    width: 100%;
    height: 100%;
    cursor: move;
  }

  &:hover {
    z-index: 2;
  }

  &__title {
    margin-bottom: 5px;
    font-weight: var(--fw-l);
  }

  &__non-events {
    pointer-events: none;
  }

  &__actions {
    position: absolute;
    right: 5px;
  }

  &__time {
    pointer-events: none;
  }

  &__grab {
    position: absolute;
    border-radius: 4px;

    &[data-resize='x'] {
      top: 0;
      right: 0;
      width: 10px;
      height: inherit;
      cursor: ew-resize;
    }

    &[data-resize='y'] {
      bottom: 0;
      left: 0;
      height: 10px;
      width: inherit;
      cursor: ns-resize;
    }

    &:hover {
      background-color: hsl(var(--schedule-bg), 0.3);
    }
  }

  &__replay-mark {
    display: grid;
    place-items: center;
    position: absolute;
    bottom: 4px;
    right: 5px;
    width: 8px;
    height: 8px;
    background-color: hsl(var(--color-gray-900));
    font-size: 10px;
    font-weight: 700;
    border-radius: 50%;
  }

  &__replay {
    font-weight: var(--fw-s);
    font-style: italic;
  }
}
</style>
