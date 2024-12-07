<script lang="ts" setup>
import { computed } from 'vue'
import HdButton from '../hdButton/hdButton.vue'

const page = defineModel<number>({ required: true })

const {
  total,
  pageCount,
  max = 7,
  divider = '...',
} = defineProps<{
  pageCount: number
  total: number
  max?: number
  divider?: string
}>()

const pages = computed(() =>
  Array.from({ length: Math.ceil(total / pageCount) }, (_, i) => i + 1)
)

const canGoFirstOrPrev = computed(() => page.value > 1)
const canGoLastOrNext = computed(() => page.value < pages.value.length)

const displayedPages = computed(() => {
  const totalPages = pages.value.length
  const current = page.value
  const maxDisplayedPages = Math.max(max, 5)
  const r = Math.floor((Math.min(maxDisplayedPages, totalPages) - 5) / 2)
  const r1 = current - r
  const r2 = current + r
  const beforeWrapped = r1 - 1 > 1
  const afterWrapped = r2 + 1 < totalPages
  const items = []

  if (totalPages <= maxDisplayedPages) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i)
    }
    return items
  }

  items.push(1)

  if (beforeWrapped) items.push(divider)
  if (!afterWrapped) {
    const addedItems = current + r + 2 - totalPages
    for (let i = current - r - addedItems; i <= current - r - 1; i++) {
      items.push(i)
    }
  }
  for (let i = Math.max(2, r1); i <= Math.min(totalPages, r2); i++) {
    items.push(i)
  }
  if (!beforeWrapped) {
    const addedItems = 1 - (current - r - 2)
    for (let i = current + r + 1; i <= current + r + addedItems; i++) {
      items.push(i)
    }
  }
  if (afterWrapped) items.push(divider)
  if (r2 < totalPages) {
    items.push(totalPages)
  }
  if (items.length >= 3 && items[1] === divider && items[2] === 3) {
    items[1] = 2
  }
  if (
    items.length >= 3 &&
    items[items.length - 2] === divider &&
    items[items.length - 1] === items.length
  ) {
    items[items.length - 2] = items.length - 1
  }
  return items
})

function onClickPrev() {
  if (!canGoFirstOrPrev.value) return
  page.value--
}

function onClickNext() {
  if (!canGoLastOrNext.value) return
  page.value++
}

function onClickPage(input: number | string) {
  if (typeof input === 'string') return
  page.value = input
}
</script>

<template>
  <div class="hd-pagination">
    <HdButton text="назад" @click="onClickPrev" :disabled="!canGoFirstOrPrev" />

    <HdButton
      v-for="(pageItem, index) of displayedPages"
      :key="`${pageItem}-${index}`"
      :text="`${pageItem}`"
      square
      @click="onClickPage(pageItem)"
      class="hd-pagination__item"
      :class="pageItem === page && 'hd-pagination__item--current'"
    />

    <HdButton text="вперед" @click="onClickNext" :disabled="!canGoLastOrNext" />
  </div>
</template>

<style lang="scss" scoped src="./hdPagination.scss" />
