<script setup lang="ts">
import { storeToRefs } from 'pinia'
import HdBadge from '@ui/hdBadge/hdBadge.vue'
import HdButton from '@ui/hdButton/hdButton.vue'
import { useNewsStore } from '@/store/useNewsStore'
import { getStatus } from '@/shared/helpers/set-status'
import { normalizeDate } from '@/shared/helpers/date'
import HdTable from '@/components/ui/hdTable/hdTable.vue'

const newsStore = useNewsStore()
const { articlesFilteredByTitle, pending, error } = storeToRefs(newsStore)
newsStore.fetchArticles()

const columns = [
  {
    key: 'title',
    label: 'Название новости',
    sortable: true,
  },
  {
    key: 'category',
    label: 'Категория',
  },
  {
    key: 'createdAt',
    label: 'Дата создания',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Статус публикации',
  },
]
</script>

<template>
  <div class="news__body">
    <h3 v-if="pending"><span>Загрузка...</span></h3>
    <h1 v-else-if="error">{{ error }}</h1>
    <HdTable
      v-else
      :columns
      :data="articlesFilteredByTitle"
      :link="{ basePath: '/news', itemKey: 'id' }"
    >
      <template #title-column="{ item }">
        <div>{{ item.title }}</div>
      </template>
      <template #category-column="{ item }">
        <div>{{ item.category.title }}</div>
      </template>
      <template #createdAt-column="{ item }">
        <div>{{ normalizeDate(item.createdAt) }}</div>
      </template>
      <template #status-column="{ item }">
        <HdBadge :text="item.status" :type="getStatus(item.status)" />
      </template>
    </HdTable>
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
