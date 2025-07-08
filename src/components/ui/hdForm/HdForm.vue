<script lang="ts" setup>
import type { z } from 'zod'
import { useFormValidation } from '@/composables/useFormValidation'
import { provide } from 'vue'

const emits = defineEmits(['on-submit'])
const { errors, getZodErrors } = useFormValidation()
const { state, schema } = defineProps<{
  state: Record<string, any>
  schema: z.AnyZodObject
}>()
const onSubmit = async () => {
  await getZodErrors(state, schema)
  if (errors.value.length) return console.warn(errors.value)
  emits('on-submit')
}

provide('form-errors', errors)
</script>

<template>
  <form @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<style lang="scss" scoped src="./HdForm.scss" />
