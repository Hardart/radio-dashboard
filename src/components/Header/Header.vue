<script setup lang="ts">
import HeaderLeft from './HeaderLeft/HeaderLeft.vue'
import HdButton from '@ui/hdButton/hdButton.vue'
import { useDefaultStore } from '@/store/useDefaultStore'
const store = useDefaultStore()
</script>

<template>
  <header class="header">
    <HdButton
      square
      icon="menu"
      icon-class="header__menu-button"
      @click="store.toggleMenuOpenState"
    />
    <h3 class="header__title">Панель управления</h3>
    <HeaderLeft />
  </header>
</template>

<style lang="scss" scoped src="./Header.scss" />
