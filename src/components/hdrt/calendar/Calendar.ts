import { ref, type Ref } from 'vue'
import {
  monthStart,
  monthDays,
  diffMonths,
  diffDays,
  format,
  addMonth,
} from '@formkit/tempo'

export default class Calendar {
  currentDate = ref(new Date())
  calendarDate = ref(new Date())
  hours: number
  minutes: number
  selectedDay: number = NaN
  selectedDate: Ref<string>
  minDate?: string

  constructor(selectedDate: Ref<string>, minDate?: string) {
    this.selectedDate = selectedDate
    this.minDate = minDate
    this.hours = this.currentDate.value.getHours()
    this.minutes = this.currentDate.value.getMinutes()
    this.minutes = Math.ceil(this.minutes / 5) * 5
  }

  toMonth(n: 1 | -1) {
    this.calendarDate.value = addMonth(this.calendarDate.value, n)
  }

  setHour(value: number | string) {
    this.hours = typeof value === 'string' ? parseInt(value) : value
    this.setDefaultSelectedDay()
    this.update()
  }

  setMinutes(value: number | string) {
    this.minutes = typeof value === 'string' ? parseInt(value) : value
    this.setDefaultSelectedDay()
    this.update()
  }

  update() {
    this._selectedDateToISO()
  }

  setCurrentIndex(index: number) {
    this.selectedDay = index
  }

  setDefaultSelectedDay() {
    if (Number.isNaN(this.selectedDay)) {
      const date = new Date()
      this.selectedDay = date.getDate()
    }
  }

  private _selectedDateToISO() {
    this.selectedDate.value = this._setCalendarDateWithTime(
      this.selectedDay
    ).toISOString()
  }

  isDatePrev(index: number) {
    if (this.minDate) {
      return diffDays(this._setCalendarDate(index), this.minDate) < 0
    } else {
      return diffDays(this._setCalendarDate(index), this.currentDate.value) < 0
    }
  }

  isSelected(index: number) {
    return this._compareDates(index, this.selectedDate.value)
  }

  get daysInMonth() {
    return monthDays(this.calendarDate.value)
  }

  get title() {
    return format(this.calendarDate.value, 'MMMM YYYY')
  }

  get weekdayStartIndex() {
    return (this._weekdayStart ? this._weekdayStart : 7) - 1
  }

  get _calendarDateWithTime() {
    return new Date(
      this._calendarYear,
      this._calendarMonth,
      this._calendarDate,
      this.hours,
      this.minutes
    ).toISOString()
  }

  get isToday() {
    return (
      diffMonths(this.currentDate.value, this.selectedDate.value) === 0 &&
      this._isCurrentAndSelectedDatesEqual
    )
  }

  get canClickOnPrev() {
    if (this.minDate)
      return diffMonths(this.minDate, this.calendarDate.value) * -1 > 0
    else {
      return (
        diffMonths(this.currentDate.value, this.calendarDate.value) * -1 > 0
      )
    }
  }

  private get _calendarYear() {
    return this.calendarDate.value.getFullYear()
  }

  private get _calendarMonth() {
    return this.calendarDate.value.getMonth()
  }

  private get _calendarDate() {
    return this.calendarDate.value.getDate()
  }

  private get _weekdayStart() {
    return monthStart(this.calendarDate.value).getDay()
  }

  private get _setMinutes() {
    return Math.ceil(this.minutes / 5) * 5
  }

  private _setCalendarDate(date: number) {
    return new Date(this._calendarYear, this._calendarMonth, date)
  }

  private get _isCurrentAndSelectedDatesEqual() {
    return (
      this.currentDate.value.getDate() ===
      new Date(this.selectedDate.value).getDate()
    )
  }

  private _setCalendarDateWithTime(date: number) {
    return new Date(
      this._calendarYear,
      this._calendarMonth,
      date,
      this.hours,
      this._setMinutes
    )
  }

  private _compareDates(index: number, date: string) {
    return (
      format(this._setCalendarDate(index), 'short') === format(date, 'short')
    )
  }
}
