<script setup lang="ts">
import HdPagination from '@/components/ui/hdPagination/hdPagination.vue'
import HdTable from '@/components/ui/hdTable/hdTable.vue'
import DashboardContentBodyLayout from '@/layouts/dashboardContentBodyLayout.vue'
import DashboardContentHeaderLayout from '@/layouts/dashboardContentHeaderLayout.vue'
import DashboardContentLayout from '@/layouts/dashboardContentLayout.vue'
import { normalizeDate } from '@/shared/helpers/date'
import { useTracksStore } from '@/store/useTracksStore'
import { storeToRefs } from 'pinia'
import { provide, ref } from 'vue'
import TrackEditor from '../../components/trackEditor/TrackEditor.vue'
import type { Track } from '@/shared/schemes/track-schema'
import type { ITunesTrack } from '@/shared/types/itunes'
import DashboardContentFooterLayout from '@/layouts/dashboardContentFooterLayout.vue'
import { trackAPI } from '@/api/track-api'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdBadge from '@/components/ui/hdBadge/hdBadge.vue'
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
} = storeToRefs(tracksStore)
tracksStore.fetchTracks()
const columns = [
  {
    key: 'cover',
    label: '',
    class: 'auto-width',
  },
  {
    key: 'artistName',
    label: 'Исполнитель',
    class: 'auto-width',
  },
  {
    key: 'trackTitle',
    label: 'Название песни',
  },
  {
    key: 'createdAt',
    label: 'Дата создания',
  },
]
const trackItem = ref<Track>()

const onContext = (item: Track) => {
  trackItem.value = { ...item }
}
const onEdit = (item: unknown) => {
  console.log(item)
}

const onApply = async () => {
  if (!trackItem.value) return
  changeTrack(trackItem.value)
  await trackAPI.updateTrack(trackItem.value)
  onCancel()
}

const onCancel = () => {
  trackItem.value = undefined
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
  <DashboardContentLayout header footer>
    <DashboardContentHeaderLayout>
      <div class="dashboard__header--left">
        <h3 class="dashboard__header-title">Треки</h3>
        <HdBadge :label="tracksCount" type="warning" />
      </div>
      <div class="dashboard__header--right">
        <HdBadge
          :label="filteredCount"
          type="warning"
          v-if="artistFilter.trim().length"
        />
        <HdInput icon="search" v-model="artistFilter" />
      </div>
    </DashboardContentHeaderLayout>
    <DashboardContentBodyLayout>
      <HdTable :data="tracksByPage" :columns @on-item="onContext" :page>
        <template #cover-column="{ item }">
          <div class="track__cover">
            <img :src="item.cover" />
          </div>
        </template>
        <template #createdAt-column="{ item }">
          <span>{{ normalizeDate(item.createdAt) }}</span>
        </template>
      </HdTable>
    </DashboardContentBodyLayout>
    <DashboardContentFooterLayout v-if="isShowPagination">
      <HdPagination v-model="page" :page-count :total="filteredCount" />
    </DashboardContentFooterLayout>
  </DashboardContentLayout>
  <Teleport to=".dashboard__content">
    <TrackEditor
      v-if="trackItem"
      :track="trackItem"
      @on-apply="onApply"
      @on-cancel="onCancel"
    />
  </Teleport>
</template>

<style lang="scss" scoped src="./style.scss" />
