<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/store/useNewsStore'

import ArticleForm from './components/ArticleForm/ArticleForm.vue'

const newsStore = useNewsStore()

const { articleForm, tags, categories } = storeToRefs(newsStore)
</script>

<template>
  <ArticleForm v-model="articleForm" :tags :categories />
</template>

<style lang="scss" scoped src="./styles.scss" />
