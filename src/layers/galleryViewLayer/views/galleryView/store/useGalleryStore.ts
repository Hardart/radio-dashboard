import { galleryAPI } from '@/api/gallery-api'
import { removeLocalUrl } from '@/shared/helpers/utils'
import type { ExtendedSlide, Slide } from '@schema/slide-schema'

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

  async function saveChanges(extendedSlides: ExtendedSlide[]) {
    updateSlidePriority(extendedSlides)
    await galleryAPI.saveAllSlides(extendedSlides)
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

  function updateSlidePriority(slides: ExtendedSlide[]) {
    slides.forEach((slide, idx) => {
      slide.priority = slides.length - idx
    })
  }

  function correctImageSrc() {
    slideFormData.src = slideFormData.src.replace('350x150', '1536x658')
    slideFormData.src = removeLocalUrl(slideFormData.src)
  }

  async function onAdd() {
    slideFormData.priority = slides.value.length
    correctImageSrc()
    const slide = await galleryAPI.addOne(slideFormData)
    if (typeof slide === 'undefined') throw new Error('can_t add new slide')
    slides.value?.push(slide)
    onCancel()
    return slide
  }

  function onEdit(slide: Slide) {
    Object.assign(slideFormData, slide)
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
    const deletedId = await galleryAPI.deleteOne({
      id: slide.id,
      path: slide.src,
    })

    if (!deletedId) throw new Error('can_t delete image from gallery')
    slides.value = slides.value.filter((item) => item.id !== deletedId)
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
