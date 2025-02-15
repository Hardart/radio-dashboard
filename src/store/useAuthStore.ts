import { authAPI } from '@/api/auth-api'
import { useTokens } from '@/composables/useTokensDecode'
import { type User, type UserLoginForm } from '@/shared/schemes/user-schema'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const { decodeAccessToken, setAccessToken, cleanAccessToken } = useTokens()

  let dispatchIsReady: (value: boolean) => void

  const simplePromise = new Promise<boolean>((resolve) => {
    dispatchIsReady = resolve
  })
  const user = ref<User | null>(null)

  const isAuth = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.roles.includes('admin'))
  const isCreator = computed(() => user.value?.roles.includes('creator'))
  const hasRole = (role: 'admin' | 'creator' | 'host') =>
    user.value?.roles.includes(role)
  const isReady = simplePromise
  const pending = ref(false)

  function setUserFromToken(token: string) {
    setAccessToken(token)
    user.value = decodeAccessToken()
  }

  function clearTokens() {
    cleanAccessToken()
    user.value = null
  }

  async function login(userData: UserLoginForm) {
    pending.value = true
    const { data } = await authAPI.login(userData)
    pending.value = false
    if (!data.value) return
    user.value = data.value.user || null
    setAccessToken(data.value.accessToken)
  }

  async function loginAuto() {
    const { data } = await authAPI.checkToken()
    if (data.value?.userId) user.value = decodeAccessToken()
    dispatchIsReady(true)
  }

  async function logout() {
    pending.value = true
    await authAPI.logout()
    clearTokens()
    pending.value = false
    return
  }

  return {
    isAuth,
    isReady,
    isAdmin,
    isCreator,
    user,
    pending,
    login,
    loginAuto,
    logout,
    setUserFromToken,
    clearTokens,
    hasRole,
  }
})
