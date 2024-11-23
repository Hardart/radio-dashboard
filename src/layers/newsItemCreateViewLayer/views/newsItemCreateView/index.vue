<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/store/useNewsStore'
import { useNewsItemStore } from '@/store/useNewsItemStore'

import ArticleForm from './components/ArticleForm/ArticleForm.vue'

const newsStore = useNewsStore()

const { tags, categories } = storeToRefs(useNewsItemStore())
const { articleForm } = storeToRefs(newsStore)
</script>

<template>
  <ArticleForm v-model="articleForm" :tags :categories />
</template>

<style lang="scss" scoped src="./styles.scss" />
