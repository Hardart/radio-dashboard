<script lang="ts" setup>
import type { Article } from '@/shared/schemes/article-schema'
import SortableButton from './components/SortableButton/SortableButton.vue'

defineProps<{
  columns: any[]
  data: Article[]
}>()
</script>

<template>
  <table class="hd-table">
    <thead>
      <tr>
        <th>N</th>
        <th v-for="column in columns" :key="column.key">
          <SortableButton
            v-if="column.sortable"
            :text="column.label ?? column.key"
            :sort-key="column.key"
          />
          <span v-else>
            {{ column.label ?? column.key }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in data" :key="item.id">
        <td>{{ i + 1 }}</td>
        <td v-for="column in columns">
          <slot :name="`${column.key}-column`" :item></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped src="./hdTable.scss" />
