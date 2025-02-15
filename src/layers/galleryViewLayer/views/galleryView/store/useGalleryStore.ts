import { galleryAPI } from '@/api/gallery-api'
import type { Slide } from '@/shared/schemes/slide-schema'

import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useGalleryStore = defineStore('gallery', () => {
  const pending = ref(false)
  const isOpenSlideEditForm = ref(false)
  const slides = ref<Slide[]>([])

  const slideFormData = reactive<Slide>({
    title: undefined,
    subtitle: undefined,
    src: '',
    id: '',
  })

  function toggleSlideEditFormState(state?: boolean) {
    return (isOpenSlideEditForm.value = state
      ? state
      : !isOpenSlideEditForm.value)
  }

  async function fetchGallery() {
    const response = await galleryAPI.list()
    sortSlides(response)
    slides.value = response
  }

  async function saveChanges() {
    updateSlidePriority()
    await galleryAPI.saveAllSlides(slides)
  }

  function sortSlides(slides: Slide[]) {
    slides.sort((a, b) => {
      if (
        typeof a.priority !== 'undefined' &&
        typeof b.priority !== 'undefined'
      ) {
        return a.priority < b.priority ? 1 : -1
      }
      return 1
    })
  }

  function updateSlidePriority() {
    slides.value.forEach((slide, idx) => {
      slide.priority = slides.value.length - idx
    })
  }

  async function onAdd() {
    slideFormData.priority = slides.value.length
    slideFormData.src = slideFormData.src.replace('350x150', '1536x658')
    const res = await galleryAPI.addOne(slideFormData)
    if (typeof res === 'undefined') return onCancel()

    slides.value?.push(res)
    onCancel()
  }

  function onEdit(slide: Slide) {
    const keys = Object.entries(slide) as [keyof typeof slide, any][]

    keys.forEach(([key, value]) => {
      if (typeof value === 'undefined') delete slide[key]
      else (slideFormData[key] as any) = value
    })

    toggleSlideEditFormState(true)
  }

  function onUpdate(slide: Slide) {
    const keys = Object.keys(slide) as (keyof typeof slide)[]
    keys.forEach((key) => {
      if (slideFormData[key] === '' || slideFormData[key] === undefined)
        delete slideFormData[key]
    })

    const idx = slides.value.findIndex((item) => item.id === slideFormData.id)
    slides.value.splice(idx, 1, { ...slideFormData })

    onCancel()
  }

  async function onDelete(slide: Slide) {
    await galleryAPI.deleteOne({ id: slide.id })
    slides.value = slides.value.filter((item) => item.id !== slide.id)
  }

  function onCancel() {
    clearSlideFormData()
    toggleSlideEditFormState(false)
  }

  function clearSlideFormData() {
    slideFormData.id = ''
    slideFormData.src = ''
    delete slideFormData.priority
    delete slideFormData.title
    delete slideFormData.subtitle
    delete slideFormData.to
  }

  return {
    slides,
    slideFormData,
    pending,
    isOpenSlideEditForm,
    fetchGallery,
    onAdd,
    onEdit,
    onUpdate,
    onDelete,
    onCancel,
    saveChanges,
    toggleSlideEditFormState,
  }
})
