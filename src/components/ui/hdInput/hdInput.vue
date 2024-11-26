<script setup lang="ts">
import type { Icon } from '@type/Icon'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { inject, type InputTypeHTMLAttribute } from 'vue'
const inputValue = defineModel()
defineProps<{
  icon?: Icon
  flipIcon?: Icon
  label?: string
  iconClass?: string
  name?: string
  placeholder?: string
  requried?: boolean
  type?: InputTypeHTMLAttribute
}>()

const id = inject<string | undefined>('input-id', undefined)
</script>

<template>
  <div class="hd-input">
    <div class="hd-input__container">
      <span class="hd-input__icon" v-if="icon">
        <SvgIcon :icon :class="iconClass" />
      </span>
      <input
        :type="type || 'text'"
        class="hd-input__field"
        :class="[icon && 'hd-input__field--icon']"
        :name
        :placeholder
        :requried
        :id
        v-model="inputValue"
      />
      <SvgIcon v-if="flipIcon" :icon="flipIcon" class="hd-input__flip-icon" />
    </div>
  </div>
</template>

<style scoped src="./hdInput.scss" />
