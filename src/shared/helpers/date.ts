export function normalizeDate(date: string) {
  return Intl.DateTimeFormat('ru', { dateStyle: 'long' }).format(new Date(date))
}
