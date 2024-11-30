<script async setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useNewsStore } from '@/store/useNewsStore'

import ArticleForm from '../../components/ArticleForm/ArticleForm.vue'
import { computed, onUnmounted, watch } from 'vue'
const route = useRoute()
const router = useRouter()
const newsStore = useNewsStore()

const { articleForm, tags, categories } = storeToRefs(newsStore)
const id = computed(() => `${route.params.id}`)
watch(id, () => newsStore.fetchArticle(id.value), {
  immediate: true,
  once: true,
})
onUnmounted(newsStore.clearArticleForm)

const onDelete = async (id: string) => {
  await newsStore.deleteArticle(id)
  router.push('/news')
}
</script>

<template>
  <ArticleForm
    v-if="articleForm.id"
    v-model="articleForm"
    :tags
    :categories
    @on-submit="newsStore.updateArticle(articleForm)"
    @on-delete="onDelete"
  />
</template>

<style lang="scss" scoped src="./styles.scss" />
