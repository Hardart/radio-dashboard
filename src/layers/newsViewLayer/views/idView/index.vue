<script async setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useNewsStore } from '@/layers/newsViewLayer/store/useNewsStore'

import ArticleForm from '../../components/ArticleForm/ArticleForm.vue'
import { computed, onUnmounted, watch } from 'vue'
const route = useRoute()
const newsStore = useNewsStore()

const {
  articleForm,
  tags,
  categories,
  pending,
  isFormNotChanged,
  toEqualForm,
} = storeToRefs(newsStore)
const id = computed(() => `${route.params.id}`)
watch(id, () => newsStore.fetchArticle(id.value), {
  immediate: true,
  once: true,
})
onUnmounted(newsStore.clearArticleForm)
</script>

<template>
  <ArticleForm
    v-if="articleForm.id"
    v-model="articleForm"
    :tags
    :categories
    :loading="pending"
    :is-same="isFormNotChanged"
    @on-submit="newsStore.updateArticle"
    @on-delete="newsStore.deleteArticle"
  />
  {{ toEqualForm }}
</template>

<style lang="scss" scoped src="./styles.scss" />
