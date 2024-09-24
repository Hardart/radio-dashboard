<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
export type Icon =
  | 'dashboard'
  | 'news'
  | 'category'
  | 'music'
  | 'team'
  | 'gallery'
  | 'images'
  | 'bell'
  | 'menu'
  | 'person'
  | 'lock'
  | 'mail'
  | 'sort'
  | 'sort-up'
  | 'sort-down'
  | 'search'

const { icon } = defineProps<{
  icon: Icon
}>()

const svg = defineAsyncComponent(() => import(`@icons/${icon}.svg`))
</script>

<template>
  <component :is="svg" class="hd-icon" />
</template>
