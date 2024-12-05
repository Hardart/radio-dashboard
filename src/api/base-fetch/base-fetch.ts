import { ofetch, type FetchOptions } from 'ofetch'
import { ref } from 'vue'
import defu from 'defu'
import { onDefaultRequest } from './onDefaultRequest'
import { onDefaultResponseError } from './onResponseError'
import type { CustomResponse } from '@/shared/types/ResponseAPI'

export const useHdFetch = async <T>(
  url: string,
  options?: FetchOptions<'json'>
) => {
  const data = ref<T>()
  const error = ref()

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
  } catch (err) {
    error.value = err
  }

  return { data, error }
}
