<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import DashboardLayout from '@/layouts/dashboardLayout.vue'
import LoginLayout from '@/layouts/loginLayout.vue'
import { computed } from 'vue'
const route = useRoute()
const isLogin = computed(() => route.name === 'login')
</script>

<template>
  <component :is="isLogin ? LoginLayout : DashboardLayout">
    <RouterView />
  </component>
</template>
