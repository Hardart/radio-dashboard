<script lang="ts" setup>
const isOn = defineModel<boolean>()
const toggleSwitch = () => (isOn.value = !isOn.value)
</script>

<template>
  <div class="hd-switch" :class="isOn && 'hd-switch--on'">
    <div class="hd-switch__wrapper" @click="toggleSwitch">
      <div class="hd-switch__handler"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./HdSwitch.scss" />
