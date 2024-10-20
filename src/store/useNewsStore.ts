import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Article } from '@/shared/schemes/article-schema'
import { setStatus } from '@/shared/helpers/set-status'
import { sort } from '@/shared/helpers/sort-articles'

export const useNewsStore = defineStore('news', () => {
  const search = ref('')
  const articles = ref<Article[]>([])
  const pending = ref(false)

  const sortedArticles = computed(() =>
    articles.value.sort((a, b) => {
      if (a[sort.value.column] < b[sort.value.column])
        return sort.value.direction ? -1 : 1
      if (a[sort.value.column] > b[sort.value.column])
        return sort.value.direction ? 1 : -1
      return 0
    })
  )

  const articlesFilteredByTitle = computed(() =>
    sortedArticles.value.filter((article) =>
      search.value.trim()
        ? article.title
            .toLowerCase()
            .includes(search.value.toLowerCase().trim())
        : article
    )
  )

  async function fetchArticles() {
    try {
      pending.value = true
      const response = await fetch(
        'http://localhost:3068/api/v1/dashboard/article-list',
        { method: 'POST' }
      )

      const { data } = await response.json()
      articles.value = data.articles.map(setStatus)
    } catch (error) {
      console.log(error)
    } finally {
      pending.value = false
    }
  }

  return { search, articlesFilteredByTitle, pending, fetchArticles }
})
