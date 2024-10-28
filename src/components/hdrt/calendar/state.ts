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
  selectedDate = ref('')
  minDate?: string

  constructor(selectedDate: Ref<string>, minDate?: string) {
    this.selectedDate.value = selectedDate.value
    this.minDate = minDate
  }

  toMonth(n: 1 | -1) {
    this.calendarDate.value = addMonth(this.calendarDate.value, n)
  }

  currentToISO(index: number) {
    if (this.isDatePrev(index)) return
    this.selectedDate.value = this._setCalendarDate(index).toISOString()
  }

  updateSelected(selected: Ref<string>) {
    selected.value = this.selectedDate.value
  }

  isDatePrev(index: number) {
    if (this.minDate)
      return diffDays(this._setCalendarDate(index), this.minDate) < 0
    return diffDays(this._setCalendarDate(index), this.currentDate.value) < 0
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
    return this._weekdayStart ? this._weekdayStart : 7
  }

  get canClickOnPrev() {
    if (this.minDate) return diffMonths(this.minDate, this.calendarDate.value)
    else return diffMonths(this.currentDate.value, this.calendarDate.value)
  }

  private get _calendarYear() {
    return this.calendarDate.value.getFullYear()
  }

  private get _calendarMonth() {
    return this.calendarDate.value.getMonth()
  }

  private get _weekdayStart() {
    return monthStart(this.calendarDate.value).getDay()
  }

  private _setCalendarDate(date: number) {
    return new Date(this._calendarYear, this._calendarMonth, date)
  }

  private _compareDates(index: number, date: string) {
    return (
      format(this._setCalendarDate(index), 'short') === format(date, 'short')
    )
  }
}
