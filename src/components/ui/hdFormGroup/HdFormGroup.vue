<script lang="ts" setup>
import type { FormError } from '@/composables/useFormValidation'
import { computed, inject, isRef, provide, useId, type Ref } from 'vue'

const props = defineProps<{
  help?: string
  error?: string | boolean
  required?: boolean
  label?: string
  name?: string
}>()
const errors = inject<Ref<FormError[]> | null>('form-errors', null)
const error = computed(() => {
  return props.error && ['string', 'boolean'].includes(typeof props.error)
    ? props.error
    : errors?.value.find((error) => error.path === props.name)?.message
})
const inputId = useId()
provide('input-id', inputId)
</script>

<template>
  <div class="hd-form-group">
    <div class="hd-form-group__label-container">
      <p
        class="hd-form-group__label"
        :class="props.required && 'hd-form-group__label--required'"
        v-if="label"
      >
        <label :for="inputId">{{ label }}</label>
      </p>
    </div>
    <slot></slot>
    <p class="hd-form-group__help" v-if="help">{{ help }}</p>
    <p class="hd-form-group__error" v-if="error">{{ error }}</p>
  </div>
</template>

<style lang="scss" scoped src="./HdFormGroup.scss" />
