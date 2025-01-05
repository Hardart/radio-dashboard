<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import HdCard from '@/components/ui/hdCard/HdCard.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import type { Schedule } from '@/shared/schemes/schedule-schema'
import { selectedIdsToWeekday } from '@/shared/helpers/schedule'
import ScheduleCardHeader from './components/ScheduleCardHeader/ScheduleCardHeader.vue'
import ScheduleCardTime from './components/ScheduleCardTime/ScheduleCardTime.vue'

defineEmits([
  'onAddBaseSchedule',
  'onRemoveBaseSchedule',
  'onAddScheduleToProgram',
  'onCancelAddingScheduleToProgram',
])
defineProps<{
  scheduleList: Schedule[]
  isTimeEqual: boolean
  isCanAddSchedule: boolean
}>()

const [showAddBtn, toggleShowBtnState] = useToggle()
</script>

<template>
  <HdCard>
    <template #header>
      <ScheduleCardHeader />
    </template>
    <template #default>
      <template v-for="schedule in scheduleList">
        <div class="schedule-cards" v-if="schedule.weekdayIds.length">
          <div
            class="schedule-card"
            @mouseenter="toggleShowBtnState(true)"
            @mouseleave="toggleShowBtnState(false)"
          >
            <label class="schedule-card__label">
              {{ selectedIdsToWeekday(schedule.weekdayIds) }}
            </label>
            <ul class="schedule-card__time-list">
              <ScheduleCardTime
                v-for="property in schedule.properties"
                :property
                :isTimeEqual
              />
            </ul>
            <div class="schedule-card__controlls" v-if="showAddBtn">
              <HdButton
                square
                icon="add"
                variant="outline"
                size="xs"
                @click="$emit('onAddBaseSchedule', schedule)"
              />
              <HdButton
                square
                icon="delete"
                variant="outline"
                size="xs"
                v-if="schedule.properties.length > 1"
                @click="$emit('onRemoveBaseSchedule', schedule)"
              />
            </div>
          </div>
        </div>
      </template>
    </template>
    <template #footer>
      <HdButton
        text="Добавить"
        @click="$emit('onAddScheduleToProgram')"
        :disabled="isCanAddSchedule"
      />
      <HdButton
        text="Отменить"
        @click="$emit('onCancelAddingScheduleToProgram')"
      />
    </template>
  </HdCard>
</template>

<style lang="scss" scoped src="./styles.scss" />
