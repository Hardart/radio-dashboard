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
