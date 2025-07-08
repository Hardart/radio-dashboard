<script setup lang="ts">
import type { ProgramForm } from '@schema/program-form-schema'
import type { ScheduleWithStyle } from '@schema/schedule-schema'
import { computed, ref } from 'vue'
import { useElementSize } from '@vueuse/core'

import ScheduleTableItem from './scheduleItem.vue'
import ScheduleTableCell from './scheduleTableCell.vue'
import ScheduleTableHeader from './scheduleTableHeader.vue'

import ScheduleTableTimeColumn from './scheduleTableTimeColumn.vue'

import { useDragSchedule } from '../composables/useDragSchedule'
import { baseTimes, generateTime } from '../utils/timeUtils'
import { MIN_HEIGHT, WEEKDAYS } from '../utils/constants'
import { calculateHeightFactor } from '../utils/helpers'

const { programs } = defineProps<{ programs: ProgramForm[] }>()

// Реф для первой ячейки, чтобы отслеживать реальные размеры
const firstCellRef = ref<HTMLElement>()
const { width: cellWidth } = useElementSize(firstCellRef)
const cellHeight = ref(MIN_HEIGHT)

const timeColumnStyle = computed(() => {
  const factor = calculateHeightFactor(cellHeight.value)
  return { height: `${cellHeight.value / factor}px` }
})

const times = computed(() => {
  const factor = calculateHeightFactor(cellHeight.value)
  return generateTime(factor)
})

const { isDragInAction, onMouseDown, onWheel } = useDragSchedule(
  cellHeight,
  cellWidth
)

const emit = defineEmits([
  'onUpdateSchedule',
  'onCreate',
  'onSave',
  'onDelete',
  'onCopy',
  'onEditSchedule',
])

function onDelete(programId: string, scheduleId: string) {
  emit('onDelete', programId, scheduleId)
}

function onCopy(programId: string, schedule: ScheduleWithStyle) {
  emit('onCopy', programId, schedule)
}

function onEditSchedule(program: ProgramForm, schedule: ScheduleWithStyle) {
  emit('onEditSchedule', program, schedule)
}

function onUpdateSchedule(
  schedule: ScheduleWithStyle,
  fn: (value: boolean) => void
) {
  emit('onUpdateSchedule', schedule, fn)
}
</script>

<template>
  <div class="schedule-table">
    <ScheduleTableHeader />
    <div class="schedule-body" ref="$scheduleBody" @wheel.alt.prevent="onWheel">
      <ScheduleTableTimeColumn :times :time-column-style />
      <div class="days-grid">
        <div
          v-for="(_, dayIndex) in WEEKDAYS"
          :key="`row-${dayIndex}`"
          class="schedule__row"
        >
          <ScheduleTableCell
            v-for="(_, timeIndex) in baseTimes"
            :key="`cell-${dayIndex}-${timeIndex}`"
            ref="firstCellRef"
            :day-index
            :cell-height
            :is-drag-start="isDragInAction"
            @on-create-program="$emit('onCreate', dayIndex, timeIndex)"
          />
        </div>

        <template v-for="program in programs" :key="program.id">
          <template v-for="schedule in program.schedule" :key="schedule.id">
            <ScheduleTableItem
              :program
              :schedule
              :cell-width
              :cell-height
              :style="isDragInAction && { pointerEvents: 'none' }"
              @copy="onCopy"
              @delete="onDelete"
              @edit="onEditSchedule"
              @update="onUpdateSchedule"
              @mousedown.prevent="onMouseDown($event, schedule)"
            />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.schedule-table {
  --first-column-width: 70px;

  display: grid;
  grid-template-rows: 50px 1fr;
  border: 1px solid #ccc;
  height: 100%;
  overflow-y: hidden;
  overscroll-behavior-y: none;
  user-select: none;
  -webkit-user-select: none;
}

.schedule-body {
  display: grid;
  grid-template-columns: var(--first-column-width) 1fr;
  overflow: auto;
  overscroll-behavior-y: none;
}

.days-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
}
</style>
