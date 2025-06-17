<script lang="ts" setup>
const isOn = defineModel<boolean>()
const { disabled } = defineProps<{
  disabled?: boolean
}>()

const toggleSwitch = () => {
  if (disabled) return
  isOn.value = !isOn.value
}
</script>

<template>
  <div
    class="hd-switch"
    :class="{ 'hd-switch--on': isOn, 'hd-switch--disabled': disabled }"
  >
    <div class="hd-switch__wrapper" @click="toggleSwitch">
      <div class="hd-switch__handler"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./hdSwitch.scss" />
