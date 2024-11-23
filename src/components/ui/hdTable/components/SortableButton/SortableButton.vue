<script lang="ts" setup>
import HdButton from '@ui/hdButton/hdButton.vue'
import { toggleSort } from '@/shared/helpers/sort-articles'
defineProps<{
  text: string
  sortKey: 'title' | 'createdAt' | 'status' | 'category'
}>()
</script>

<template>
  <HdButton
    :text
    flip-icon="sort"
    class="sortable-button"
    @click="toggleSort(sortKey)"
  />
</template>

<style lang="scss" scoped src="./styles.scss" />
