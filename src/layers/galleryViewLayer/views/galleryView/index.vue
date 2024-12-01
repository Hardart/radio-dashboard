<script setup lang="ts">
import { galleryAPI } from '@/api/gallery-api'
import Sortable from '@/components/sortable/Sortable.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdModal from '@/components/ui/hdModal/HdModal.vue'
import { useToggle } from '@/composables/useToggle'
import type { Slide } from '@/shared/schemes/slide-schema'
import { reactive, ref } from 'vue'
import SlideItem from './components/Slide/Slide.vue'
import { correctImageUrl } from '@/shared/helpers/utils'

const gallery = ref<Slide[]>([])

const [isOpen, toggle] = useToggle()

async function fetchGallery() {
  const response = await galleryAPI.list()
  gallery.value = response.map((item) => {
    item.src = correctImageUrl(item.src) || ''
    return item
  })
}

const slideFormData = reactive<Slide>({
  title: undefined,
  subtitle: undefined,
  src: '',
  id: '',
})

async function addSlide() {
  slideFormData.id = `${gallery.value.length + 1}`
  gallery.value?.push({ ...slideFormData })
  onCancelAddingSlide()
}

function onCancelAddingSlide() {
  clearSlideFormData()
  toggle()
}

function clearSlideFormData() {
  slideFormData.id = ''
  slideFormData.src = ''
  delete slideFormData.priority
  delete slideFormData.title
  delete slideFormData.subtitle
  delete slideFormData.to
}

function onEdit(slide: Slide) {
  const keys = Object.entries(slide) as [keyof typeof slide, any][]

  keys.forEach(([key, value]) => {
    if (typeof value === 'undefined') delete slide[key]
    else if (typeof value === 'string') (slideFormData[key] as string) = value
    else if (typeof value === 'number') (slideFormData[key] as number) = value
  })

  toggle(true)
}

function onUpdate(slide: Slide) {
  const keys = Object.keys(slide) as (keyof typeof slide)[]
  keys.forEach((key) => {
    if (slideFormData[key] === '' || slideFormData[key] === undefined)
      delete slideFormData[key]
  })

  const idx = gallery.value.findIndex((item) => item.id === slideFormData.id)
  gallery.value.splice(idx, 1, { ...slideFormData })

  onCancelAddingSlide()
}

async function onSaveChanges() {
  gallery.value = gallery.value.map((slide, i) => {
    slide.priority = i
    slide.src = slide.src.replace('350x100', '1530x420')
    return slide
  })
  await galleryAPI.saveAllSlides(gallery)
}

const children = ref()

fetchGallery()
</script>

<template>
  <div class="gallery">
    <div class="gallery__header">
      <HdButton text="Добавить слайд" color="primary" @click="toggle()" />
    </div>
    <div class="gallery__content" ref="children">
      <Sortable
        v-if="gallery"
        item-key="id"
        v-model="gallery"
        class="gallery-slide-list"
        selector="[sortable-item]"
        handle="handle"
      >
        <template #item="{ item }">
          <div class="gallery-slide" sortable-item>
            <div class="gallery-slide__media">
              <div class="gallery-slide__handle" handle></div>

              <img
                @dragstart.prevent
                class="gallery-slide__image"
                :src="item.src"
                alt=""
                v-if="item.src"
              />
              <div class="gallery-slide__placeholder" v-else></div>
              <h3 class="gallery-slide__title">{{ item.title }}</h3>

              <div class="gallery-slide__controllers">
                <HdButton
                  @click="onEdit(item)"
                  variant="solid"
                  icon="edit"
                  square
                  v-tooltip="{ label: 'Редактировать' }"
                />
              </div>
            </div>
          </div>
        </template>
      </Sortable>
    </div>
    <div class="gallery__footer">
      <HdButton
        text="Сохранить изменения"
        @click="onSaveChanges"
        color="success"
      />
    </div>
    <HdModal :is-open>
      <SlideItem
        :slide="slideFormData"
        @on-add="addSlide"
        @on-cancel="onCancelAddingSlide"
        @on-edit="onUpdate"
      />
    </HdModal>
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
