import type { ResponseApi } from '@/shared/types/ResponseAPI'
import { useHdFetch } from './base-fetch/base-fetch'
import type { Program } from '@/shared/schemes/program-schema'
import type { ProgramForm } from '@/shared/schemes/program-form-schema'

export const ProgramsAPI = {
  async list() {
    const { data } = await useHdFetch<ResponseApi.ProgramList>('/program-list')
    const programs = data.value?.programs || []
    const hosts = data.value?.hosts || []
    return { programs, hosts }
  },

  async save(body: ProgramForm) {
    const { data } = await useHdFetch<ResponseApi.ProgramSngle>(
      '/program-add',
      { body },
      { text: 'Программа успешно добавлена' }
    )
    return data.value?.program
  },

  async deleteOne(body: { id: string }) {
    const { data } = await useHdFetch<ResponseApi.ProgramSngle>(
      '/program-delete',
      { body },
      { text: 'Программа успешно удалена' }
    )
    return data.value?.program
  },

  async updateOne(body: ProgramForm) {
    const { data } = await useHdFetch<ResponseApi.ProgramSngle>(
      '/program-update',
      { body },
      { text: 'Программа успешно обновлена' }
    )
    return data.value?.program
  },
}
