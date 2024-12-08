<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Sortable } from './Sortable'

const sortableItems = defineModel<any[]>({ required: true })
const sortable = new Sortable()

const { selector, handle } = defineProps<{
  itemKey: string
  selector: string
  handle?: string
}>()
const sortableContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  sortable.init(sortableContainer, { selector, handle })
})

onUnmounted(() => sortable.removeListeners())

watch(
  () => sortableItems.value.length,
  () => sortable.refresh()
)
</script>

<template>
  <div ref="sortableContainer">
    <slot name="item" v-for="item in sortableItems" :key="item[itemKey]" :item>
      <div class="sortable__item" sortable-item>
        <h3>{{ item.text }}</h3>
      </div>
    </slot>
  </div>
</template>
