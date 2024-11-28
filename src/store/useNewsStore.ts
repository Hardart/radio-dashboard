import { defineStore } from 'pinia'
import { ref, computed, reactive, type Ref } from 'vue'
import { articlesAPI } from '@/api/articles-api'
import { sort } from '@/shared/helpers/sort-articles'
import type { Article } from '@/shared/schemes/article-schema'
import type { ArticleForm } from '@/shared/schemes/article-form-schema'
import type { Category } from '@/shared/schemes/category-schema'
import transcript from '@/shared/helpers/slugTranscript'

export const useNewsStore = defineStore('news', () => {
  const search = ref('')

  const articles = ref<Article[]>([])
  const article = ref<Article>()
  const tags = ref<string[]>([])
  const categories = ref<Category[]>([])

  const pending = ref(false)
  const error = ref(false)
  const articleForm = reactive<ArticleForm>({
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

  async function addArticle(input: ArticleForm) {
    input.slug = transcript(input.title)
    pending.value = true
    const articleData = await articlesAPI.addOne(input)
    pending.value = false
    if (!articleData) return console.warn('Данныеrr не получены')
    articles.value.push(articleData)
  }

  async function deleteArticle(id: string) {
    pending.value = true
    const data = await articlesAPI.deleteOne({ id })
    pending.value = false
    if (!data) return console.warn('Данные не получены')
    articles.value = articles.value.filter((item) => item.id !== id)
  }

  async function fetchBaseData() {
    pending.value = true
    const response = await articlesAPI.baseData()
    pending.value = false
    tags.value = response.tags
    categories.value = response.categories
  }

  function clearArticleForm() {
    articleForm.categoryId = ''
    articleForm.content = ''
    articleForm.id = ''
    articleForm.image = ''
    articleForm.isPublished = false
    articleForm.publishAt = ''
    articleForm.tags = []
    articleForm.title = ''
  }

  return {
    search,
    articlesFilteredByTitle,
    article,
    pending,
    error,
    articleForm,
    tags,
    categories,
    fetchBaseData,
    fetchArticles,
    fetchArticle,
    updateArticle,
    clearArticleForm,
    addArticle,
    deleteArticle,
  }
})

function initArticleForm(article: Ref<Article | undefined>, form: ArticleForm) {
  if (!article.value) return

  const { category, tags, isPublished, title, publishAt, content, image, id } =
    article.value

  form.categoryId = category.id
  form.tags = tags
  form.content = content
  form.isPublished = isPublished
  form.title = title
  form.publishAt = publishAt
  form.image = image
  form.id = id
}
