<script setup lang="ts">
import type { Icon } from '@type/Icon'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
const inputValue = defineModel()
defineProps<{
  icon?: Icon
  flipIcon?: Icon
  label?: string
  iconClass?: string
  name?: string
  placeholder?: string
}>()
</script>

<template>
  <div class="hd-input">
    <label class="hd-input__label" :for="name" v-if="label">{{ label }} </label>
    <div class="hd-input__container">
      <span class="hd-input__icon" v-if="icon">
        <SvgIcon :icon :class="iconClass" />
      </span>
      <input
        class="hd-input__field"
        :class="[icon && 'hd-input__field--icon']"
        :id="name"
        :name
        :placeholder
        type="text"
        v-model="inputValue"
      />
      <SvgIcon v-if="flipIcon" :icon="flipIcon" class="hd-input__flip-icon" />
    </div>
  </div>
</template>

<style scoped src="./hdInput.scss" />
