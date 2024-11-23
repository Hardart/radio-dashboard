import type { Tokens } from '@/composables/useTokensDecode'
import { type FetchContext } from 'ofetch'

export const onDefaultRequest = (tokens: Tokens) => {
  return ({ options }: FetchContext) => {
    const token = tokens.getAccessToken()
    if (token !== null)
      options.headers.append('authorization', `Bearer ${token}`)
  }
}
