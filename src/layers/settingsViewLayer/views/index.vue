<script lang="ts" setup>
import { useDefaultStore } from '@/store/useDefaultStore'
import DashboardContentLayout from '@/layouts/dashboardContentLayout.vue'
import ControllersBar from '../components/controllersBar/ControllersBar.vue'

const store = useDefaultStore()
store.fetchBaseData()
store.fetchBaseContacts()
</script>

<template>
  <DashboardContentLayout>
    <ControllersBar
      @toggle-base="store.toggleBaseAndFooterContacts(false)"
      @toggle-footer="store.toggleBaseAndFooterContacts(true)"
    />
    <RouterView />
  </DashboardContentLayout>
</template>

<style lang="scss" scoped src="./styles.scss" />
