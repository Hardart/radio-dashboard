<script setup lang="ts">
import { RouterView } from 'vue-router'
import DashboardLayout from '@/layouts/dashboardLayout.vue'
import LoginLayout from '@/layouts/loginLayout.vue'
import HdTooltip from './components/ui/hdTooltip/hdTooltip.vue'
import HdNotifications from './components/ui/hdNotification/hdNotifications.vue'
import { useAuthStore } from './store/useAuthStore'

const authStore = useAuthStore()
authStore.loginAuto()
</script>

<template>
  <component :is="!authStore.isAuth ? LoginLayout : DashboardLayout">
    <RouterView />
  </component>
  <HdTooltip v-if="authStore.isAuth" />
  <HdNotifications />
</template>
