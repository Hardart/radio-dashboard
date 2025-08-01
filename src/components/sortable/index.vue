<script setup lang="ts">
import type { ExtendedSlide, Slide } from '@schema/slide-schema'
import { nextTick, ref } from 'vue'
import { Sortable } from './Sortable'
import HdButton from '@hd/hdButton/hdButton.vue'
import { useResizeObserver } from '@vueuse/core'
import { createTempId } from '@/layers/programsViewLayer/utils/helpers'

const rootElement = ref<HTMLElement>()

const sortable = ref(new Sortable())

const slides: Slide[] = [
  { id: createTempId(), src: '' },
  { id: createTempId(), src: '' },
  { id: createTempId(), src: '' },
  { id: createTempId(), src: '' },
  { id: createTempId(), src: '' },
  { id: createTempId(), src: '' },
]

const slidesWithStyle = ref<ExtendedSlide[]>([])

async function addLocalSlide() {
  const slide: ExtendedSlide = {
    id: createTempId(),
    src: '',
    style: {},
    title: createTempId(),
  }

  slidesWithStyle.value.push(slide)
  await nextTick()
  const rootEl = rootElement.value
  sortable.value.init(rootEl, slidesWithStyle.value)
}

async function initSlides() {
  slidesWithStyle.value = slides.map((slide) => ({ ...slide, style: {} }))
  await nextTick()
  sortable.value.init(rootElement.value, slidesWithStyle.value)
}

initSlides()
useResizeObserver(rootElement, () => sortable.value.initBounds())
</script>

<template>
  <div
    v-if="slidesWithStyle.length"
    ref="rootElement"
    class="grid"
    :style="sortable.style"
  >
    <template v-for="(slide, idx) in slidesWithStyle" :key="slide.id">
      <div
        class="card"
        :class="{ 'card--selected': sortable.clone.isSelected(slide.id) }"
        :style="slide.style"
        @pointerdown="sortable.events.onPointerDown($event, idx)"
        @pointerenter="sortable.events.onPointerEnter(slide, idx)"
        @transitionend="sortable.events.onSLideTransitionEnd"
      >
        <div class="gallery-slide">
          <div class="gallery-slide__media">
            <img
              v-if="slide.src"
              class="gallery-slide__image"
              :src="slide.src"
              @dragstart.prevent
            />

            <h3 class="gallery-slide__title">{{ slide.title }}</h3>

            <div class="gallery-slide__controllers">
              <HdButton
                icon="edit"
                square
                v-tooltip="{ label: 'редактировать' }"
              />
              <HdButton
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
      v-if="sortable.clone.isCloneInit"
      class="card clone"
      :style="sortable.clone.style"
      @transitionend="sortable.events.onCloneTransitionEnd"
    >
      <div class="gallery-slide">
        <div class="gallery-slide__media">
          <img
            v-if="sortable.clone.slide?.src"
            class="gallery-slide__image"
            :src="sortable.clone.slide.src"
            @dragstart.prevent
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss" scoped />
