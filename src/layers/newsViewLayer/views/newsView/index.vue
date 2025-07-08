<script setup lang="ts">
import HdButton from '@hd/hdButton/hdButton.vue'
import { useNewsStore } from '@/layers/newsViewLayer/store/useNewsStore'
import DashboardContentLayout from '@/layouts/Content/dashboardContentLayout.vue'
import DashboardContentBodyLayout from '@/layouts/Content/dashboardContentBodyLayout.vue'
import DashboardContentHeaderLayout from '@/layouts/Content/dashboardContentHeaderLayout.vue'
import { storeToRefs } from 'pinia'
import HdBadge from '@/components/ui/hdBadge/hdBadge.vue'

const newsStore = useNewsStore()
newsStore.fetchArticles()
newsStore.fetchBaseData()
const { articlesCount } = storeToRefs(newsStore)
</script>

<template>
  <DashboardContentLayout>
    <DashboardContentHeaderLayout>
      <div class="dashboard__header--left">
        <h3 class="dashboard__header-title">Новости</h3>
        <HdBadge :label="articlesCount" type="warning" />
      </div>
      <HdButton
        icon="news"
        text="Создать"
        color="primary"
        variant="link"
        @click="$router.push('/news/create')"
      />
    </DashboardContentHeaderLayout>
    <DashboardContentBodyLayout no-padding>
      <RouterView />
    </DashboardContentBodyLayout>
  </DashboardContentLayout>
</template>

<style lang="scss" scoped src="./style.scss" />
