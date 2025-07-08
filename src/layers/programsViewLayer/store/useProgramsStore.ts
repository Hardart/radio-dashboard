import { defineStore } from 'pinia'
import type {
  ProgramForm,
  ProgramFormWithStringSchedule,
} from '@schema/program-form-schema'
import type { ScheduleWithStyle } from '@schema/schedule-schema'
import type { ICellProps, ProgramType } from '../types'
import { computed, reactive, ref, type Ref } from 'vue'
import { cloneDeep } from 'lodash'
import { RadioProgramsAPI } from '@/api/radio-programs-api'
import { useScheduleStore } from './useScheduleStore'
import { useDefaultStore } from '@/store/useDefaultStore'
import { filterProgramsByType } from '../utils/helpers'
import transcript from '@/shared/helpers/slug-transcript'

export const useProgramsStore = defineStore('programs', () => {
  const scheduleStore = useScheduleStore()
  const baseStore = useDefaultStore()

  const programForm: ProgramForm = reactive({
    id: '',
    title: '',
    type: 'программа',
  })

  const programType = ref<ProgramType>('все')

  const programs: Ref<ProgramForm[]> = ref([])
  const pending = ref(false)

  const isEditMode = computed(() => !!programForm.id)
  const programsCount = computed(() => programs.value.length)
  const programTypes = computed(() => {
    const types = programs.value.map((program) => program.type)
    return new Set(types)
  })

  const isShowTypeFilter = computed(() => programTypes.value.size > 1)

  const filteredPrograms = computed(() =>
    filterProgramsByType(programs.value, programType.value)
  )

  async function fetchPrograms() {
    pending.value = true
    const { programs: programsData, hosts: hostsData } =
      await RadioProgramsAPI.list()
    baseStore.hosts = hostsData
    programs.value = programsData
    pending.value = false
  }

  async function deleteScheduleFromProgram(
    programId: string,
    scheduleId: string
  ) {
    const p = _findProgramById(programs, programId)
    if (p) _removeScheduleFromProgram(p, scheduleId)
    await RadioProgramsAPI.deleteShedule({ programId, scheduleId })
  }

  async function updateProgram(program?: ProgramForm) {
    const p = _convertScheduleToString(program ?? programForm)
    const updatedProgram = await RadioProgramsAPI.updateOne(p)
    if (!updatedProgram) throw new Error('Can_t update programm')
    return updatedProgram
  }

  function createProgram(cellProps: ICellProps) {
    _resetProgramForm()
    scheduleStore.fillScheduleForm(cellProps)
    _fillProgramForm()
  }

  function programToForm(program: ProgramForm) {
    Object.assign(programForm, program)
  }

  async function addDefaultSchedule(programId: string) {
    const p = _findProgramById(programs, programId)
    scheduleStore.fillScheduleForm({ dayIndex: 0, timeIndex: 0 })
    const schedule = await scheduleStore.saveSchedule()
    p.schedule?.push(schedule)
    updateProgram(p)
  }

  async function saveProgram(program: ProgramForm) {
    programToForm(program)
    programForm.slug = transcript(programForm.title)

    if (isEditMode.value) {
      const updatedProgram = await updateProgram()
      _updateProgramInPrograms(programs, updatedProgram)
    } else {
      const program = await _saveProgram()
      _addProgramToPrograms(programs, program)
    }
  }

  async function _saveProgram() {
    const newProgram = await RadioProgramsAPI.save(programForm)
    if (!newProgram) throw new Error('Can_t save programm')
    return newProgram
  }

  function _fillProgramForm() {
    const defaultSchedule = cloneDeep(scheduleStore.scheduleForm)
    programForm.schedule = [defaultSchedule]
  }

  async function deleteProgram(programId: string) {
    const deletedProgramId = await RadioProgramsAPI.deleteOne({ id: programId })
    if (!deletedProgramId) throw new Error('Can_t delete program')
    _removeProgramFromPrograms(programs, deletedProgramId)
  }

  async function createScheduleCopy(
    schedule: ScheduleWithStyle,
    programId: string
  ) {
    const program = _findProgramById(programs, programId)
    const copiedSchedule = await scheduleStore.createCopy(schedule)
    _addSheduleToProgram(program.id, copiedSchedule.id)

    program.schedule?.push(copiedSchedule)
  }

  async function _addSheduleToProgram(programId: string, scheduleId: string) {
    await RadioProgramsAPI.addShedule({ programId, scheduleId })
  }

  function _resetProgramForm() {
    const keys = Object.keys(programForm) as (keyof typeof programForm)[]
    keys.forEach((key) => delete programForm[key])

    programForm.id = ''
    programForm.title = ''
    programForm.type = 'программа'
  }

  return {
    programs,
    programForm,
    pending,
    programsCount,
    isEditMode,
    programType,
    programTypes,
    isShowTypeFilter,
    filteredPrograms,
    fetchPrograms,
    createScheduleCopy,
    deleteScheduleFromProgram,
    createProgram,
    programToForm,
    saveProgram,
    addDefaultSchedule,
    deleteProgram,
  }
})

function _removeProgramFromPrograms(
  programs: Ref<ProgramForm[]>,
  programId: string
) {
  programs.value = programs.value.filter((program) => program.id !== programId)
}

function _removeScheduleFromProgram(program: ProgramForm, scheduleId: string) {
  program.schedule = program.schedule?.filter(
    (sItem) => sItem.id !== scheduleId
  )
}

function _addProgramToPrograms(
  programs: Ref<ProgramForm[]>,
  program: ProgramForm
) {
  programs.value.push(program)
}

function _updateProgramInPrograms(
  programs: Ref<ProgramForm[]>,
  program: ProgramForm
) {
  for (let i = 0; i < programs.value.length; i++) {
    if (programs.value[i].id === program.id) {
      programs.value[i] = program
      break
    }
  }
}

function _findProgramById(
  programs: Ref<ProgramForm[]>,
  programId: string
): ProgramForm {
  const p = programs.value.find((programsItem) => programsItem.id === programId)
  if (!p) throw new Error('Can_t find program by id')
  return p
}

function _convertScheduleToString(
  program: ProgramForm
): ProgramFormWithStringSchedule {
  const scheduleIds =
    program.schedule?.map((scheduleItem) => scheduleItem.id) || []
  return {
    ...program,
    schedule: scheduleIds,
  }
}
