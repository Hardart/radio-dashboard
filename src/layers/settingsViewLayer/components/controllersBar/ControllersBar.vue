<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import DashboardContentControlsLayout from '@/layouts/dashboardContentControlsLayout.vue'
defineEmits(['toggle-base', 'toggle-footer'])
</script>

<template>
  <DashboardContentControlsLayout>
    <HdButton text="Контакты" size="s" @click="$emit('toggle-base')" />
    <HdButton text="Контакты футер" size="s" @click="$emit('toggle-footer')" />
  </DashboardContentControlsLayout>
</template>

<style lang="scss" scoped src="" />
