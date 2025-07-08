<script
  lang="ts"
  setup
  generic="T, K extends string | string[] | T | T[] | undefined"
>
import type { SelectProps } from './types'
import { computed } from 'vue'
import { useToggle } from '@vueuse/core'
import { isString, isArray, isStringArray } from '@/shared/helpers/utils'
import * as Child from './components'
import { filter, isEqual, isObject, some } from 'lodash'

const {
  options,
  keyAttr,
  labelAttr,
  placeholder = 'Выбери',
  multiple,
} = defineProps<SelectProps<T>>()

const model = defineModel<K>({ required: true })

const [isOpen, toggleOpen] = useToggle()

function getOptionByKey(option: T) {
  return keyAttr ? option[keyAttr] : option
}

function setMultipleModelValue(option: T | string) {
  let arr = isArray(model.value) ? model.value : ([] as string[] | T[])

  const keyOption = getOptionByKey(option as T) as T
  if (keyAttr) {
    fff(keyOption)
  } else {
    if (isObject(keyOption)) {
      if (some(arr, keyOption)) {
        arr = filter(arr, (item) => !isEqual(item, keyOption))
      } else {
        fff(keyOption)
      }
    } else fff(option)
  }

  function fff(keyOption: string | T) {
    if (arr.includes(keyOption)) {
      arr = arr.filter((arrItem) => arrItem !== keyOption)
    } else arr = [...arr, keyOption]
  }

  model.value = arr as K
}

function onSelectGeneric(option: T | string) {
  toggleOpen()
  if (multiple) {
    setMultipleModelValue(option)
  } else {
    const isKeyAttrNotString = keyAttr && !isString(option)
    model.value = (isKeyAttrNotString ? getOptionByKey(option) : option) as K
  }

  return
}

function printOption(option: T | string) {
  if (isString(option)) return option
  return labelAttr ? option[labelAttr] : option
}

const printSelected = computed(() => {
  if (!model.value) return placeholder
  if (multiple) {
    return printMultipleSelected()
  } else {
    if (!isStringArray(options)) {
      let option = model.value as K
      if (keyAttr) {
        option = options.find((op) => op[keyAttr] === model.value) as K
      }
      if (labelAttr) {
        option = printOption(option as T) as K
      }

      return option
    } else {
      return model.value
    }
  }
})

function printMultipleSelected() {
  if (!isArray(model.value)) return

  if (isStringArray(model.value)) return model.value.sort().join(', ')
  else if (labelAttr) {
    if (keyAttr) {
      const opts = (options as T[]).filter((optionItem) =>
        (model.value as T[]).find(
          (modelItem) => modelItem === optionItem[keyAttr]
        )
      )

      return opts.map(printOption).sort().join(', ')
    }
    return model.value.map(printOption).sort().join(', ')
  } else return model.value.length
}

function isSelected(option: T | string) {
  if (!model.value) return false
  if (multiple) {
    // TODO
    return false
  } else {
    if (isStringArray(options)) {
      return model.value === option
    } else {
      if (keyAttr && !isString(option)) {
        return option[keyAttr] === model.value
      } else if (labelAttr && isObject(option)) {
        return option[labelAttr] === (model.value as T)[labelAttr]
      } else {
        return isEqual(option, model.value)
      }
    }
  }
}
</script>

<template>
  <div
    class="hd-select"
    :class="{ 'hd-select--open': isOpen, 'hd-select--full-width': full }"
    ref="$select"
  >
    <Child.Button :text="printSelected" @click="toggleOpen()" />

    <div class="hd-select__wrapper" v-if="isOpen">
      <ul class="hd-select__list">
        <Child.ListItem
          v-for="option in options"
          :text="printOption(option)"
          :is-selected="isSelected(option)"
          @click="onSelectGeneric(option)"
        />
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./hdSelect.scss" />
