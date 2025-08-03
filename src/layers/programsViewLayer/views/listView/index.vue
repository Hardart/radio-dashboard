<script setup lang="ts">
import type { ProgramForm } from '@schema/program-form-schema'
import type { ScheduleWithStyle } from '@schema/schedule-schema'
import { storeToRefs } from 'pinia'
import { useToggle } from '@vueuse/core'
import * as UI from '@ui'

import ScheduleTable from '../../components/scheduleTable.vue'
import ProgramFormComponent from '../../components/programForm/programForm.vue'
import { useDefaultStore } from '@/store/useDefaultStore'
import { useProgramsStore } from '../../store/useProgramsStore'
import { useScheduleStore } from '../../store/useScheduleStore'
import { setLabel, setType } from '../../utils/helpers'
import { replaceOriginalImage } from '@/shared/helpers/utils'

const baseStore = useDefaultStore()
const programStore = useProgramsStore()
const scheduleStore = useScheduleStore()
const { pending } = storeToRefs(programStore)

const columns = [
  {
    key: 'image',
    label: '',
    class: 'width-shrink',
  },
  {
    key: 'title',
    label: 'Название программы',
    class: 'width-expand',
  },
  {
    key: 'isPublished',
    label: 'статус',
    class: 'width-s',
  },
]

const [isModalOpen, toggleOpenState] = useToggle()

const onEditProgram = (program: ProgramForm) => {
  programStore.programToForm(program)
  toggleOpenState(true)
}

function onSaveProgram() {
  programStore.saveProgram(programStore.programForm)
  toggleOpenState(false)
}

function onCreateProgram(dayIndex: number, timeIndex: number) {
  programStore.createProgram({ dayIndex, timeIndex })
  toggleOpenState(true)
}

function onDeleteSchedule(programId: string, scheduleId: string) {
  programStore.deleteScheduleFromProgram(programId, scheduleId)
}

function onAddDefaultSchedule(programId: string) {
  programStore.addDefaultSchedule(programId)
}

function onCreateCopy(programId: string, schedule: ScheduleWithStyle) {
  programStore.createScheduleCopy(schedule, programId)
}

function onDeleteProgram(programId: string) {
  programStore.deleteProgram(programId)
  toggleOpenState(false)
}

async function onUpdateSchedule(
  schedule: ScheduleWithStyle,
  fn: (value: boolean) => void
) {
  const res = await scheduleStore.updateSchedule(schedule)
  if (res) fn(false)
}
</script>

<template>
  <div class="content-grid">
    <div>
      <UI.Table
        :columns
        :data="programStore.filteredPrograms"
        :pending
        @on-item="onEditProgram"
        @on-create="onCreateProgram(0, 0)"
      >
        <template #image-column="{ item }">
          <div class="media-column">
            <img
              class="media-column__image"
              :src="replaceOriginalImage(item.image, 50)"
            />
          </div>
        </template>
        <template #title-column="{ item }">
          <div>{{ item.title }}</div>
        </template>

        <template #isPublished-column="{ item }">
          <UI.Badge :label="setLabel(item)" :type="setType(item)" />
        </template>
      </UI.Table>
    </div>
    <ScheduleTable
      :programs="programStore.filteredPrograms"
      @on-create="onCreateProgram"
      @on-delete="onDeleteSchedule"
      @on-copy="onCreateCopy"
      @on-update-schedule="onUpdateSchedule"
    />
  </div>

  <UI.Modal v-model="isModalOpen">
    <ProgramFormComponent
      v-model="programStore.programForm"
      @on-save="onSaveProgram"
      @on-add="onAddDefaultSchedule"
      @on-delete="onDeleteProgram"
      :hosts="baseStore.hosts"
    />
  </UI.Modal>
</template>

<style lang="scss" scoped src="./style.scss" />
