<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
</script>

<template>
  <ul class="nav-list">
    <RouterLink custom to="/" v-slot="{ navigate }">
      <li class="nav-list__item" @click="navigate">
        <SvgIcon icon="dashboard" class="nav-list__icon" />
        <span class="nav-list__link">Главная</span>
      </li>
    </RouterLink>
    <RouterLink custom to="/categories" v-slot="{ navigate }">
      <li class="nav-list__item" @click="navigate">
        <SvgIcon icon="category" class="nav-list__icon" />
        <span class="nav-list__link">Категории</span>
      </li>
    </RouterLink>
    <RouterLink custom to="/news" v-slot="{ navigate, isActive }">
      <li
        class="nav-list__item"
        :class="isActive && 'nav-list__item--active'"
        @click="navigate"
      >
        <SvgIcon icon="news" class="nav-list__icon" />
        <span class="nav-list__link">Новости</span>
      </li>
    </RouterLink>
    <RouterLink custom to="/" v-slot="{ navigate }">
      <li class="nav-list__item" @click="navigate">
        <SvgIcon icon="music" class="nav-list__icon" />
        <span class="nav-list__link">Треки</span>
      </li>
    </RouterLink>
    <RouterLink custom to="/gallery" v-slot="{ navigate }">
      <li class="nav-list__item" @click="navigate">
        <SvgIcon icon="gallery" class="nav-list__icon" />
        <span class="nav-list__link">Галерея</span>
      </li>
    </RouterLink>
    <RouterLink custom to="/" v-slot="{ navigate }">
      <li class="nav-list__item" @click="navigate">
        <SvgIcon icon="team" class="nav-list__icon" />
        <span class="nav-list__link">Команда</span>
      </li>
    </RouterLink>
    <RouterLink custom to="/" v-slot="{ navigate }">
      <li class="nav-list__item" @click="navigate">
        <SvgIcon icon="images" class="nav-list__icon" />
        <span class="nav-list__link">Файлы</span>
      </li>
    </RouterLink>
  </ul>
</template>

<style lang="scss" scoped src="./Navigation.scss" />
