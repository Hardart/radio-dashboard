<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Navigation from '@/components/Navigation/Navigation.vue'
import { useDefaultStore } from '@/store/useDefaultStore'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import UserMenu from '@/components/Header/UserMenu/UserMenu.vue'
import { useToggle } from '@/composables/useToggle'
const defautsStore = useDefaultStore()
const { isMenuOpen } = storeToRefs(defautsStore)
const [isOpen, toggle] = useToggle()
</script>

<template>
  <div class="dashboard">
    <aside
      class="dashboard__aside"
      :class="isMenuOpen && 'dashboard__aside--open'"
    >
      <div class="dashboard__open-btn">
        <HdButton
          icon="arrow-forward-ios"
          :icon-class="isMenuOpen ? 'arrow-reverse' : undefined"
          square
          @click="defautsStore.toggleMenuOpenState"
        />
      </div>
      <Navigation />
      <div
        class="user"
        @pointerenter="toggle(true)"
        @pointerleave="toggle(false)"
      >
        <div class="user__logo">
          <img src="@/assets/images/user.png" alt="" />
        </div>
        <UserMenu :is-open="isOpen" />
      </div>
    </aside>
    <slot />
  </div>
</template>
