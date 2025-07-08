<script setup lang="ts">
import type { ITunesTrack } from '@type/itunes'
import type { Track } from '@schema/track-schema'
import * as ContentLayout from '@contentLayout'
import * as UI from '@ui'
import { provide, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useToggle } from '@vueuse/core'
import { trackAPI } from '@/api/track-api'
import { normalizeDate } from '@/shared/helpers/date'
import TrackEditor from '../../components/trackEditor/TrackEditor.vue'
import { initCoords, coords } from '@/components/ui/hdContextMenu/hdContextMenu'
import { useTracksStore } from '@/store/useTracksStore'

const tracksStore = useTracksStore()

const {
  tracksByPage,
  page,
  pageCount,
  tracksCount,
  tracks,
  artistFilter,
  filteredCount,
  isShowPagination,
  pending,
  withCover,
} = storeToRefs(tracksStore)

tracksStore.fetchTracks()

const columns = [
  {
    key: 'cover',
    label: '',
    class: 'width-shrink',
  },
  {
    key: 'artistName',
    label: 'Исполнитель',
    class: 'width-l',
  },
  {
    key: 'trackTitle',
    label: 'Название песни',
  },
  {
    key: 'createdAt',
    label: 'Дата создания',
    class: 'width-m',
  },
]

const trackItem = ref<Track>()

const [isOpenContext, toggleContextState] = useToggle()
const [isOpenEditor, toggleEditorState] = useToggle()

const onContext = (item: Track) => {
  initCoords()
  toggleContextState(true)
  trackItem.value = { ...item }
}

const onEdit = () => {
  toggleContextState(false)
  toggleEditorState(true)
}

const onApply = async () => {
  if (!trackItem.value) return
  changeTrack(trackItem.value)
  await trackAPI.updateTrack(trackItem.value)
  onCancel()
}

const onCancel = () => {
  trackItem.value = undefined
  toggleEditorState(false)
}

const onDelete = () => {
  tracks.value = tracks.value.filter(
    (track) => track.id !== trackItem.value?.id
  )
  toggleContextState(false)
}

const onSetITunesTrack = (track: ITunesTrack) => {
  if (!trackItem.value) return
  const { artistName, previewUrl, artworkUrl60, trackName } = track
  trackItem.value.artistName = artistName
  trackItem.value.trackTitle = trackName
  trackItem.value.cover = artworkUrl60
  trackItem.value.preview = previewUrl
}

provide('iTunesTrack', onSetITunesTrack)

function changeTrack(track: Track) {
  const idx = tracks.value.map((item) => item.id).indexOf(track.id)
  tracks.value.splice(idx, 1, track)
}
</script>

<template>
  <ContentLayout.Root>
    <ContentLayout.Header title="Треки">
      <template #header>
        <UI.Badge :label="tracksCount" type="warning" />
      </template>
      <div class="dashboard__header--right">
        <UI.Badge
          :label="filteredCount"
          type="warning"
          v-if="artistFilter.trim().length"
        />
        <UI.Input
          icon="search"
          placeholder="поиск треков"
          v-model="artistFilter"
        />
        <UI.Switch v-model="withCover" />
      </div>
    </ContentLayout.Header>
    <ContentLayout.Body no-padding>
      <UI.Table
        size="s"
        :data="tracksByPage"
        :columns
        :page
        :pending
        @on-context="onContext"
      >
        <template #cover-column="{ item }">
          <div class="track__cover">
            <img v-if="item.cover" :src="item.cover" />
          </div>
        </template>
        <template #createdAt-column="{ item }">
          <span>{{ normalizeDate(item.createdAt) }}</span>
        </template>
      </UI.Table>
    </ContentLayout.Body>
    <ContentLayout.Footer v-if="isShowPagination">
      <UI.Pagination v-model="page" :page-count :total="filteredCount" />
    </ContentLayout.Footer>
  </ContentLayout.Root>
  <Teleport to=".dashboard__content" defer>
    <TrackEditor
      v-if="trackItem && isOpenEditor"
      :track="trackItem"
      @on-apply="onApply"
      @on-cancel="onCancel"
    />
  </Teleport>
  <Teleport to=".dashboard__content" defer>
    <UI.ContextMenu
      v-model="isOpenContext"
      :coords
      @on-edit="onEdit"
      @on-delete="onDelete"
    />
  </Teleport>
</template>

<style lang="scss" scoped src="./style.scss" />
