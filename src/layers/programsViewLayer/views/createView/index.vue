<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import HdModal from '@ui/hdModal/HdModal.vue'
import ScheduleTable from '../../components/scheduleTable/ScheduleTable.vue'
import ScheduleCard from '../../components/schedule/ScheduleCard.vue'
import ProgramForm from '../../components/programForm/ProgramForm.vue'
import { useScheduleStore } from '../../store/useScheduleStore'
import { useProgramsStore } from '../../store/useProgramsStore'

const programsStore = useProgramsStore()
const scheduleStore = useScheduleStore()
const { programs, programFormData, hosts } = storeToRefs(programsStore)
const { scheduleList, isTimeEqual, ids, isOpenScheduleModal } =
  storeToRefs(scheduleStore)

onMounted(programsStore.resetProgram)
</script>

<template>
  <div class="schedule">
    <ProgramForm
      v-model="programFormData"
      :hosts
      @on-add-schedule="scheduleStore.toggleScheduleModalState"
      @on-edit-schedule="programsStore.editSchedule"
      @on-delete-schedule="programsStore.removeSchedule"
      @on-save-program="programsStore.saveProgram"
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

<style lang="scss" src="./styles.scss" />
