import { type Toast } from '@/components/ui/hdNotification/useNotifications'
import { useTokens, type Tokens } from '@/composables/useTokensDecode'
import { useAuthStore } from '@/store/useAuthStore'
import {
  type FetchContext,
  type FetchResponse,
  type FetchOptions,
  ofetch,
} from 'ofetch'

type ResponseCtx = FetchContext & { response: FetchResponse<ResponseType> }

const refreshOptions: FetchOptions = {
  baseURL: '/api',
  credentials: 'include',
  method: 'POST',
  onResponseError: onRefreshResponseError,
}

async function onRefreshResponseError({ response }: ResponseCtx) {
  const { cleanAccessToken } = useTokens()
  if (response.status !== 401) return
  cleanAccessToken()
}

export const onResponseErrorHandler = (toast: Toast) => {
  return async function onDefaultResponseError({ response }: ResponseCtx) {
    const authStore = useAuthStore()
    switch (response.status) {
      case 401:
        const res = await ofetch('/refresh', refreshOptions)
        if (res.status === 'success') {
          authStore.setUserFromToken(res.data.accessToken)
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
}
