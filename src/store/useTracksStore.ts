import { trackAPI } from '@/api/track-api'
import { useToggle } from '@/composables/useToggle'
import type { Track } from '@/shared/schemes/track-schema'
import type { ITunesTrack } from '@/shared/types/itunes'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTracksStore = defineStore('tracks', () => {
  const [isTrackEditModalOpen, toggleEditTrackModalState] = useToggle()

  const loading = ref(false)
  const tracks = ref<Track[]>([])
  const track = ref<Track>()

  const page = ref(1)
  const pageCount = ref(20)

  const artistFilter = ref('')
  const tracksCount = computed(() => tracks.value.length)
  const filteredCount = ref(0)

  const filteredTracks = computed(() => {
    const filtered = tracks.value.filter(
      (track) =>
        track.artistName
          .toLowerCase()
          .includes(artistFilter.value.toLowerCase()) ||
        track.trackTitle
          .toLowerCase()
          .includes(artistFilter.value.toLowerCase())
    )
    filteredCount.value = filtered.length

    if (filteredCount.value !== tracksCount.value) page.value = 1
    return filtered
  })

  const tracksByPage = computed(() => {
    return filteredTracks.value.slice(
      (page.value - 1) * pageCount.value,
      page.value * pageCount.value
    )
  })

  async function fetchTracks() {
    const res = await trackAPI.list()
    tracks.value = res
  }

  function setTrackMetaInfoFromITunes({
    artistName,
    previewUrl,
    artworkUrl60,
    trackName,
  }: ITunesTrack) {}

  function storeRefs() {
    return {
      tracks,
      tracksCount,
      tracksByPage,
      pageCount,
      page,
      artistFilter,
      filteredCount,
      track,
      isTrackEditModalOpen,
      loading,
    }
  }

  return {
    fetchTracks,
    toggleEditTrackModalState,
    tracksByPage,
    tracks,
    tracksCount,
    page,
    pageCount,
  }
})
