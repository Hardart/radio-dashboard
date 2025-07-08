import { defineStore } from 'pinia'
import { ref, computed, reactive, type Ref } from 'vue'
import { articlesAPI } from '@/api/articles-api'
import { sort } from '@/shared/helpers/sort-articles'
import type { Article } from '@schema/article-schema'
import type { ArticleForm } from '@schema/article-form-schema'
import type { Category } from '@schema/category-schema'
import transcript from '@/shared/helpers/slug-transcript'
import router from '@/router'

import { isEqual, cloneDeep } from 'lodash'
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
    publishAt: new Date().toISOString(),
    content: '',
  })

  let toEqualForm: ArticleForm = cloneDeep(articleForm)

  const articlesCount = computed(() => articles.value.length)

  const isFormNotChanged = computed(() => isEqual(articleForm, toEqualForm))

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
    pending.value = false
  }

  async function fetchArticle(id: string) {
    pending.value = true
    const response = await articlesAPI.byId(id)
    article.value = response.article
    initArticleForm(article, articleForm)
    toEqualForm = cloneDeep(articleForm)
    pending.value = false
  }

  async function updateArticle(input: ArticleForm) {
    if (article.value) input.id = article.value.id
    pending.value = true
    const articleData = await articlesAPI.updateOne(input)
    pending.value = false
    if (!articleData) return
    articles.value = articles.value.filter((item) => item.id !== input.id)
    articles.value.push(articleData)
  }

  async function addArticle() {
    articleForm.slug = transcript(articleForm.title)
    pending.value = true
    const articleData = await articlesAPI.addOne(articleForm)
    pending.value = false
    if (!articleData) return
    articles.value.push(articleData)
    router.push(`/news/${articleData.id}`)
  }

  async function deleteArticle(id: string) {
    pending.value = true
    const data = await articlesAPI.deleteOne({ id })
    pending.value = false
    if (!data) return
    articles.value = articles.value.filter((item) => item.id !== id)
    router.push('/news')
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
    articleForm.publishAt = new Date().toISOString()
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
    articlesCount,
    isFormNotChanged,
    toEqualForm,
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
