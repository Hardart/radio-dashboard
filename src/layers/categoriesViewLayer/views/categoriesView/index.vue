<script setup lang="ts">
import { storeToRefs } from 'pinia'
import HdButton from '@ui/hdButton/hdButton.vue'

import { normalizeDate } from '@/shared/helpers/date'
import { useCategoriesStore } from '@/store/useCategoriesStore'
import HdTable from '@/components/ui/hdTable/hdTable.vue'

const categoriesStore = useCategoriesStore()
const { loading, categories } = storeToRefs(categoriesStore)
categoriesStore.fetchCategories()
const columns = [
  {
    key: 'title',
    label: 'Название категории',
  },
  {
    key: 'createdAt',
    label: 'Дата создания',
  },
]
</script>

<template>
  <div class="categories">
    <div class="categories__header">
      <h3 class="categories__title">Категории</h3>
      <HdButton text="Создать" color="primary" />
    </div>
    <div class="categories__body">
      <h3 v-if="loading"><span>Загрузка...</span></h3>
      <HdTable
        v-else
        :columns
        :data="categories"
        :link="{ basePath: '/categories', itemKey: 'id' }"
      >
        <template #title-column="{ item }">
          <div>{{ item.title }}</div>
        </template>
        <template #createdAt-column="{ item }">
          <div>{{ normalizeDate(item.createdAt) }}</div>
        </template>
      </HdTable>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
