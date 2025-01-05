<script lang="ts" setup>
import { inject, useId } from 'vue'
const inputValue = defineModel()
const { ui = {} } = defineProps<{
  name?: string
  placeholder?: string
  requried?: boolean
  disabled?: boolean
  required?: boolean
  label?: string
  ui?: {
    wrapper?: string
    container?: string
    label?: string
    inner?: string
    required?: string
  }
  size?: 'xs' | 's' | 'l' | 'xl'
}>()
const id = inject<string | undefined>('input-id', undefined)
const inputId = id ?? useId()
defineEmits(['onChange'])
</script>

<template>
  <div class="hd-checkbox" :class="ui.wrapper">
    <div class="hd-checkbox__container" :class="ui.container">
      <input
        :id="inputId"
        v-model="inputValue"
        :name="name"
        :required
        :disabled
        type="checkbox"
        class="hd-checkbox__input"
        @change="$emit('onChange')"
      />
    </div>
    <div
      v-if="label || $slots.label"
      class="hd-checkbox__wrapper"
      :class="ui.inner"
    >
      <label :for="inputId" :class="ui.label" class="hd-checkbox__label">
        <slot name="label">{{ label }}</slot>
        <span
          v-if="required"
          class="hd-checkbox__requried"
          :class="ui.required"
        >
          *
        </span>
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./HdCheckbox.scss" />
