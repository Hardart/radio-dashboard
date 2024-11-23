import { categoriesAPI } from '@/api/categories-api'
import { defineStore } from 'pinia'
import type { Category } from '@/shared/schemes/category-schema'
import type { CategoryFormData } from '@/shared/schemes/category-form-schema'
import { ref, computed } from 'vue'

export const useCategoriesStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const category = ref<Category>()

  // const categoryFormData = ref<CategoryFormData>({ ...categoryState })

  const categoriesCount = computed(() => categories.value.length)
  const loading = ref(false)
  const q = ref(undefined)
  const selectedStatuses = ref([])
  const selectedCategories = ref([])
  const sort = ref({ column: 'createdAt', direction: 'desc' as const })

  const query = computed(() => ({
    q: q.value,
    isPublished: selectedStatuses.value,
    id: selectedCategories.value,
    sort: `${sort.value.column}_${sort.value.direction}`,
  }))

  // function findOne(id: string) {
  //   const a = categories.value.find((item) => item.id === id)
  //   if (a) transformCategoryToFormData(a)
  // }

  async function fetchCategories() {
    categories.value = await categoriesAPI.list()
  }

  async function addCategory(input: { data: CategoryFormData }) {
    const response = await categoriesAPI.addOne(input.data)
    if (!response) return console.warn('Данные не получены')
    categories.value.unshift(response)
  }

  async function updateCategory(input: { data: CategoryFormData }) {
    const response = await categoriesAPI.updateOne(input.data)
    if (!response) return console.warn('Данные не получены')
  }

  async function deleteCategory(id: string) {
    const response = await categoriesAPI.deleteOne({ id })
    if (!response) return console.warn('Данные не получены')
    categories.value = categories.value.filter((item) => item.id !== id)
  }

  return {
    categories,
    category,
    sort,
    selectedStatuses,
    selectedCategories,
    q,
    query,
    categoriesCount,
    loading,

    fetchCategories,
    addCategory,
    updateCategory,

    deleteCategory,
  }
})
