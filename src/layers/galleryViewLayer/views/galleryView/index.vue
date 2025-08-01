<script setup lang="ts">
import type { ExtendedSlide } from '@schema/slide-schema'
import { nextTick, ref } from 'vue'
import * as ContentLayout from '@contentLayout'
import * as UI from '@ui'
import { useResizeObserver } from '@vueuse/core'
import Slide from './components/Slide/Slide.vue'
import { useGalleryStore } from './store/useGalleryStore'
import { Sortable } from '@/components/sortable/Sortable'
import { replaceGalleryImage } from '@/shared/helpers/utils'

const rootElement = ref<HTMLElement>()
const sortable = ref(new Sortable())
const slidesWithStyle = ref<ExtendedSlide[]>([])

const galleryStore = useGalleryStore()

async function initSlides() {
  await galleryStore.fetchGallery()
  slidesWithStyle.value = galleryStore.slides.map((slide) => ({
    ...slide,
    style: {},
  }))
  await nextTick()
  sortable.value.init(rootElement.value, slidesWithStyle.value)
}

async function addSlide() {
  const slide = await galleryStore.onAdd()
  slidesWithStyle.value.push({ ...slide, style: {} })
  await nextTick()
  sortable.value.init(rootElement.value, slidesWithStyle.value)
}

initSlides()
useResizeObserver(rootElement, () => sortable.value.initBounds())
</script>

<template>
  <ContentLayout.Root>
    <ContentLayout.Header title="Слайдер">
      <UI.Button
        text="Добавить слайд"
        color="primary"
        @click="galleryStore.toggleSlideEditFormState()"
        icon="image-add"
      />
    </ContentLayout.Header>
    <ContentLayout.Body>
      <div
        class="grid"
        ref="rootElement"
        v-if="slidesWithStyle.length"
        :style="sortable.style"
      >
        <template v-for="(slide, idx) in slidesWithStyle" :key="slide.id">
          <div
            class="card"
            :class="{ 'card--selected': sortable.clone.isSelected(slide.id) }"
            :style="slide.style"
            @pointerdown.prevent.stop="
              sortable.events.onPointerDown($event, idx)
            "
            @pointerenter="sortable.events.onPointerEnter(slide, idx)"
            @transitionend="sortable.events.onSLideTransitionEnd"
          >
            <div class="gallery-slide">
              <div class="gallery-slide__media">
                <img
                  @dragstart.prevent
                  class="gallery-slide__image"
                  :src="replaceGalleryImage(slide.src)"
                  alt=""
                  v-if="slide.src"
                />

                <h3 class="gallery-slide__title">{{ slide.title }}</h3>

                <div class="gallery-slide__controllers">
                  <UI.Button
                    @pointerdown.stop="galleryStore.onEdit(slide)"
                    icon="edit"
                    square
                    v-tooltip="{ label: 'редактировать' }"
                  />
                  <UI.Button
                    @pointerdown.stop="galleryStore.onDelete(slide)"
                    icon="delete"
                    color="danger"
                    square
                    v-tooltip="{ label: 'удалить' }"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <div
          class="card clone"
          v-if="sortable.clone.isCloneInit"
          :style="sortable.clone.style"
          @transitionend="sortable.events.onCloneTransitionEnd"
        >
          <div class="gallery-slide">
            <div class="gallery-slide__media">
              <img
                @dragstart.prevent
                class="gallery-slide__image"
                :src="replaceGalleryImage(sortable.clone.slide.src)"
                alt=""
                v-if="sortable.clone.slide?.src"
              />
            </div>
          </div>
        </div>
      </div>
      <UI.Modal v-model="galleryStore.isOpenSlideEditForm">
        <Slide
          :slide="galleryStore.slideFormData"
          @on-add="addSlide"
          @on-cancel="galleryStore.onCancel"
          @on-edit="galleryStore.onUpdate"
        />
      </UI.Modal>
    </ContentLayout.Body>
    <ContentLayout.Footer>
      <UI.Button
        text="Сохранить изменения"
        color="success"
        @click="galleryStore.saveChanges(slidesWithStyle)"
      />
    </ContentLayout.Footer>
  </ContentLayout.Root>
</template>

<style lang="scss" src="./style.scss" />
