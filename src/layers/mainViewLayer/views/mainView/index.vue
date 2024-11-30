<script setup lang="ts">
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdSwitch from '@/components/ui/hdSwitch/hdSwitch.vue'
</script>

<template>
  <div class="test">
    <HdButton text="Пример кнопки" color="primary" variant="outline" />
    <HdButton text="Пример кнопки" color="primary" />
    <HdButton text="Пример кнопки" />
    <HdButton icon="bell" square />
    <HdSwitch />
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
