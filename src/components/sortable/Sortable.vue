<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Sortable } from './Sortable'

const sortableItems = defineModel<any[]>({ required: true })
const { selector, handle } = defineProps<{
  itemKey: string
  selector: string
  handle?: string
}>()
const sortableContainer = ref<HTMLElement>()

onMounted(() => {
  Sortable.init(sortableContainer.value!, { selector, handle })
})
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

<style lang="scss" src="./Sortable.scss" />
