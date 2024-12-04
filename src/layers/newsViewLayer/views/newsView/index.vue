<script setup lang="ts">
import HdButton from '@ui/hdButton/hdButton.vue'
import { useNewsStore } from '@/store/useNewsStore'
import DashboardContentLayout from '@/layouts/dashboardContentLayout.vue'

const newsStore = useNewsStore()
newsStore.fetchArticles()
newsStore.fetchBaseData()
</script>

<template>
  <DashboardContentLayout header>
    <template #header>
      <div class="news__header">
        <h3 class="news__title">Новости</h3>
        <HdButton
          icon="news"
          text="Создать"
          color="primary"
          variant="link"
          @click="$router.push('/news/create')"
        />
      </div>
    </template>
    <RouterView />
  </DashboardContentLayout>
</template>

<style lang="scss" scoped src="./style.scss" />
