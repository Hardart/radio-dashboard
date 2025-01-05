<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { weekdayIds } from '@/shared/helpers/schedule'
const ids = defineModel({ required: true })

const props = [
  { label: 'Каждый день', emit: () => weekdayIds },
  { label: 'По будням', emit: () => weekdayIds.slice(0, 5) },
  { label: 'По выходным', emit: () => weekdayIds.slice(-2) },
  {
    label: 'По четным',

    emit: () => weekdayIds.filter((day) => day % 2 == 0),
  },
  {
    label: 'По нечетным',

    emit: () => weekdayIds.filter((day) => day % 2 !== 0),
  },
  { label: 'Сбросить', emit: () => [] },
]
</script>

<template>
  <div class="day-controlls">
    <HdButton
      class="day-controlls__item"
      v-for="(item, idx) in props"
      :text="item.label"
      :color="idx + 1 === props.length ? 'danger' : 'success'"
      size="s"
      variant="outline"
      @click="ids = item.emit()"
    />
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
