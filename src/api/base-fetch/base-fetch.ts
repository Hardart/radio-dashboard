import { ofetch, type FetchOptions } from 'ofetch'
import { ref } from 'vue'
import defu from 'defu'
import { onDefaultRequest } from './onDefaultRequest'
import { onDefaultResponseError } from './onResponseError'
import type { CustomResponse } from '@/shared/types/ResponseAPI'
import {
  useNotifications,
  type Notification,
} from '@/components/ui/hdNotification/useNotifications'

export const useHdFetch = async <T>(
  url: string,
  options?: FetchOptions<'json'>,
  toastItem?: Omit<Notification, 'id'>
) => {
  const data = ref<T>()
  const error = ref()
  const toast = useNotifications()
  const defaultOptions: FetchOptions<'json'> = {
    baseURL: '/api',
    method: 'POST',
    onRequest: onDefaultRequest,
    onResponseError: onDefaultResponseError,
    retryStatusCodes: [401],
    retry: 1,
  }

  const fetchOptions = defu(options, defaultOptions)

  try {
    const response = await ofetch<CustomResponse<T>>(url, fetchOptions)
    if (response.status == 'success') data.value = response.data
    if (toastItem)
      toast.add({
        status: 'success',
        icon: 'check',
        ...toastItem,
      })
  } catch (err) {
    error.value = err
    toast.add({ text: `${err}`, status: 'warning' })
  }

  return { data, error }
}
