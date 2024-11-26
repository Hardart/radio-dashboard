<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/store/useNewsStore'

import ArticleForm from '../../components/ArticleForm/ArticleForm.vue'
import { computed, onUnmounted, watch } from 'vue'
const route = useRoute()
const newsStore = useNewsStore()

const { articleForm, tags, categories } = storeToRefs(newsStore)
const id = computed(() => `${route.params.id}`)
watch(id, () => newsStore.fetchArticle(id.value), { immediate: true })
onUnmounted(newsStore.clearArticleForm)
</script>

<template>
  <ArticleForm v-model="articleForm" :tags :categories />
</template>

<style lang="scss" scoped src="./styles.scss" />
