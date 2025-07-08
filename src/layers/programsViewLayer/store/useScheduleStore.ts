import type { ScheduleWithStyle, Schedule } from '@schema/schedule-schema'
import type { ICellProps } from '../types'
import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { cloneDeep, isEqual } from 'lodash'
import { _clamp } from '@/shared/helpers/utils'
import { ScheduleAPI } from '@/api/schedule-api'
import { generateTimeString } from '../utils/timeUtils'
import {
  createTempId,
  generateDefaultStyles,
  generateScheduleCopy,
} from '../utils/helpers'

export const useScheduleStore = defineStore('schedule', () => {
  const scheduleForm: ScheduleWithStyle = reactive({
    id: '',
    dayIndex: 0,
    dayRange: 0,
    duration: 0,
    startTime: '',
    isReplay: false,
    style: {},
  })

  function fillScheduleForm({ dayIndex, timeIndex }: ICellProps) {
    _fillScheduleForm(scheduleForm, dayIndex, timeIndex)
  }

  async function saveSchedule() {
    const response = await ScheduleAPI.save(scheduleForm)
    if (!response) throw new Error('schedule is not saved')

    return response
  }

  async function updateSchedule(schedule: ScheduleWithStyle) {
    if (isEqual(scheduleForm, schedule)) return false

    updateScheduleForm(schedule)
    const response = await ScheduleAPI.updateOne(schedule)
    if (!response) throw new Error('Hfcgbcfybt')
    return response
  }

  async function updateManySchedules(scheduleList: ScheduleWithStyle[]) {
    const schedules = scheduleList.map<Schedule>((schedule) => {
      const copySchedule = cloneDeep(schedule) as Partial<ScheduleWithStyle>
      delete copySchedule.style
      return copySchedule as Schedule
    })
    const response = await ScheduleAPI.updateMany(schedules)
    if (!response) throw new Error('Error on update many')
    return response
  }

  function updateScheduleForm(schedule: ScheduleWithStyle) {
    Object.assign(scheduleForm, schedule)
  }

  async function createCopy(scheduleItem: ScheduleWithStyle) {
    const localCopy = generateScheduleCopy(scheduleItem)
    const copiedSchedule = await ScheduleAPI.save(localCopy)
    if (!copiedSchedule) throw new Error('Can_t create schedule copy((')
    copiedSchedule.style = { zIndex: `5` }
    return copiedSchedule
  }

  async function deleteOne(scheduleId: string) {
    const schedule = await ScheduleAPI.deleteOne({ id: scheduleId })
  }

  return {
    fillScheduleForm,
    saveSchedule,
    updateSchedule,
    createCopy,
    updateScheduleForm,
    updateManySchedules,
    deleteOne,
    scheduleForm,
  }
})

function _fillScheduleForm(
  scheduleForm: ScheduleWithStyle,
  dayIndex: number,
  timeIndex: number
) {
  scheduleForm.id = createTempId()
  scheduleForm.dayRange = 1
  scheduleForm.duration = 60
  scheduleForm.dayIndex = dayIndex
  scheduleForm.startTime = generateTimeString(timeIndex)
  scheduleForm.style = generateDefaultStyles()
}
