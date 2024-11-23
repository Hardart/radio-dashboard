<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import DashboardLayout from '@/layouts/dashboardLayout.vue'
import LoginLayout from '@/layouts/loginLayout.vue'
import { computed } from 'vue'
import HdTooltip from './components/ui/hdTooltip/hdTooltip.vue'
import HdNotifications from './components/ui/hdNotification/hdNotifications.vue'

const route = useRoute()
const isLogin = computed(() => route.name === 'login')
</script>

<template>
  <component :is="isLogin ? LoginLayout : DashboardLayout">
    <RouterView />
  </component>
  <HdTooltip />
  <HdNotifications />
</template>
