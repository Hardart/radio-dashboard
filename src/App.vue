<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import DashboardLayout from '@/layouts/dashboardLayout.vue'
import LoginLayout from '@/layouts/loginLayout.vue'
import { computed } from 'vue'
import HdTooltip from './components/ui/hdTooltip/hdTooltip.vue'
import HdNotifications from './components/ui/hdNotification/hdNotifications.vue'
import { useAuthStore } from './store/useAuthStore'

const route = useRoute()
const isLoginPage = computed(() => route.name === 'login')
useAuthStore().loginAuto()
</script>

<template>
  <component :is="isLoginPage ? LoginLayout : DashboardLayout">
    <RouterView />
  </component>
  <HdTooltip />
  <HdNotifications />
</template>
