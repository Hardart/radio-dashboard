<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNewsStore } from '@/store/useNewsStore'
import ArticleForm from '../../components/ArticleForm/ArticleForm.vue'
import { onMounted } from 'vue'

const newsStore = useNewsStore()
const { articleForm, tags, categories } = storeToRefs(newsStore)
onMounted(newsStore.clearArticleForm)
const onSubmit = () => {
  newsStore.addArticle(newsStore.articleForm)
}
</script>

<template>
  <ArticleForm v-model="articleForm" :tags :categories @on-submit="onSubmit" />
</template>

<style lang="scss" scoped src="./styles.scss" />
