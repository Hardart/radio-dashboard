import { authAPI } from '@/api/auth-api'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { useTokens } from '@/composables/useTokensDecode'
import { type User, type UserLoginForm } from '@/shared/schemes/user-schema'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const { decodeAccessToken, setAccessToken, cleanAccessToken } = useTokens()
  const isLocalAuth = useLocalStorage('is_auth')
  let dispatchIsReady: (value: boolean) => void

  const simplePromise = new Promise<boolean>((resolve) => {
    dispatchIsReady = resolve
  })
  const user = ref<User | null>(null)

  const isAuth = computed(() => user.value !== null)
  const isReady = simplePromise

  function setUserFromToken(token: string) {
    setAccessToken(token)
    user.value = decodeAccessToken()
  }

  async function login(userData: UserLoginForm) {
    const { data } = await authAPI.login(userData)
    if (!data.value) return
    isLocalAuth.value = true
    user.value = data.value.user || null
    setAccessToken(data.value.accessToken)
  }

  async function loginAuto() {
    if (isLocalAuth.value) {
      const { data } = await authAPI.checkToken()
      if (data.value?.userId) user.value = decodeAccessToken()
    }

    dispatchIsReady(true)
  }

  async function logout() {
    await authAPI.logout()
    isLocalAuth.value = null
    cleanAccessToken()
    user.value = null
    return
  }

  return { isAuth, isReady, user, login, loginAuto, logout, setUserFromToken }
})
