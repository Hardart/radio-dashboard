import { ofetch, type FetchOptions } from 'ofetch'
import { ref } from 'vue'
import defu from 'defu'
import { onDefaultRequest } from './onDefaultRequest'
import { onDefaultResponseError } from './onResponseError'
import type { CustomResponse } from '@type/ResponseAPI'
import {
  type Notification,
  useNotifications,
} from '@hd/hdNotification/useNotifications'

export const useHdFetch = async <T>(
  url: string,
  options?: FetchOptions<'json'>,
  toastItem?: Omit<Notification, 'id'>
) => {
  const data = ref<T>()
  const error = ref<ErrorEvent>()
  const toast = useNotifications()
  const defaultOptions: FetchOptions<'json'> = {
    baseURL: options?.baseURL ?? '/api',
    method: 'POST',
    onRequest: onDefaultRequest,
    onResponseError: onDefaultResponseError,
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
    if (err instanceof ErrorEvent) error.value = err
  }

  return { data, error }
}
