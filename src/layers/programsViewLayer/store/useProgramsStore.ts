import { cloneDeep } from 'lodash'
import { computed, reactive, ref, toValue, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { ProgramsAPI } from '@/api/programs-api'
import { combineNearDays } from '@/shared/helpers/schedule'
import type { Program } from '@/shared/schemes/program-schema'
import type { Schedule } from '@/shared/schemes/schedule-schema'
import type { User } from '@/shared/schemes/user-schema'
import { useScheduleStore } from './useScheduleStore'
import type { ProgramForm } from '@/shared/schemes/program-form-schema'
import transcript from '@/shared/helpers/slug-transcript'
import router from '@/router'

export const useProgramsStore = defineStore('programs', () => {
  const scheduleStore = useScheduleStore()
  const { scheduleList, ids, isTimeEqual } = storeToRefs(scheduleStore)

  const programState: ProgramForm = {
    id: '',
    title: '',
    image: '',
    color: '#fff',
    schedule: [],
    hosts: [],
    isPublished: false,
    description: '',
    slug: '',
  }

  const programs = ref<Program[]>([])
  const programFormData = ref<ProgramForm>(cloneDeep(programState))
  const hosts = ref<User[]>([])
  const tempId = ref()
  const tempSchedule = ref<Schedule>()
  const pending = ref(false)

  async function fetchPrograms() {
    pending.value = true
    const { programs: programsData, hosts: hostsData } =
      await ProgramsAPI.list()
    programs.value = programsWithTime(programsData)
    hosts.value = hostsData
    pending.value = false
  }

  function resetProgram() {
    programFormData.value = cloneDeep(programState)
    scheduleList.value = []
    ids.value = []
    tempId.value = undefined
    isTimeEqual.value = true
  }

  function addScheduleToProgram() {
    if (
      typeof tempId.value !== 'undefined' &&
      typeof tempSchedule.value !== 'undefined'
    ) {
      programFormData.value.schedule.splice(
        tempId.value,
        1,
        ...cloneDeep(scheduleList.value)
      )
    } else {
      programFormData.value.schedule.push(...toValue(scheduleList))
    }
    scheduleList.value = []
    ids.value = []
    tempId.value = undefined
    isTimeEqual.value = true
    scheduleStore.toggleScheduleModalState()
  }

  function editSchedule(index: number) {
    tempId.value = index
    tempSchedule.value = cloneDeep(programFormData.value.schedule[index])
    ids.value = tempSchedule.value.weekdayIds
    scheduleList.value.push(programFormData.value.schedule[index])
    scheduleStore.toggleScheduleModalState()
  }

  function removeSchedule(index: number) {
    programFormData.value.schedule.splice(index, 1)
  }

  function cancelAddingScheduleToProgram() {
    if (
      typeof tempId.value !== 'undefined' &&
      typeof tempSchedule.value !== 'undefined'
    ) {
      programFormData.value.schedule[tempId.value] = cloneDeep(
        tempSchedule.value
      )
    }
    tempSchedule.value = undefined
    scheduleList.value = []
    ids.value = []
    tempId.value = undefined
    isTimeEqual.value = true
    scheduleStore.toggleScheduleModalState()
  }

  async function saveProgram() {
    programFormData.value.slug = transcript(programFormData.value.title)
    pending.value = true
    const programData = await ProgramsAPI.save(programFormData.value)
    pending.value = false
    if (!programData) return console.warn('Данные не получены')
    programs.value.push(prepareSchedule(programData))
    router.push(`/programs/${programData.id}`)
  }

  async function deleteProgram(id: string) {
    pending.value = true
    const data = await ProgramsAPI.deleteOne({ id })
    pending.value = false
    if (!data) return console.warn('Данные не получены')
    await router.push('/programs')
    programs.value = programs.value.filter((item) => item.id !== id)
  }

  async function updateProgram() {
    pending.value = true
    await ProgramsAPI.updateOne(programFormData.value)
    pending.value = false
  }

  const findProgramById = (id: string) => {
    const p = programs.value.find((programsItem) => programsItem.id === id)
    if (!p) return
    programFormData.value = p
  }

  return {
    programs,
    programFormData,
    hosts,
    pending,
    fetchPrograms,
    addScheduleToProgram,
    cancelAddingScheduleToProgram,
    saveProgram,
    deleteProgram,
    updateProgram,
    resetProgram,
    editSchedule,
    removeSchedule,
    findProgramById,
  }
})

function programsWithTime(programsData: Program[]) {
  return programsData.map(prepareSchedule)
}

function prepareSchedule(program: Program) {
  const sch = program.schedule.map((s) => {
    const sizes = combineNearDays(s.weekdayIds)
    return { ...s, sizes }
  })
  return { ...program, schedule: sch }
}
