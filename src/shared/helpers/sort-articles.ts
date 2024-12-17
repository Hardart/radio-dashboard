import { ref } from 'vue'
type ColumnKey = 'title' | 'createdAt' | 'status' | 'category'
interface SortBy {
  column: ColumnKey
  direction: boolean
}

export const sort = ref<SortBy>({
  column: 'createdAt',
  direction: false,
})

export function toggleSort(column: unknown) {
  sort.value.column = column as ColumnKey
  sort.value.direction = !sort.value.direction
}
