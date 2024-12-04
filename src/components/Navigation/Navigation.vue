<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import type { Icon } from '@/shared/types/Icon'
type Link = {
  id: number
  icon: Icon
  label: string
  to: string
}
const links: Link[] = [
  { id: 1, icon: 'dashboard', label: 'Главная', to: '/' },
  { id: 2, icon: 'category', label: 'Категории', to: '/categories' },
  { id: 3, icon: 'news', label: 'Новости', to: '/news' },
  { id: 4, icon: 'settings', label: 'Треки', to: '/tracks' },
  { id: 5, icon: 'gallery', label: 'Галерея', to: '/gallery' },
  // {id: 6, icon: '', label: '', to: '/'},
  // {id: 7, icon: '', label: '', to: '/'},
]
</script>

<template>
  <ul class="nav-list">
    <RouterLink
      custom
      :to="item.to"
      v-slot="{ navigate }"
      v-for="(item, index) in links"
      :key="item.id"
    >
      <li class="nav-list__item" @click="navigate">
        <SvgIcon :icon="item.icon" class="nav-list__icon" />
        <span class="nav-list__link">{{ item.label }}</span>
      </li>
    </RouterLink>
    <!-- <RouterLink custom to="/categories" v-slot="{ navigate }">
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
    </RouterLink> -->
  </ul>
</template>

<style lang="scss" scoped src="./Navigation.scss" />
