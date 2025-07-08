import type { ResponseApi } from '@type/ResponseAPI'
import { useHdFetch } from './base-fetch/base-fetch'
import type {
  ProgramForm,
  ProgramFormWithStringSchedule,
} from '@schema/program-form-schema'

export const RadioProgramsAPI = {
  async list() {
    const { data } = await useHdFetch<ResponseApi.RadioProgramList>(
      '/program-list',
      { baseURL: '/test_api' }
    )
    const programs = data.value?.programs || []
    const hosts = data.value?.hosts || []
    return { programs, hosts }
  },

  async save(body: ProgramForm) {
    const { data } = await useHdFetch<ResponseApi.RadioProgramSngle>(
      '/program-add',
      { body, baseURL: '/test_api' },
      { text: 'Программа успешно добавлена', duration: 1500 }
    )
    return data.value?.program
  },

  async deleteOne(body: { id: string }) {
    const { data } = await useHdFetch<ResponseApi.RadioProgramId>(
      '/program-delete',
      { body, baseURL: '/test_api' },
      { text: 'Программа успешно удалена', duration: 1500 }
    )
    return data.value?.id
  },

  async deleteShedule(body: { programId: string; scheduleId: string }) {
    const { data } = await useHdFetch<ResponseApi.RadioProgramSngle>(
      '/program-delete-schedule',
      { body, baseURL: '/test_api' },
      { text: 'Расписание удалено', duration: 1500 }
    )
    return data.value?.program
  },

  async addShedule(body: { programId: string; scheduleId: string }) {
    const { data } = await useHdFetch<ResponseApi.RadioProgramSngle>(
      '/program-add-schedule',
      { body, baseURL: '/test_api' },
      { text: 'Расписание добавлено', duration: 1500 }
    )
    return data.value?.program
  },

  async updateOne(body: ProgramFormWithStringSchedule) {
    const { data } = await useHdFetch<ResponseApi.RadioProgramSngle>(
      '/program-update',
      { body, baseURL: '/test_api' },
      { text: 'Программа успешно обновлена', duration: 1500 }
    )
    return data.value?.program
  },
}
