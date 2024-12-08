<script lang="ts" setup>
import UserMenu from '@/components/UserMenu/UserMenu.vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { useToggle } from '@/composables/useToggle'
import { useAuthStore } from '@/store/useAuthStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
const [isOpen, toggle] = useToggle()
const { user } = storeToRefs(useAuthStore())
const userBtn = ref()
useClickOutside(userBtn, () => toggle(false))
const imageAlt = computed(
  () => `${user.value?.lastName.charAt(0)}${user.value?.firstName.charAt(0)}`
)
</script>

<template>
  <div class="dashboard__aside--bottom">
    <div class="user" @click="toggle()" ref="userBtn">
      <div class="user__logo">
        <img :src="user?.avatar" :alt="imageAlt" />
      </div>
      <div class="user__name">{{ user?.fullName }}</div>
    </div>
  </div>
  <Teleport defer to=".dashboard">
    <UserMenu v-if="user" :is-open="isOpen" :user />
  </Teleport>
</template>
