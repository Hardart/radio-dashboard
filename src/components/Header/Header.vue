<script setup lang="ts">
import HeaderLeft from './HeaderLeft/HeaderLeft.vue'
import HdButton from '@ui/hdButton/hdButton.vue'
</script>

<template>
  <header class="header">
    <HdButton icon="menu" icon-class="header__menu-button" />
    <h3 class="header__title">Панель управления</h3>
    <HeaderLeft />
  </header>
</template>

<style lang="scss" scoped src="./Header.scss" />
