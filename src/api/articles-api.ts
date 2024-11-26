import { useHdFetch } from '@/api/base-fetch/base-fetch'
import { useNotifications } from '@/components/ui/hdNotification/useNotifications'
import type { ArticleForm } from '@/shared/schemes/article-form-schema'
import type { Article } from '@/shared/schemes/article-schema'
import type { ResponseApi } from '@/shared/types/ResponseAPI'

export const articlesAPI = {
  async baseData() {
    const { data } = await useHdFetch<ResponseApi.ArticleBase>('/article-base')
    const tags = data.value?.tags || []
    const categories = data.value?.categories || []
    return { tags, categories }
  },

  async list() {
    const { data } = await useHdFetch<ResponseApi.ArticleList>('/article-list')
    const articles = data.value?.articles.map(addStatus) || []

    return { articles }
  },

  async byId(id: string) {
    const { data } = await useHdFetch<ResponseApi.ArticleSingle>('/article', {
      body: { id },
    })
    const article = data.value?.article
      ? addStatus(data.value.article)
      : undefined

    return { article }
  },

  async addOne(body: ArticleForm) {
    const toast = useNotifications()
    const { data } = await useHdFetch<ResponseApi.ArticleSingle>(
      '/article-add',
      { body }
    )
    if (data.value)
      toast.add({
        text: 'Новость успешно добавлена',
        duration: 3000,
        status: 'success',
        icon: 'check',
      })
    return data.value ? addStatus(data.value.article) : undefined
  },

  async updateOne(body: ArticleForm) {
    const toast = useNotifications()
    const { data } = await useHdFetch<ResponseApi.ArticleSingle>(
      '/article-update',
      { body }
    )
    if (data.value)
      toast.add({
        text: 'Новость успешно обновлена',
        duration: 3000,
        status: 'success',
        icon: 'check',
      })

    return data.value ? addStatus(data.value.article) : undefined
  },
}

function addStatus(item: Article) {
  if (!item.isPublished) item.status = 'не опубликовано'
  else if (item.isPublished && new Date() > new Date(item.publishAt))
    item.status = 'опубликовано'
  else item.status = 'в ожидании'
  return item
}
