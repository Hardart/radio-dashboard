import type { ResponseApi } from '@/shared/types/ResponseAPI'
import { useHdFetch } from './base-fetch/base-fetch'

export const galleryAPI = {
  async list() {
    const { data } = await useHdFetch<ResponseApi.SlideList>('/gallery')
    return data.value?.slides || []
  },
}
