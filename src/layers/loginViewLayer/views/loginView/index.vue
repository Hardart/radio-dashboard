<script setup lang="ts">
import LoginForm from './components/LoginForm/LoginForm.vue'
</script>

<template>
  <div class="login">
    <div class="login__cover"></div>
    <div class="login__content">
      <div class="login__group">
        <h3 class="login__title">Войти</h3>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<style src="./style.scss" />
