<script lang="ts" setup>
import { computed, ref } from 'vue'

const emits = defineEmits(['onChangeHours', 'onChangeMinutes'])
const { h, m, isToday } = defineProps<{
  h: number
  m: number
  isToday: boolean
  isAdmin?: boolean
}>()
const selectedHour = ref(h)
const selectedMinute = ref(m)

const hours = computed(() => {
  const startHour = new Date().getHours()
  const mult = isToday ? 24 - new Date().getHours() : 24
  if (isToday && selectedHour.value < startHour) {
    selectedHour.value = startHour
    emits('onChangeHours', startHour)
  }

  return Array.from({ length: mult }, (_, i) =>
    String(isToday ? i + startHour : i).padStart(2, '0')
  )
})

const minutes = computed(() => {
  return Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'))
})
</script>

<template>
  <div class="calendar-time">
    <div class="calendar-time__container">
      <select
        class="calendar-time__select"
        v-model="selectedHour"
        @change="$emit('onChangeHours', selectedHour)"
      >
        <option v-for="hour in hours" :value="parseInt(hour)">
          {{ hour }}
        </option>
      </select>
      :
      <select
        class="calendar-time__select"
        v-model="selectedMinute"
        @change="$emit('onChangeMinutes', selectedMinute)"
      >
        <option v-for="minute in minutes" :value="parseInt(minute)">
          {{ minute }}
        </option>
      </select>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
