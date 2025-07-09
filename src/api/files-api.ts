import type { ResponseApi } from '@type/ResponseAPI'
import { useHdFetch } from './base-fetch/base-fetch'
import { UploadPath } from '@/shared/enums/upload-path-url'

export const filesAPI = {
  async list(path: string) {
    const { data } = await useHdFetch<ResponseApi.FileList>('/files', {
      body: { src: path },
    })
    return data.value?.files
  },

  async single(url: UploadPath, body: FormData) {
    const { data } = await useHdFetch<ResponseApi.FileSingle>(url, { body })
    return data.value?.path
  },

  async deleteSingle(url: keyof typeof UploadPath, body: { path: string }) {
    const { data } = await useHdFetch<{ file: object }>(UploadPath[url], {
      body,
    })
    return data.value?.file
  },
}
