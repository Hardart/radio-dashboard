import type { ResponseApi } from '@/shared/types/ResponseAPI'
import { useHdFetch } from './base-fetch/base-fetch'
import { toValue, type MaybeRef } from 'vue'
import type { Slide } from '@/shared/schemes/slide-schema'

export const galleryAPI = {
  async list() {
    const { data } = await useHdFetch<ResponseApi.SlideList>('/gallery')
    return data.value?.slides || []
  },

  async saveAllSlides(body: MaybeRef<Slide[]>) {
    body = toValue(body)
    const { data } = await useHdFetch<ResponseApi.SlideList>(
      '/gallery-update',
      { body }
    )
    return data.value?.slides || []
  },

  async deleteOne(body: { id: string }) {
    body = toValue(body)

    const { data } = await useHdFetch<ResponseApi.SlideDelete>(
      '/gallery-delete-single',
      { body },
      { text: 'Слайд успешно удален' }
    )

    return data.value
  },
}
