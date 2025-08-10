<script setup lang="ts">
import * as UI from '@ui'
import { getStatus } from '@/shared/helpers/set-status'
import { normalizeDate } from '@/shared/helpers/date'
import { useCategoriesStore } from '@/store/useCategoriesStore'

const categoriesStore = useCategoriesStore()

const columns = [
  {
    key: 'title',
    label: 'Название категории',
    class: 'width-expand',
  },
  {
    key: 'createdAt',
    label: 'Дата создания',
    class: 'width-m',
  },
]
</script>

<template>
  <UI.Table :columns :data="categoriesStore.categories">
    <template #title-column="{ item }">
      <div>{{ item.title }}</div>
    </template>
    <template #createdAt-column="{ item }">
      <div>{{ normalizeDate(item.createdAt) }}</div>
    </template>
  </UI.Table>
</template>

<style lang="scss" scoped src="./style.scss" />
