<script setup lang="ts"></script>

<template>
  <div class="user-menu">
    <div class="user-menu__wrapper">
      <div class="user-menu__info">
        <div class="user-menu__media">
          <img src="@/assets/images/user.png" class="user-menu__image" alt="" />
        </div>
        <div>
          <p class="user-menu__name">David McMichael</p>
          <p class="user-menu__mail">david@wrappixel.com</p>
        </div>
      </div>

      <ul class="user-menu__list">
        <li class="user-menu__item">Профиль</li>
        <li class="user-menu__item">Настройки</li>
        <RouterLink custom to="/login" v-slot="{ navigate }">
          <li class="user-menu__item" @click="navigate">Выйти</li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./UserMenu.scss"></style>
