<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
defineProps<{
  isMenuOpen: boolean
}>()
defineEmits(['on-toggle'])
</script>

<template>
  <div class="dashboard__open-btn">
    <HdButton
      icon="arrow-forward-ios"
      :icon-class="isMenuOpen ? 'arrow-reverse' : undefined"
      square
      @click="$emit('on-toggle')"
    />
  </div>
</template>

<style lang="scss" scoped src="./OpenButton.scss" />
