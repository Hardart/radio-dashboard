import { type Toast } from '@/components/ui/hdNotification/useNotifications'
import { useTokens, type Tokens } from '@/composables/useTokensDecode'
import { useAuthStore } from '@/store/useAuthStore'
import {
  type FetchContext,
  type FetchResponse,
  type FetchOptions,
  ofetch,
} from 'ofetch'
import { onDefaultRequest } from './onDefaultRequest'

type ResponseCtx = FetchContext & { response: FetchResponse<ResponseType> }

async function onRefreshResponseError({ response }: ResponseCtx) {
  const { cleanAccessToken } = useTokens()
  if (response.status !== 401) return
  cleanAccessToken()
}

export const onResponseErrorHandler = (toast: Toast, tokens: Tokens) => {
  const refreshOptions: FetchOptions = {
    baseURL: '/api',
    credentials: 'include',
    method: 'POST',
    onResponseError: onRefreshResponseError,
    onRequest: onDefaultRequest(tokens),
  }
  return async function onDefaultResponseError({ response }: ResponseCtx) {
    const authStore = useAuthStore()
    switch (response.status) {
      case 401:
        try {
          const res = await ofetch('/refresh', refreshOptions)
          if (res.status === 'success') {
            authStore.setUserFromToken(res.data.accessToken)
          }
        } catch (error) {
          console.error(error)
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
