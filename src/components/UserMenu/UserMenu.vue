<script setup lang="ts">
import { correctImageUrl } from '@/shared/helpers/utils'
import type { User } from '@/shared/schemes/user-schema'
import { useAuthStore } from '@/store/useAuthStore'
import { computed } from 'vue'

const { user } = defineProps<{
  user: User
  isOpen: boolean
}>()
const authStore = useAuthStore()
const logout = async (navigate: () => void) => {
  await authStore.logout()
  navigate()
}

const toSettings = async (navigate: () => void) => navigate()

const imageAlt = computed(
  () => `${user?.lastName.charAt(0)}${user?.firstName.charAt(0)}`
)

interface INavigationItem {
  label: string
  to: string
  minRole: 'admin' | 'creator' | 'host'
  action: (navigate: () => void) => void
}

const userNavigationList: INavigationItem[] = [
  {
    label: 'Настройки',
    to: '/settings',
    minRole: 'admin',
    action: toSettings,
  },
  {
    label: 'Выйти',
    to: '/login',
    minRole: 'host',
    action: logout,
  },
]
</script>

<template>
  <div class="user-menu" :class="isOpen && 'user-menu--open'" v-if="isOpen">
    <div class="user-menu__wrapper">
      <div class="user-menu__info">
        <div class="user-menu__media">
          <img
            :src="correctImageUrl(user.avatar)"
            class="user-menu__image"
            :alt="imageAlt"
          />
        </div>
        <div>
          <p class="user-menu__name">{{ user.fullName }}</p>
          <p class="user-menu__mail">{{ user.email }}</p>
        </div>
      </div>

      <ul class="user-menu__list">
        <RouterLink
          v-for="navigationItem in userNavigationList"
          :to="navigationItem.to"
          v-slot="{ navigate }"
          custom
        >
          <li
            class="user-menu__item"
            @click="navigationItem.action(navigate)"
            v-if="authStore.hasRole(navigationItem.minRole)"
          >
            {{ navigationItem.label }}
          </li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./UserMenu.scss"></style>
