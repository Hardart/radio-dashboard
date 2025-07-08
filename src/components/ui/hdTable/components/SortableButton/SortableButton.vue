<script lang="ts" setup>
import HdButton from '@hd/hdButton/hdButton.vue'
import { toggleSort } from '@/shared/helpers/sort-articles'
defineProps<{
  text: string
  sortKey: string
}>()
</script>

<template>
  <HdButton
    :text
    flip-icon="sort"
    class="sortable-button"
    flip-icon-class="sortable-button__icon"
    @click="toggleSort(sortKey)"
  />
</template>

<style lang="scss" scoped src="./styles.scss" />
