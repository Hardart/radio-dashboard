import { type UserLoginForm } from '@/shared/schemes/user-schema'
import { useHdFetch } from './base-fetch/base-fetch'
import type { ResponseApi } from '@/shared/types/ResponseAPI'

export const authAPI = {
  async registration(body: object) {
    return await useHdFetch<ResponseApi.RegistrationData>('/registration', {
      body,
    })
  },

  async login(body: UserLoginForm) {
    return await useHdFetch<ResponseApi.LoginData>('/login', { body })
  },

  async logout() {
    return await useHdFetch<unknown>('/logout')
  },

  async checkToken() {
    return await useHdFetch<ResponseApi.TokenCheck>('/check')
  },
}
