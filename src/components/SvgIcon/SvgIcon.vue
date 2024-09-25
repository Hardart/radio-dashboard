<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { Icon } from '@type/Icon'

const { icon } = defineProps<{
  icon: Icon
}>()

const svg = defineAsyncComponent(() => import(`@icons/${icon}.svg`))
</script>

<template>
  <component :is="svg" class="hd-icon" />
</template>
