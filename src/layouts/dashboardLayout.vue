<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Navigation from '@/components/Navigation/Navigation.vue'
import { useDefaultStore } from '@/store/useDefaultStore'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import DashboardAsideBottom from './dashboardAsideBottom.vue'
import DashboardAsideTop from './dashboardAsideTop.vue'

const defautsStore = useDefaultStore()
const { isMenuOpen } = storeToRefs(defautsStore)
</script>

<template>
  <div class="dashboard">
    <aside
      class="dashboard__aside"
      :class="isMenuOpen && 'dashboard__aside--open'"
    >
      <DashboardAsideTop />
      <div class="dashboard__open-btn">
        <HdButton
          icon="arrow-forward-ios"
          :icon-class="isMenuOpen ? 'arrow-reverse' : undefined"
          square
          @click="defautsStore.toggleMenuOpenState"
        />
      </div>
      <Navigation />
      <DashboardAsideBottom />
    </aside>
    <slot />
  </div>
</template>
