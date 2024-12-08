<script setup lang="ts">
import type { User } from '@/shared/schemes/user-schema'
import { useAuthStore } from '@/store/useAuthStore'
import { computed } from 'vue'

const { user } = defineProps<{
  user: User
  isOpen: boolean
}>()

const logout = async (navigate: () => void) => {
  await useAuthStore().logout()
  navigate()
}

const imageAlt = computed(
  () => `${user?.lastName.charAt(0)}${user?.firstName.charAt(0)}`
)
</script>

<template>
  <div class="user-menu" :class="isOpen && 'user-menu--open'" v-if="isOpen">
    <div class="user-menu__wrapper">
      <div class="user-menu__info">
        <div class="user-menu__media">
          <img :src="user.avatar" class="user-menu__image" :alt="imageAlt" />
        </div>
        <div>
          <p class="user-menu__name">{{ user.fullName }}</p>
          <p class="user-menu__mail">{{ user.email }}</p>
        </div>
      </div>

      <ul class="user-menu__list">
        <li class="user-menu__item">Профиль</li>
        <li class="user-menu__item">Настройки</li>
        <RouterLink custom to="/login" v-slot="{ navigate }">
          <li class="user-menu__item" @click="logout(navigate)">Выйти</li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./UserMenu.scss"></style>
