<script setup lang="ts">
import HdTable from '@/components/ui/hdTable/hdTable.vue'
import DashboardContentLayout from '@/layouts/dashboardContentLayout.vue'
import { normalizeDate } from '@/shared/helpers/date'
import { useTracksStore } from '@/store/useTracksStore'
import HdButton from '@ui/hdButton/hdButton.vue'
import { storeToRefs } from 'pinia'
const tracksStore = useTracksStore()
const { tracksByPage } = storeToRefs(tracksStore)
tracksStore.fetchTracks()
const columns = [
  {
    key: 'artistName',
    label: 'Исполнитель',
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
  <DashboardContentLayout header>
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
      <template #createdAt-column="{ item }">
        <span>{{ normalizeDate(item.createdAt) }}</span>
      </template>
    </HdTable>
  </DashboardContentLayout>
</template>

<style lang="scss" scoped src="./style.scss" />
