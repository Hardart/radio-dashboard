import type { ResponseApi } from '@type/ResponseAPI'
import type { ScheduleWithStyle, Schedule } from '@schema/schedule-schema'
import { useHdFetch } from './base-fetch/base-fetch'

export const ScheduleAPI = {
  async save(body: ScheduleWithStyle) {
    const { data } = await useHdFetch<ResponseApi.Schedule>('/schedule-add', {
      body,
      baseURL: '/test_api',
    })
    return data.value?.schedule
  },

  async deleteOne(body: { id: string }) {
    const { data } = await useHdFetch<ResponseApi.Schedule>(
      '/schedule-delete',
      { body, baseURL: '/test_api' },
      { text: 'Расписание успешно удалено', duration: 1500 }
    )
    return data.value?.schedule
  },

  async updateOne(body: ScheduleWithStyle) {
    const { data } = await useHdFetch<ResponseApi.Schedule>(
      '/schedule-update',
      { body, baseURL: '/test_api' },
      { text: 'Расписание успешно обновлено', duration: 1500 }
    )
    return data.value?.schedule
  },
  async updateMany(body: Schedule[]) {
    const { data } = await useHdFetch<{ result: boolean }>(
      '/schedule-update-many',
      { body, baseURL: '/test_api' },
      { text: 'Расписание обновлено', duration: 1500 }
    )
    return data.value?.result
  },
}
