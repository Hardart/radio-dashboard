<script setup lang="ts">
import { storeToRefs } from 'pinia'
import HdBadge from '@ui/hdBadge/hdBadge.vue'
import HdTable from '@/components/ui/hdTable/hdTable.vue'
import { useProgramsStore } from '../../store/useProgramsStore'
import { correctImageUrl } from '@/shared/helpers/utils'

const scheduleStore = useProgramsStore()
const { programs, pending } = storeToRefs(scheduleStore)

const columns = [
  {
    key: 'image',
    label: '',
    class: 'width-shrink',
  },
  {
    key: 'title',
    label: 'Название программы',
    class: 'width-expand',
  },
  {
    key: 'isPublished',
    label: 'статус',
    class: 'width-m',
  },
]
</script>

<template>
  <HdTable
    :columns
    :data="programs"
    :link="{ basePath: '/programs', itemKey: 'id' }"
    :pending
  >
    <template #image-column="{ item }">
      <div class="media-column">
        <img class="media-column__image" :src="item.image" />
      </div>
    </template>
    <template #title-column="{ item }">
      <div>{{ item.title }}</div>
    </template>

    <template #isPublished-column="{ item }">
      <HdBadge
        :label="item.isPublished ? 'опубликовано' : 'не опубликовано'"
        :type="item.isPublished ? 'success' : 'danger'"
      />
    </template>
  </HdTable>
</template>

<style lang="scss" scoped src="./style.scss" />
