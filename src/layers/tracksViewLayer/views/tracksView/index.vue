<script setup lang="ts">
import HdPagination from '@/components/ui/hdPagination/hdPagination.vue'
import HdTable from '@/components/ui/hdTable/hdTable.vue'
import DashboardContentLayout from '@/layouts/dashboardContentLayout.vue'
import { normalizeDate } from '@/shared/helpers/date'
import { useTracksStore } from '@/store/useTracksStore'
import HdButton from '@ui/hdButton/hdButton.vue'
import { storeToRefs } from 'pinia'
const tracksStore = useTracksStore()
const { tracksByPage, page, pageCount, tracksCount } = storeToRefs(tracksStore)
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
</script>

<template>
  <DashboardContentLayout header footer>
    <template #header>
      <div class="news__header">
        <h3 class="news__title">Треки</h3>
        <HdButton
          icon="news"
          text="Создать"
          color="primary"
          variant="link"
          @click="$router.push('/news/create')"
        />
      </div>
    </template>

    <HdTable :data="tracksByPage" :columns>
      <template #cover-column="{ item }">
        <div class="track__cover">
          <img :src="item.cover" />
        </div>
      </template>
      <template #createdAt-column="{ item }">
        <span>{{ normalizeDate(item.createdAt) }}</span>
      </template>
    </HdTable>
    <template #footer>
      <HdPagination v-model="page" :page-count :total="tracksCount" />
    </template>
  </DashboardContentLayout>
</template>

<style lang="scss" scoped src="./style.scss" />
