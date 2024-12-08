<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
defineProps<{
  isMenuOpen: boolean
}>()
defineEmits(['on-toggle'])
</script>

<template>
  <div class="dashboard__button" :class="isMenuOpen && 'open'">
    <HdButton
      class="menu-button"
      icon="arrow-forward-ios"
      :icon-class="isMenuOpen ? 'arrow-reverse' : undefined"
      square
      @click="$emit('on-toggle')"
    />
  </div>
</template>

<style lang="scss" scoped src="./OpenButton.scss" />
