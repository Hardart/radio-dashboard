<script setup lang="ts">
import LoginForm from './components/LoginForm/LoginForm.vue'
</script>

<template>
  <div class="login">
    <div class="login__cover">
      <img class="login__image" src="@/assets/images/1.png" alt="" />
    </div>
    <div class="login__content">
      <LoginForm />
    </div>
  </div>
</template>

<style src="./style.scss" />
