<script setup lang="ts">
import type { Icon } from '@type/Icon'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
const inputValue = defineModel()
defineProps<{
  icon?: Icon
  flipIcon?: Icon
  label?: string
  iconClass?: string
}>()
</script>

<template>
  <div class="hd-input" :class="label && 'hd-input--label'">
    <div class="hd-input__container">
      <div class="hd-input__icon" v-if="icon">
        <SvgIcon :icon :class="iconClass" />
      </div>
      <input
        class="hd-input__field"
        :class="[icon && 'hd-input__field--icon']"
        type="text"
        v-model="inputValue"
      />
      <label v-if="label" class="hd-input__label">{{ label }}</label>
      <SvgIcon v-if="flipIcon" :icon="flipIcon" class="hd-input__flip-icon" />
    </div>
  </div>
</template>

<style scoped src="./hdInput.scss" />
