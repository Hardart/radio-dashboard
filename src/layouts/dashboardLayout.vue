<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Header from '@/components/Header/Header.vue'
import Navigation from '@/components/Navigation/Navigation.vue'
import { useDefaultStore } from '@/store/useDefaultStore'
const { isMenuOpen } = storeToRefs(useDefaultStore())
</script>

<template>
  <Header />
  <main class="main">
    <div class="dashboard">
      <aside
        class="dashboard__aside"
        :class="isMenuOpen && 'dashboard__aside--open'"
      >
        <div class="dashboard__wrapper">
          <Navigation />
        </div>
      </aside>
      <div class="dashboard__content">
        <slot />
      </div>
    </div>
  </main>
</template>
