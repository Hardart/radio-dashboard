<script lang="ts" setup>
import type { ProgramForm } from '@schema/program-form-schema'
import { scheduleSchema, type ScheduleWithStyle } from '@schema/schedule-schema'
import * as UI from '@ui'
import { computed } from 'vue'
import { WEEKDAYS } from '../../utils/constants'

const scheduleFormData = defineModel<ScheduleWithStyle>({ required: true })
defineProps<{
  program: ProgramForm
}>()

defineEmits(['onSave', 'onDelete'])
const priorities = Array.from({ length: 5 }, (_, idx) => idx + 1)

const findProgramsDays = (dayRange: number, dayIndex: number) => {
  const days = Array.from({ length: dayRange }, (_, i) => i + dayIndex)
  return days.map((dayItem) => WEEKDAYS[dayItem]).join(', ')
}
const programDay = computed(() => {
  switch (true) {
    case scheduleFormData.value.dayRange === 7:
      return 'каждый день'

    case scheduleFormData.value.dayRange === 5 &&
      scheduleFormData.value.dayIndex === 0:
      return 'по будням'

    case scheduleFormData.value.dayRange === 2 &&
      scheduleFormData.value.dayIndex === 5:
      return 'по выходным'

    case scheduleFormData.value.dayRange === 1:
      const idx = scheduleFormData.value.dayIndex
      return WEEKDAYS[idx]

    default:
      return findProgramsDays(
        scheduleFormData.value.dayRange,
        scheduleFormData.value.dayIndex
      )
  }
})
</script>

<template>
  <UI.Form
    class="schedule-form"
    :state="scheduleFormData"
    :schema="scheduleSchema"
    @on-submit="$emit('onSave', scheduleFormData)"
  >
    <div class="schedule-form__container">
      <UI.Card :title="program.title">
        <p class="schedule-form__group">
          Начало программы в {{ scheduleFormData.startTime }}
        </p>
        <div class="fx fx--g16">
          <UI.Group label="повтор программы">
            <UI.Checkbox v-model="scheduleFormData.isReplay" />
          </UI.Group>
          <UI.Group label="приоритет">
            <UI.SelectV2
              :options="priorities"
              v-model="scheduleFormData.priority"
            />
          </UI.Group>
        </div>
        <template #footer>
          <UI.Button
            v-if="scheduleFormData.id"
            text="Удалить"
            @click="$emit('onDelete', scheduleFormData.id)"
            color="danger"
          />
          <UI.Button text=" Обновить" color="success" type="submit" />
        </template>
      </UI.Card>
    </div>
  </UI.Form>
</template>

<style lang="scss" scoped src="./styles.scss" />
