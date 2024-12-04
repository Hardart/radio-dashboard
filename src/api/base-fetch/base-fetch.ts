import { ofetch, type FetchOptions } from 'ofetch'
import { ref } from 'vue'
import defu from 'defu'
import { onDefaultRequest } from './onDefaultRequest'
import { onResponseErrorHandler } from './onResponseError'
import type { CustomResponse } from '@/shared/types/ResponseAPI'
import { useNotifications } from '@/components/ui/hdNotification/useNotifications'
import { useTokens } from '@/composables/useTokensDecode'

export const useHdFetch = async <T>(
  url: string,
  options?: FetchOptions<'json'>
) => {
  const toast = useNotifications()
  const tokens = useTokens()
  const data = ref<T>()
  const error = ref()

  const defaultOptions: FetchOptions<'json'> = {
    baseURL: '/api',
    method: 'POST',
    onRequest: onDefaultRequest(tokens),
    onResponseError: onResponseErrorHandler(toast, tokens),
    credentials: 'include',
  }

  const fetchOptions = defu(options, defaultOptions)

  try {
    const response = await ofetch<CustomResponse<T>>(url, fetchOptions)
    if (response.status == 'success') data.value = response.data
  } catch (err) {
    error.value = err
  }

  return { data, error }
}
