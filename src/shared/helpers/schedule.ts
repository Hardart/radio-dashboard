import type { ScheduleProperty } from '../schemes/schedule-schema'
import type { ISchedule } from '../types/schedule'

export const weekdays = [
  { id: 1, title: { full: 'Понедельник', short: 'пн' } },
  { id: 2, title: { full: 'Вторник', short: 'вт' } },
  { id: 3, title: { full: 'Среда', short: 'ср' } },
  { id: 4, title: { full: 'Четверг', short: 'чт' } },
  { id: 5, title: { full: 'Пятница', short: 'пт' } },
  { id: 6, title: { full: 'Суббота', short: 'сб' } },
  { id: 7, title: { full: 'Воскресенье', short: 'вс' } },
]

export const weekday = (id: number) => ({
  get info() {
    return weekdays.find((day) => day.id === id)
  },
  get short() {
    return this.info?.title.short
  },
  get full() {
    return this.info?.title.full
  },
})

export const weekdayIds = weekdays.map((day) => day.id)

export const combineNearDays = (weekdayIds: number[]) => {
  let nextValue = 0
  let id = 0

  function reduceIds(acc: ISchedule.NearDay[], curr: number, index: number) {
    const obj: ISchedule.NearDay = { width: 1, startFromId: 1 }

    if (nextValue === curr) {
      nextValue++
      acc[id].width++
    } else {
      id = index
      nextValue = curr + 1
      obj.startFromId = curr
      acc[id] = obj
    }

    return acc
  }

  return weekdayIds.reduce(reduceIds, [] as ISchedule.NearDay[])
}

export const selectedIdsToWeekday = (array: number[]) => {
  switch (true) {
    case array.length == 7:
      return 'Каждый день'
    case array.length == 5 && array[0] === 1 && array[4] === 5:
      return 'По будням'
    case array.length == 2 && array.includes(6) && array.includes(7):
      return 'По выходным'
    default:
      return array
        .map((n) => weekdays.find((day) => day.id === n)?.title.full || '')
        .join(', ')
  }
}

export const scheduleTimeToString = (info: ScheduleProperty) =>
  `с ${info.start.hh}:${info.start.mm} до ${info.end.hh}:${info.end.mm}`
