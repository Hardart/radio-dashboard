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
  console.log('refresh response')
}

export const onDefaultResponseError = async ({ response }: ResponseCtx) => {
  const toast = useNotifications()
  const authStore = useAuthStore()

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
        const res = await ofetch('/refresh', refreshOptions)

        console.log(res.data)

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
