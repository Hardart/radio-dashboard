import { useNotifications } from '@/components/ui/hdNotification/useNotifications'
import { useTokens } from '@/composables/useTokensDecode'
import { useAuthStore } from '@/store/useAuthStore'
import {
  type FetchContext,
  type FetchResponse,
  type FetchOptions,
  ofetch,
} from 'ofetch'

type ResponseCtx = FetchContext & { response: FetchResponse<ResponseType> }

async function onRefreshResponseError({ response }: ResponseCtx) {
  if (response.status !== 401) return
  const authStore = useAuthStore()
  authStore.clearTokens()
}

async function onRefreshResponse({ response }: ResponseCtx) {
  if (response.status === 200) {
    const authStore = useAuthStore()
    authStore.setUserFromToken(response._data.data.accessToken)
  }
}

export const onDefaultResponseError = async ({ response }: ResponseCtx) => {
  const toast = useNotifications()

  const refreshOptions: FetchOptions = {
    baseURL: '/api',
    credentials: 'include',
    method: 'POST',
    onResponseError: onRefreshResponseError,
    onResponse: onRefreshResponse,
  }

  switch (response.status) {
    case 401:
      try {
        await ofetch('/refresh', refreshOptions)
      } catch (error) {
        // console.error(error)
      }
      break

    case 500:
      toast.add({ text: 'Ошибка 500, пока не обработана' })
      break
    default:
      console.warn('DEFAULT ERROR')

      toast.add({
        text: response._data.message,
        duration: 8000,
        status: 'primary',
        icon: 'lock',
      })
  }
}
