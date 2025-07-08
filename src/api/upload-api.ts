import type { ResponseApi } from '@type/ResponseAPI'
import { useHdFetch } from './base-fetch/base-fetch'
import { UploadPath } from '@/shared/enums/upload-path-url'

export const filesAPI = {
  async single(urlKey: keyof typeof UploadPath, body: FormData) {
    const { data } = await useHdFetch<ResponseApi.FileSingle>(
      UploadPath[urlKey],
      { body }
    )
    const path = data.value?.path || undefined
    return { path }
  },
}
