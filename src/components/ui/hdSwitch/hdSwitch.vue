<script lang="ts" setup>
const isOn = defineModel<boolean>()
const toggleSwitch = () => (isOn.value = !isOn.value)
defineProps<{ label?: string }>()
</script>

<template>
  <div class="hd-switch" :class="isOn && 'hd-switch--on'" @click="toggleSwitch">
    <span class="hd-switch__label" v-if="label">{{ label }}</span>
    <div class="hd-switch__wrapper">
      <div class="hd-switch__handler"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./hdSwitch.scss" />
