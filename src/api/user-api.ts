import { useHdFetch } from './base-fetch/base-fetch'
import type { ResponseApi } from '@/shared/types/ResponseAPI'
import type { HostFormData } from '@/shared/schemes/host-schema'
import type { User } from '@/shared/schemes/user-schema'
interface UserResponse {
  accessToken: string
  refreshToken: string
}
export const userAPI = {
  async update(body: HostFormData) {
    return await useHdFetch<UserResponse>('/user-update', { body })
  },

  async list() {
    const { data } = await useHdFetch<ResponseApi.UserList>('/user-list')
    return data.value?.users || []
  },

  async addOne(body: HostFormData) {
    const { data } = await useHdFetch<{ user: User }>('/user-add', { body })
    return data.value?.user
  },

  async deleteOne(id: string) {
    const { data } = await useHdFetch<{ user: User }>('/user-delete', {
      body: { id },
    })
    return data.value?.user
  },
}
