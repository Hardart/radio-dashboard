import { ref, type Ref } from 'vue'
import {
  monthStart,
  monthDays,
  diffMonths,
  diffDays,
  format,
  addMonth,
} from '@formkit/tempo'

type CalendarOptions = {
  isAdmin?: boolean
}

const DEFAULTS: CalendarOptions = {
  isAdmin: false,
}

class CalendarBase {
  isAdmin
  currentDate = new Date()
  calendarDate = ref(new Date())
  hours: number = NaN
  minutes: number = NaN
  day: number = -1
  date: Ref<string> = ref('')

  constructor(isAdmin?: boolean) {
    this.isAdmin = isAdmin
    this.setCalendarDate()
    this.updateTime()
    this.setAvailableCurrentMinutes()
  }

  protected initDate(date: Ref<string>) {
    this.date = date
    if (this.date.value == '') this.date.value = this.currentDate.toISOString()
  }

  protected toMonth(n: 1 | -1) {
    this.calendarDate.value = addMonth(this.calendarDate.value, n)
  }

  protected get _calendarYear() {
    return this.calendarDate.value.getFullYear()
  }

  protected get _calendarMonth() {
    return this.calendarDate.value.getMonth()
  }

  protected get _calendarDate() {
    return this.calendarDate.value.getDate()
  }

  protected get _weekdayStart() {
    return monthStart(this.calendarDate.value).getDay()
  }

  private updateHours() {
    if (!Number.isNaN(this.hours)) return
    this.hours = this.currentDate.getHours()
  }

  private updateMinutes() {
    if (!Number.isNaN(this.minutes)) return
    const minutes = this.currentDate.getMinutes()
    this.minutes = Math.floor(minutes / 5) * 5
  }

  protected updateTime() {
    this.updateHours()
    this.updateMinutes()
  }

  private setAvailableCurrentMinutes() {
    this.currentDate.setMinutes(this.minutes)
  }

  protected setCalendarDate(date?: number) {
    this.calendarDate.value = this.setDate(date)
  }

  protected setDate(date?: number) {
    return new Date(
      this._calendarYear,
      this._calendarMonth,
      date || this._calendarDate,
      0,
      0
    )
  }

  get isToday() {
    return diffDays(this.calendarDate.value, this.currentDate, 'ceil') === 0
  }

  get weekdayStartIndex() {
    return (this._weekdayStart ? this._weekdayStart : 7) - 1
  }
}

export default class Calendar extends CalendarBase {
  constructor(selectedDate: Ref<string>, options?: CalendarOptions) {
    super(options?.isAdmin)
    this.initDate(selectedDate)
  }

  setNextMonth() {
    this.toMonth(1)
  }

  setPrevMonth() {
    this.toMonth(-1)
  }

  onDate(input: number) {
    if (this.isDatePrev(input)) return
    this.setCalendarDate(input)
    this.updateTime()
    this.updateSelectedDate()
  }

  isDatePrev(index: number) {
    if (this.isAdmin) return false
    else {
      const date = this.setDate(index)
      return diffDays(date, this.currentDate, 'ceil') < 0
    }
  }

  isSelected(index: number) {
    return (
      format(this.setDate(index), 'short') === format(this.date.value, 'short')
    )
  }

  setHours = (value: number | string) => {
    this.hours = typeof value === 'string' ? parseInt(value) : value
    this.updateSelectedDate()
  }

  setMinutes = (value: number | string) => {
    this.minutes = typeof value === 'string' ? parseInt(value) : value
    this.updateSelectedDate()
  }

  get canClickOnPrev() {
    if (this.isAdmin) return true
    return diffMonths(this.currentDate, this.calendarDate.value) * -1 > 0
  }

  get weekdayStartIndex() {
    return (this._weekdayStart ? this._weekdayStart : 7) - 1
  }

  get daysInMonth() {
    return monthDays(this.calendarDate.value)
  }

  get title() {
    return format(this.calendarDate.value, 'MMMM YYYY')
  }

  private updateSelectedDate() {
    this.date.value = new Date(
      this._calendarYear,
      this._calendarMonth,
      this._calendarDate,
      this.hours,
      this.minutes
    ).toISOString()
  }
}
