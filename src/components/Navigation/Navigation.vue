<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import type { Icon } from '@/shared/types/Icon'
import OpenButton from './components/openButton/OpenButton.vue'
type Link = {
  id: number
  icon: Icon
  label: string
  to: string
}

defineProps<{
  isOpen: boolean
}>()

defineEmits(['on-toggle'])
const links: Link[] = [
  { id: 1, icon: 'dashboard', label: 'Главная', to: '/' },
  { id: 2, icon: 'category', label: 'Категории', to: '/categories' },
  { id: 3, icon: 'news', label: 'Новости', to: '/news' },
  { id: 4, icon: 'music-library', label: 'Треки', to: '/tracks' },
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
      v-slot="{ navigate, isActive }"
      v-for="(item, index) in links"
      :key="item.id"
    >
      <li
        class="nav-list__item"
        :class="isActive && 'nav-list__item--active'"
        @click="navigate"
      >
        <SvgIcon :icon="item.icon" class="nav-list__icon" />
        <span class="nav-list__link">{{ item.label }}</span>
      </li>
    </RouterLink>
  </ul>

  <OpenButton :is-menu-open="isOpen" @on-toggle="$emit('on-toggle')" />
</template>

<style lang="scss" scoped src="./Navigation.scss" />
