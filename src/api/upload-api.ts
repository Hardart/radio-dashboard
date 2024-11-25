import type { ResponseApi } from '@/shared/types/ResponseAPI'
import { useHdFetch } from './base-fetch/base-fetch'

export const filesAPI = {
  async single(body: FormData) {
    const { data } = await useHdFetch<ResponseApi.FileSingle>('/image-news', {
      body,
    })
    const path = data.value?.path || undefined
    return { path }
  },
}
