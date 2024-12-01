<script setup lang="ts">
import HdButton from '@ui/hdButton/hdButton.vue'
import { useNewsStore } from '@/store/useNewsStore'

const newsStore = useNewsStore()
newsStore.fetchArticles()
newsStore.fetchBaseData()
</script>

<template>
  <div class="news">
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
    <RouterView />
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
