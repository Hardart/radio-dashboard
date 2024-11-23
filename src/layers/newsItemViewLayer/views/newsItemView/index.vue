<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/store/useNewsStore'
import { useNewsItemStore } from '@/store/useNewsItemStore'

import ArticleForm from './components/ArticleForm/ArticleForm.vue'
const route = useRoute()
const newsStore = useNewsStore()

const { tags, categories } = storeToRefs(useNewsItemStore())
const { pending, articleForm } = storeToRefs(newsStore)
const id = `${route.params.id}`
newsStore.fetchArticle(id)
</script>

<template>
  <h3 v-if="pending">Загрузка....</h3>
  <ArticleForm
    v-else-if="articleForm"
    v-model="articleForm"
    :tags
    :categories
  />
</template>

<style lang="scss" scoped src="./styles.scss" />
