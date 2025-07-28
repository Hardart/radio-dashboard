<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import type { Icon } from '@type/Icon'
import OpenButton from './components/openButton/OpenButton.vue'
import { useAuthStore } from '@/store/useAuthStore'
type Link = {
  id: number
  icon: Icon
  label: string
  to: string
  auth?: boolean
}
const { isSuperadmin } = useAuthStore()
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
  { id: 6, icon: 'radio-show', label: 'Программы', to: '/programs' },
  { id: 6, icon: 'folders', label: 'Файлы', to: '/files', auth: true },
]
</script>

<template>
  <ul class="nav-list">
    <RouterLink
      custom
      :to="item.to"
      v-slot="{ navigate, isActive }"
      v-for="item in links"
      :key="item.id"
    >
      <li
        class="nav-list__item"
        :class="isActive && 'nav-list__item--active'"
        @click="navigate"
        v-if="isSuperadmin || !item.auth"
      >
        <SvgIcon :icon="item.icon" class="nav-list__icon" />
        <span class="nav-list__link">{{ item.label }}</span>
      </li>
    </RouterLink>
  </ul>

  <OpenButton :is-menu-open="isOpen" @on-toggle="$emit('on-toggle')" />
</template>

<style lang="scss" scoped src="./Navigation.scss" />
