import { trackAPI } from '@/api/track-api'
import { useToggle } from '@/composables/useToggle'
import type { Track } from '@schema/track-schema'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTracksStore = defineStore('tracks', () => {
  const [isTrackEditModalOpen, toggleEditTrackModalState] = useToggle()

  const pending = ref(false)
  const tracks = ref<Track[]>([])
  const track = ref<Track>()

  const page = ref(1)
  const pageCount = ref(20)
  const artistFilter = ref('')
  const withCover = ref(false)

  const filteredTracks = computed(() => {
    const withoutCoverTracks = withCover.value
      ? tracks.value.filter((track) => track.cover.charAt(0) == '/')
      : tracks.value
    const filtered = withoutCoverTracks.filter(
      (track) =>
        track.artistName
          .toLowerCase()
          .includes(artistFilter.value.toLowerCase()) ||
        track.trackTitle
          .toLowerCase()
          .includes(artistFilter.value.toLowerCase())
    )

    return filtered
  })

  const filteredCount = computed(() => {
    if (tracks.value.length !== filteredTracks.value.length) page.value = 1
    return filteredTracks.value.length
  })

  const tracksCount = computed(() => tracks.value.length)

  const tracksByPage = computed(() => {
    return filteredTracks.value.slice(
      (page.value - 1) * pageCount.value,
      page.value * pageCount.value
    )
  })

  const isShowPagination = computed(() => filteredCount.value > pageCount.value)

  async function fetchTracks() {
    pending.value = true
    const res = await trackAPI.list()
    tracks.value = res
    pending.value = false
  }

  return {
    fetchTracks,
    toggleEditTrackModalState,
    tracksByPage,
    tracks,
    tracksCount,
    page,
    pageCount,
    artistFilter,
    filteredCount,
    isShowPagination,
    pending,
    withCover,
  }
})
