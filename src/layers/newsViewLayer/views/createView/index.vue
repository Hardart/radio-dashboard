<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/layers/newsViewLayer/store/useNewsStore'
import ArticleForm from '../../components/ArticleForm/ArticleForm.vue'
import { onMounted } from 'vue'

const newsStore = useNewsStore()
const { articleForm, tags, categories, pending } = storeToRefs(newsStore)
onMounted(newsStore.clearArticleForm)
</script>

<template>
  <ArticleForm
    v-model="articleForm"
    :tags
    :categories
    :loading="pending"
    @on-submit="newsStore.addArticle"
  />
</template>

<style lang="scss" scoped src="./styles.scss" />
