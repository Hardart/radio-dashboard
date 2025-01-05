import type { Schedule } from '@/shared/schemes/schedule-schema'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScheduleStore = defineStore('schedule', () => {
  const baseScheduleTime = {
    start: { hh: '00', mm: '00' },
    end: { hh: '01', mm: '00' },
    isReplay: false,
  }

  const isOpenScheduleModal = ref(false)

  const scheduleList = ref<Schedule[]>([])
  const ids = ref<number[]>([])
  const isTimeEqual = ref(true)

  const addPropertyToSchedule = () => cloneDeep(baseScheduleTime)

  const addBaseSchedule = (schedule: Schedule) => {
    schedule.properties.push(cloneDeep(baseScheduleTime))
  }

  const removeBaseSchedule = (schedule: Schedule) => {
    schedule.properties.pop()
  }

  const toggleScheduleModalState = () =>
    (isOpenScheduleModal.value = !isOpenScheduleModal.value)

  return {
    ids,
    scheduleList,
    isTimeEqual,
    isOpenScheduleModal,
    addPropertyToSchedule,
    addBaseSchedule,
    removeBaseSchedule,
    toggleScheduleModalState,
  }
})
