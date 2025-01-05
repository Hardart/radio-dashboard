<script lang="ts" setup>
import { weekdays } from '@/shared/helpers/schedule'
import { hours } from '@/shared/helpers/time'
import ScheduleTableItem from './components/scheduleTableItem/ScheduleTableItem.vue'
import type { Program } from '@/shared/schemes/program-schema'
import type { Schedule } from '@/shared/schemes/schedule-schema'
import type { ProgramForm } from '@/shared/schemes/program-form-schema'

defineProps<{
  programs: Program[]
  programFormData: ProgramForm
  scheduleList: Schedule[]
}>()
</script>

<template>
  <div class="schedule-table">
    <div class="schedule-table__head">
      <div class="schedule-table__weekdays"></div>
      <div v-for="day in weekdays" class="schedule-table__weekdays">
        {{ day.title.short }}
      </div>
    </div>
    <div class="schedule-table__body">
      <div class="schedule-table__time">
        <div class="schedule-table__time-item" v-for="hour in hours">
          {{ hour }}:00
        </div>
      </div>
      <div class="schedule-table__day-column" v-for="day in 7">
        <div
          class="schedule-table__day"
          v-for="hour in hours"
          :key="`${day}-${hour}`"
        ></div>
      </div>
      <ul>
        <li v-for="program in programs">
          <template v-for="schedule in program.schedule">
            <template v-for="size in schedule.sizes">
              <ScheduleTableItem
                v-if="size"
                v-for="property in schedule.properties"
                :size
                :property
                :program
              />
            </template>
          </template>
        </li>
        <li v-for="schedule in programFormData.schedule">
          <template v-for="size in schedule.sizes">
            <ScheduleTableItem
              v-if="size"
              v-for="property in schedule.properties"
              :size
              :property
              :program="programFormData"
            />
          </template>
        </li>
        <li v-for="schedule in scheduleList">
          <template v-for="size in schedule.sizes">
            <ScheduleTableItem
              v-if="size"
              v-for="property in schedule.properties"
              :size
              :property
              :program="programFormData"
            />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
