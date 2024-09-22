<script setup lang="ts">
import SvgIcon, { type Icon } from '@/components/SvgIcon/SvgIcon.vue'
defineProps<{
  icon?: Icon
  flipIcon?: Icon
}>()
</script>

<template>
  <div class="hd-input">
    <div class="hd-input__container">
      <div class="hd-input__icon" v-if="icon">
        <SvgIcon :icon />
      </div>
      <input
        class="hd-input__field"
        :class="[icon && 'hd-input__field--icon']"
        type="text"
      />
      <label class="hd-input__label"></label>
      <SvgIcon v-if="flipIcon" :icon="flipIcon" class="hd-input__flip-icon" />
    </div>
  </div>
</template>

<style scoped src="./hdInput.scss" />
