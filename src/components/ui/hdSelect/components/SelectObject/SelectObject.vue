<script lang="ts" setup>
import { computed, ref } from 'vue'
import SelectedItem from '../SelectedItem/SelectedItem.vue'
import SelectListItem from '../SelectListItem/SelectListItem.vue'
import SelectButton from '../SelectButton/SelectButton.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'

const selected = defineModel<string[] | string>({ required: true })

const {
  optionValue = 'label',
  keyValue = 'id',
  options,
  placeholder,
} = defineProps<{
  options: Record<string, any>[]
  keyValue?: string
  optionValue?: string
  multiple?: boolean
  searchable?: boolean
  placeholder?: string
}>()
const isOpen = ref(false)
const toggleOpenState = () => (isOpen.value = !isOpen.value)

const isActive = (option: Record<string, any>) => {
  if (Array.isArray(selected.value)) {
    return selected.value.includes(option[keyValue])
  } else {
    return selected.value === option[keyValue]
  }
}

const setSelected = (option: Record<string, any>) => {
  if (Array.isArray(selected.value)) {
    if (selected.value.includes(option[keyValue])) {
      selected.value = selected.value.filter((opt) => opt !== option[keyValue])
    } else {
      selected.value.push(option[keyValue])
    }
  } else {
    selected.value = option[keyValue]
    toggleOpenState()
  }
}

const printOption = (option: Record<string, any>) => {
  return option[optionValue]
}

const printSelected = computed(() => {
  if (Array.isArray(selected.value)) {
    return `${selected.value.length} выбрано`
  } else {
    const selectedOption = options.find(
      (opt) => opt[keyValue] === selected.value
    )
    return selectedOption ? selectedOption[optionValue] : placeholder
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
            <SelectedItem :text="printOption(option)" />
          </SelectListItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
