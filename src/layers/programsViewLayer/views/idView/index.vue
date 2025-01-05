<script async setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useScheduleStore } from '../../store/useScheduleStore'
import { useProgramsStore } from '../../store/useProgramsStore'
import ScheduleTable from '../../components/scheduleTable/ScheduleTable.vue'
import ProgramForm from '../../components/programForm/ProgramForm.vue'
import ScheduleCard from '../../components/schedule/ScheduleCard.vue'
import HdModal from '@/components/ui/hdModal/HdModal.vue'

const route = useRoute()
const programsStore = useProgramsStore()
const scheduleStore = useScheduleStore()
const { programs, hosts, programFormData } = storeToRefs(programsStore)
const { scheduleList, isOpenScheduleModal, isTimeEqual, ids } =
  storeToRefs(scheduleStore)
const id = `${route.params.id}`

watch(
  () => programs.value.length,
  () => {
    programFormData.value = programs.value.find((item) => item.id === id)!
  }
)
programsStore.findProgramById(id)
</script>

<template>
  <div class="schedule">
    <ProgramForm
      v-model="programFormData"
      :hosts
      @on-add-schedule="scheduleStore.toggleScheduleModalState"
      @on-edit-schedule="programsStore.editSchedule"
      @on-delete-schedule="programsStore.removeSchedule"
      @on-save-program="programsStore.updateProgram"
      @on-delete-program="programsStore.deleteProgram"
    />
    <ScheduleTable :program-form-data :programs :schedule-list />
  </div>

  <HdModal v-model="isOpenScheduleModal">
    <ScheduleCard
      @on-add-base-schedule="scheduleStore.addBaseSchedule"
      @on-remove-base-schedule="scheduleStore.removeBaseSchedule"
      @on-add-schedule-to-program="programsStore.addScheduleToProgram"
      @on-cancel-adding-schedule-to-program="
        programsStore.cancelAddingScheduleToProgram
      "
      :is-time-equal
      :schedule-list
      :is-can-add-schedule="!ids.length"
    />
  </HdModal>
</template>

<style lang="scss" scoped src="./styles.scss" />
