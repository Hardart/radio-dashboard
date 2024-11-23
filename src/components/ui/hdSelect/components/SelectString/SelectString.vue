<script lang="ts" setup>
import { computed, ref, toValue } from 'vue'
import SelectedItem from '../SelectedItem/SelectedItem.vue'
import SelectListItem from '../SelectListItem/SelectListItem.vue'
import SelectButton from '../SelectButton/SelectButton.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'

const selected = defineModel<string | string[]>({ required: true })

defineProps<{
  options: string[]
  multiple?: boolean
  searchable?: boolean
}>()
const isOpen = ref(false)
const toggleOpenState = () => (isOpen.value = !isOpen.value)

const isActive = (option: string) => {
  if (Array.isArray(selected.value)) {
    return selected.value.includes(option)
  } else {
    return selected.value === option
  }
}

const isOptionSelected = (option: string) => {
  return selected.value.includes(option)
}

const setSelected = (option: string) => {
  if (Array.isArray(selected.value)) {
    if (!isOptionSelected(option)) {
      selected.value.push(option)
    } else {
      selected.value = selected.value.filter((opt) => opt !== option)
    }
  } else {
    selected.value = option
    toggleOpenState()
  }
}

const printSelected = computed(() => {
  if (Array.isArray(selected.value)) {
    return `${selected.value.length} выбрано`
  } else {
    return selected.value
  }
})
</script>

<template>
  <div class="hd-select" :class="isOpen && 'hd-select--open'">
    <div class="hd-select__container relative mt-2">
      <SelectButton :text="printSelected" @click="toggleOpenState" />

      <div class="hd-select__wrapper">
        <!-- <HdInput v-model="search" v-if="searchable" placeholder="поиск..." /> -->

        <ul class="hd-select__list">
          <SelectListItem
            v-for="option in options"
            :option
            :is-active="isActive(option)"
            @click="setSelected(option)"
          >
            <SelectedItem :text="option" />
          </SelectListItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
