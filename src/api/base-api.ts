import type { ResponseApi } from '@type/ResponseAPI'
import { useHdFetch } from './base-fetch/base-fetch'
import { toValue } from 'vue'
import { addFullAddressKey } from '@/shared/helpers/add-full-address'

export const BaseAPI = {
  async baseData() {
    const { data } = await useHdFetch<ResponseApi.BaseContacts>('/base')
    const res = toValue(data)
    if (!res) {
      return null
    } else {
      res.addresses = res.addresses.map(addFullAddressKey)
      return res
    }
  },
}
