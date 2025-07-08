<script lang="ts" setup>
const option = defineModel({ required: true })
defineProps<{
  name?: string
  label: string
  value: string
}>()
</script>

<template>
  <label class="radio">
    <input class="radio__input" type="radio" :name :value v-model="option" />
    <span class="radio__icon"></span>
    <span class="radio__content">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped src="./hdRadioInput.scss" />
