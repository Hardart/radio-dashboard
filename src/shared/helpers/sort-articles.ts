import { ref } from 'vue'

interface SortBy {
  column: 'title' | 'createdAt' | 'status' | 'category'
  direction: boolean
}

export const sort = ref<SortBy>({
  column: 'createdAt',
  direction: false,
})

export function toggleSort(
  column: 'title' | 'createdAt' | 'status' | 'category'
) {
  sort.value.column = column
  sort.value.direction = !sort.value.direction
}
