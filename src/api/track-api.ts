import type { ITunesResponse } from '@/shared/types/itunes'
import { useHdFetch } from './base-fetch/base-fetch'
import type { ResponseApi } from '@/shared/types/ResponseAPI'
import { ofetch } from 'ofetch'
import type { Track } from '@/shared/schemes/track-schema'

export const trackAPI = {
  async list() {
    const { data } = await useHdFetch<ResponseApi.TrackList>('/track-list')
    return data.value?.tracks || []
  },

  async updateTrack(body: Track) {
    const { data } = await useHdFetch<ResponseApi.TrackSingle>(
      '/track-update',
      { body },
      { text: 'Трек успешно обновлен' }
    )
    return data.value
  },

  async getITunesMetadata(term: string) {
    const url = 'https://itunes.apple.com/search'
    const options = {
      query: { term, limit: '10', entity: 'song', media: 'music' },
      parseResponse: JSON.parse,
    }

    const response = await ofetch<ITunesResponse>(url, options)
    return response.results.length ? response.results : []
  },
}
