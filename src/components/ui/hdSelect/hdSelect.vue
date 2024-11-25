<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import HdInput from '../hdInput/hdInput.vue'
import SelectButton from './components/SelectButton/SelectButton.vue'
import SelectedItem from './components/SelectedItem/SelectedItem.vue'
import SelectListItem from './components/SelectListItem/SelectListItem.vue'

type Opt = Record<string, any> & { id: string }
export type Option = Opt | string
type SelectedOption = Option | Option[]

type SelectOptions = {
  multiple?: boolean
  searchable?: boolean
  options: Option[]
}
const isType = <Type>(thing: any): thing is Type => true
const isArray = (thing: any) => Array.isArray(thing)
const props = defineProps<SelectOptions>()
const selected = defineModel<SelectedOption>({ required: true })
selected.value = props.multiple ? selected.value : props.options[0]
const isOpen = ref(false)
const search = ref('')

const toggleOpenState = () => (isOpen.value = !isOpen.value)

const isActive = (option: Option) => {
  const id = getObjectKey(option, 'id')

  if (isArray(selected.value)) {
    return selected.value.some((item) => hasOrEqualId(item, id))
  } else {
    return hasOrEqualId(selected.value, id)
  }
}

const setSelected = (option: Option) => {
  if (isArray(selected.value)) {
    if (selected.value.some(isSomeIdEqual(option))) {
      selected.value = selected.value.filter(filterSelected(option))
    } else {
      selected.value.push(option)
    }
  } else {
    selected.value = option
    toggleOpenState()
    search.value = ''
  }
}

const printSelected = computed(() => {
  if (isArray(selected.value)) {
    return selected.value.length ? `Выбрано ${selected.value.length} ` : ''
  } else {
    return getObjectKey(selected.value, 'title')
  }
})

const filteredBySearch = computed(() => props.options.filter(filterSearch))

const printOption = (option: Option) => {
  return getObjectKey(option, 'title')
}

function hasOrEqualId(item: Option, id: string) {
  return typeof item === 'string' ? item === id : item.id === id
}

function getObjectKey(item: Option, key: string): string {
  return typeof item === 'string' ? item : item[key]
}

function isSomeIdEqual(option: Option) {
  return function (item: Option) {
    if (typeof item === 'object' && typeof option === 'object')
      return item.id === option.id
    else if (typeof item === 'string' && typeof option === 'string')
      return item === option
  }
}

function filterSelected(option: Option) {
  return function (item: Option) {
    if (typeof item === 'object' && typeof option === 'object')
      return item.id !== option.id
    else if (typeof item === 'string' && typeof option === 'string')
      return item !== option
  }
}

function filterSearch(option: Option) {
  const searhValue = search.value.trim().toLocaleLowerCase()
  return typeof option === 'string'
    ? option.toLocaleLowerCase().includes(searhValue)
    : option.title.toLocaleLowerCase().includes(searhValue)
}
</script>

<template>
  <div class="hd-select" :class="isOpen && 'hd-select--open'">
    <div class="hd-select__container relative mt-2">
      <SelectButton :text="printSelected" @click="toggleOpenState" />

      <div class="hd-select__wrapper">
        <HdInput v-model="search" v-if="searchable" placeholder="поиск..." />

        <ul class="hd-select__list">
          <SelectListItem
            v-for="option in filteredBySearch"
            :option
            :is-active="isActive(option)"
            @on-select="setSelected(option)"
          >
            <SelectedItem :text="printOption(option)" />
          </SelectListItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./hdSelect.scss" />
