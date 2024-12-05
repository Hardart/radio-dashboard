import { useTokens } from '@/composables/useTokensDecode'
import { type FetchContext } from 'ofetch'

export const onDefaultRequest = ({ options }: FetchContext) => {
  const { getAccessToken } = useTokens()
  const token = getAccessToken()
  if (token !== null) options.headers.set('authorization', `Bearer ${token}`)
}
