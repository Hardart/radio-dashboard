<script lang="ts" setup>
import HdInput from '../hdInput/hdInput.vue'
import { computed, ref, toValue, type Ref } from 'vue'
import SelectButton from './components/SelectButton/SelectButton.vue'
import SelectListItem from './components/SelectListItem/SelectListItem.vue'
import {
  isArray,
  isString,
  isStringArray,
  isObject,
  isObjectArray,
  toString,
  type ObjectItem,
} from '@/shared/helpers/utils'
import { useToggle } from '@/composables/useToggle'
import { useClickOutside } from '@/composables/useClickOutside'

type Selected = string | string[] | ObjectItem | ObjectItem[] | undefined

const selected = defineModel<Selected>({
  required: true,
})

const {
  keyAttr,
  optionAttr = 'label',
  options,
  multiple = false,
} = defineProps<{
  keyAttr?: string
  optionAttr?: string
  options: string[] | ObjectItem[]
  multiple?: boolean
  label?: string
}>()
const [isOpen, toggleOpen] = useToggle()

const $select = ref()

useClickOutside($select, () => {
  toggleOpen(false)
})

initSelected(selected)

function initSelected(input: Ref<Selected>) {
  if (typeof input.value === 'undefined') {
    input.value = multiple ? [] : ''
  } else {
    if (multiple && !isArray(selected.value))
      throw new Error('Selected element is not type of Array')
  }
}

function determineObject() {
  switch (true) {
    case isString(selected.value) && isObjectArray(options):
      const value = options.find(
        (option) => option[keyAttr || optionAttr] === selected.value
      )

      return value ? (optionAttr ? value[optionAttr] : value) : 'Выбери'
    case isStringArray(selected.value):
      return selected.value.length || 'Выберите'
    case isObjectArray(selected.value):
      return optionAttr ? selected.value.length : selected.value.length
    case isObject(selected.value):
      if (isArray(selected.value))
        throw new Error(
          'Different types cannot be in selected element. You must set key attribute!'
        )
      return optionAttr ? selected.value[optionAttr] : selected.value
    default:
      return 'Выберите опцию'
  }
}
function determineString() {
  if (isString(selected.value)) {
    return selected.value || 'Выберите'
  } else if (isStringArray(selected.value)) {
    return selected.value.join(', ') || 'Выберите'
  }
  throw new Error('Unsupported type')
}
function determineOptions(input: Ref<Selected>) {
  if (
    isStringArray(options) &&
    (isString(input.value) || isStringArray(input.value))
  ) {
    return determineString()
  } else {
    return determineObject()
  }
}

function isIncludeInObjectArray(option: ObjectItem) {
  if (!isArray(selected.value))
    throw new Error('Selected element not type of Array')
  return selected.value.some((item) => {
    return keyAttr
      ? item === option[keyAttr]
      : toString(item) === toString(option)
  })
}
function filterObjectArray(option: ObjectItem) {
  if (!isArray(selected.value))
    throw new Error('Selected element not type of Array')
  selected.value = selected.value.filter((item) => {
    return keyAttr
      ? item !== option[keyAttr]
      : toString(item) !== toString(option)
  })
}

const isActive = (option: string | ObjectItem) => {
  if (isString(option)) {
    return isStringArray(selected.value)
      ? selected.value.includes(option)
      : option === selected.value
  } else {
    const optionObj = option[keyAttr || optionAttr] || option

    switch (true) {
      case isObjectArray(selected.value):
        return isIncludeInObjectArray(option)
      case isStringArray(selected.value):
        return selected.value.includes(optionObj)
      case isString(selected.value):
        return selected.value === optionObj
      case typeof selected.value !== 'undefined':
        const selectedStr: string = keyAttr
          ? selected.value[keyAttr]
          : optionAttr
          ? selected.value[optionAttr]
          : selected.value
        return selectedStr === optionObj
    }
  }
}

const setSelected = (option: string | ObjectItem) => {
  if (isString(option)) {
    if (isStringArray(selected.value)) {
      if (!selected.value.includes(option)) selected.value.push(option)
      else selected.value = selected.value.filter((item) => item !== option)
    } else {
      selected.value = option
    }
  } else {
    if (isArray(selected.value) && multiple) {
      if (!isIncludeInObjectArray(option)) {
        selected.value.push(keyAttr ? option[keyAttr] : option)
      } else {
        filterObjectArray(option)
      }
    } else {
      selected.value = keyAttr ? option[keyAttr] : option
    }
  }
}

const printOption = (option: string | ObjectItem) => {
  if (isString(option)) return option
  if (isObject(option)) return optionAttr ? option[optionAttr] : option
}

const printSelected = computed(() => determineOptions(selected))
</script>

<template>
  <div class="hd-select" :class="isOpen && 'hd-select--open'" ref="$select">
    <SelectButton :text="printSelected" @click="toggleOpen()" />

    <div class="hd-select__wrapper" v-if="isOpen">
      <!-- <HdInput v-model="search" v-if="searchable" placeholder="поиск..." /> -->

      <ul class="hd-select__list">
        <SelectListItem
          v-for="option in options"
          :option
          :text="printOption(option)"
          :is-active="isActive(option)"
          @click="setSelected(option)"
        />
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./hdSelect.scss" />
