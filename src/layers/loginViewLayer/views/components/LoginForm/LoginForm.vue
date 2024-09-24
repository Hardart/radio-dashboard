<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
</script>

<template>
  <form class="login-form">
    <h3 class="login-form__title">Войти</h3>
    <HdInput class="login-form__input" icon="person" label="Логин" />
    <HdInput class="login-form__input" icon="lock" label="Пароль" />
    <HdButton text="Войти" class="login-form__submit" />
    <div class="login-form__description">
      <RouterLink to="/">Забыли пароль?</RouterLink>
    </div>
  </form>
</template>

<style lang="scss" scoped src="./LoginForm.scss"></style>
