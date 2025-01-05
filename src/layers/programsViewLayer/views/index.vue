<script lang="ts" setup>
import HdBadge from '@/components/ui/hdBadge/hdBadge.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import DashboardContentBodyLayout from '@/layouts/dashboardContentBodyLayout.vue'
import DashboardContentHeaderLayout from '@/layouts/dashboardContentHeaderLayout.vue'
import DashboardContentLayout from '@/layouts/dashboardContentLayout.vue'
import { useProgramsStore } from '../store/useProgramsStore'
const programsStore = useProgramsStore()
programsStore.fetchPrograms()
</script>

<template>
  <DashboardContentLayout>
    <DashboardContentHeaderLayout>
      <div class="dashboard__header--left">
        <h3 class="dashboard__header-title">Программы</h3>
        <HdBadge :label="programsStore.programs.length" type="warning" />
      </div>
      <HdButton
        icon="news"
        text="Создать"
        color="primary"
        variant="link"
        @click="$router.push('/programs/create')"
        v-if="$route.path !== '/programs/create'"
      />
    </DashboardContentHeaderLayout>
    <DashboardContentBodyLayout>
      <RouterView />
    </DashboardContentBodyLayout>
  </DashboardContentLayout>
</template>

<style lang="scss" src="./styles.scss" />
