import { reactive, ref } from 'vue'

interface SortBy {
  column: 'title' | 'createdAt'
  direction: boolean
}

export const sort = ref<SortBy>({
  column: 'createdAt',
  direction: false,
})

export function toggleSort(column: 'title' | 'createdAt') {
  sort.value.column = column
  sort.value.direction = !sort.value.direction
}
