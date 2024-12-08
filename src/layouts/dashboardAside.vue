<script lang="ts" setup>
import { useDefaultStore } from '@/store/useDefaultStore'
import DashboardAsideBottom from './dashboardAsideBottom.vue'
import DashboardAsideTop from './dashboardAsideTop.vue'
import { storeToRefs } from 'pinia'
import Navigation from '@/components/Navigation/Navigation.vue'
const defautsStore = useDefaultStore()
const { isMenuOpen } = storeToRefs(defautsStore)
</script>

<template>
  <aside
    class="dashboard__aside"
    :class="isMenuOpen && 'dashboard__aside--open'"
  >
    <DashboardAsideTop />

    <div class="dashboard__aside--main">
      <Navigation
        :is-open="isMenuOpen"
        @on-toggle="defautsStore.toggleMenuOpenState"
      />
    </div>

    <DashboardAsideBottom />
  </aside>
</template>

<style lang="scss" scoped src="" />
