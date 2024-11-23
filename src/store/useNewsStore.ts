import { defineStore, storeToRefs } from 'pinia'
import { ref, computed, reactive, type Ref, toValue, watch } from 'vue'
import type { Article } from '@/shared/schemes/article-schema'
import type { ArticleForm } from '@/shared/schemes/article-form-schema'
import { sort } from '@/shared/helpers/sort-articles'
import { articlesAPI } from '@/api/articles-api'

export const useNewsStore = defineStore('news', () => {
  const search = ref('')

  const articles = ref<Article[]>([])
  const article = ref<Article>()

  const pending = ref(false)
  const error = ref(false)
  const articleForm = ref<ArticleForm>({
    title: '',
    categoryId: '',
    tags: [],
    isPublished: false,
    publishAt: '',
    content: '',
  })

  const sortedArticles = computed(() =>
    articles.value?.sort((a, b) => {
      if (a[sort.value.column] < b[sort.value.column])
        return sort.value.direction ? -1 : 1
      if (a[sort.value.column] > b[sort.value.column])
        return sort.value.direction ? 1 : -1
      return 0
    })
  )

  const articlesFilteredByTitle = computed(() =>
    sortedArticles.value?.filter((article) =>
      search.value.trim()
        ? article.title
            .toLowerCase()
            .includes(search.value.toLowerCase().trim())
        : article
    )
  )

  async function fetchArticles() {
    pending.value = true
    const res = await articlesAPI.list()
    articles.value = res.articles
    // tags.value = res.articles
    pending.value = false
  }

  async function fetchArticle(id: string) {
    pending.value = true
    const response = await articlesAPI.byId(id)
    article.value = response.article
    initArticleForm(article, articleForm)
    pending.value = false
  }

  async function updateArticle(input: ArticleForm) {
    if (article.value) input.id = article.value.id
    pending.value = true
    const articleData = await articlesAPI.updateOne(input)
    pending.value = false
    if (!articleData) return console.warn('Данные не получены')
    articles.value = articles.value.filter((item) => item.id !== input.id)
    articles.value.push(articleData)
  }

  return {
    search,
    articlesFilteredByTitle,
    article,
    pending,
    error,
    articleForm,
    fetchArticles,
    fetchArticle,
    updateArticle,
  }
})

function initArticleForm(
  article: Ref<Article | undefined>,
  form: Ref<ArticleForm>
) {
  if (typeof article.value === 'undefined') return
  const { category, tags, isPublished, title, publishAt, content, image } =
    article.value

  form.value = {
    categoryId: category.id,
    tags,
    title,
    isPublished,
    publishAt,
    content,
    image,
  }
}
