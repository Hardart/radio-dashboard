import { ref } from 'vue'

// Конвертация времени из "HH:MM" в минуты
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export const calcHours = (min: number) => Math.floor(min / 60)

// Конвертация минут в "HH:MM"
export function minutesToTime(minutes: number, factor?: number): string {
  const hour = factor ? Math.floor(minutes / factor) : Math.floor(minutes / 60)
  const minute = factor ? (60 / factor) * (minutes % factor) : minutes % 60
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

export const generateTimeString = (hh: number, mm?: number) => {
  return `${String(hh).padStart(2, '0')}:${String(mm ?? 0).padStart(2, '0')}`
}

export const generateTime = (factor: number) => {
  return Array.from({ length: 24 * factor }, (_, i) => {
    return minutesToTime(i, factor)
  })
}

// Базовые временные слоты по часам (24 часа)
export const baseTimes = ref(
  Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)
)
