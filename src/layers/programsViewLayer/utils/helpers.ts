import type { ProgramType } from '../types'
import type { ScheduleWithStyle } from '@schema/schedule-schema'
import type { ProgramForm } from '@schema/program-form-schema'
import type { CSSProperties } from 'vue'
import { cloneDeep, isNumber } from 'lodash'
import { MAX_FACTOR, MIN_FACTOR, MIN_HEIGHT } from './constants'
import { _clamp } from '@/shared/helpers/utils'
import { minutesToTime, timeToMinutes } from './timeUtils'

export function generateScheduleCopy(schedule: ScheduleWithStyle) {
  const copy = cloneDeep(schedule)
  copy.id = createTempId()

  const timeWithOffset = timeToMinutes(copy.startTime) + 10
  const newstartTime = minutesToTime(timeWithOffset)
  copy.startTime = newstartTime
  return copy
}

// Функция для расчета фактора увеличения высоты
export function calculateHeightFactor(cellHeight: number) {
  const curr = Math.floor(cellHeight / MIN_HEIGHT)
  return _clamp(MIN_FACTOR, MAX_FACTOR, curr)
}

export function createTempId() {
  return `${Date.now() + Math.trunc(Math.random() * 100)}`
}

export function generateDefaultStyles(): CSSProperties {
  return {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  }
}

export function setLabel(program: ProgramForm) {
  return program.isPublished ? 'опубликовано' : 'не опубликовано'
}

export function setType(program: ProgramForm) {
  return program.isPublished ? 'success' : 'danger'
}

export function filterProgramsByType(
  programs: ProgramForm[],
  type: ProgramType
) {
  if (type === 'все') {
    return programs
  } else {
    return programs.filter((program) => program.type === type)
  }
}
