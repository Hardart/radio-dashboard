<script setup lang="ts">
import { storeToRefs } from 'pinia'
import HdBadge from '@hd/hdBadge/hdBadge.vue'
import { useNewsStore } from '@/layers/newsViewLayer/store/useNewsStore'
import { getStatus } from '@/shared/helpers/set-status'
import { normalizeDate } from '@/shared/helpers/date'
import HdTable from '@/components/ui/hdTable/hdTable.vue'

const newsStore = useNewsStore()
const { articlesFilteredByTitle, pending, error } = storeToRefs(newsStore)

const columns = [
  {
    key: 'title',
    label: 'Название новости',
    sortable: true,
    class: 'width-expand',
  },
  {
    key: 'category',
    label: 'Категория',
    class: 'width-m',
  },
  {
    key: 'createdAt',
    label: 'Дата создания',
    sortable: true,
    class: 'width-m',
  },
  {
    key: 'publishAt',
    label: 'Дата публикации',
    sortable: true,
    class: 'width-m',
  },
  {
    key: 'status',
    label: 'Статус',
    class: 'width-s',
  },
]
</script>

<template>
  <HdTable
    :columns
    :data="articlesFilteredByTitle"
    :link="{ basePath: '/news', itemKey: 'id' }"
    :pending
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
    <template #publishAt-column="{ item }">
      <div>{{ normalizeDate(item.publishAt) }}</div>
    </template>
    <template #status-column="{ item }">
      <HdBadge :label="item.status" :type="getStatus(item.status)" />
    </template>
  </HdTable>
</template>

<style lang="scss" scoped src="./style.scss" />
