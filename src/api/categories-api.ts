import type { CategoryFormData } from '@schema/category-form-schema'
import type { ResponseApi } from '@type/ResponseAPI'
import { useHdFetch } from './base-fetch/base-fetch'

export const categoriesAPI = {
  async list() {
    const { data } = await useHdFetch<ResponseApi.CategoryList>(
      '/category-list'
    )
    return data.value ? data.value.categories : []
  },

  async getOne(body: { id: string }) {
    const { data } = await useHdFetch<ResponseApi.CategorySingle>('/category', {
      body,
    })
    return data.value ? data.value.category : undefined
  },

  async updateOne(body: CategoryFormData) {
    const { data } = await useHdFetch<ResponseApi.CategorySingle>(
      '/category-update',
      { body }
    )
    return data.value ? data.value.category : undefined
  },

  async addOne(body: CategoryFormData) {
    const { data } = await useHdFetch<ResponseApi.CategorySingle>(
      '/category-add',
      { body }
    )
    return data.value ? data.value.category : undefined
  },

  async deleteOne(body: { id: string }) {
    const { data } = await useHdFetch<ResponseApi.CategorySingle>(
      '/category-delete',
      { body }
    )
    return data.value ? data.value.category : undefined
  },
}
