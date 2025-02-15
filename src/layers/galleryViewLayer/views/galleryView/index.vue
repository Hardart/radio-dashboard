<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToggle } from '@vueuse/core'
import { onBeforeRouteLeave } from 'vue-router'
import DashboardContentLayout from '@/layouts/dashboardContentLayout.vue'
import DashboardContentHeaderLayout from '@/layouts/dashboardContentHeaderLayout.vue'
import { useGalleryStore } from './store/useGalleryStore'
import RefSortable from '@/components/hdrt/sortable/RefSortable.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import Slide from './components/Slide/Slide.vue'
import HdModal from '@/components/ui/hdModal/HdModal.vue'
import DashboardContentBodyLayout from '@/layouts/dashboardContentBodyLayout.vue'
import DashboardContentFooterLayout from '@/layouts/dashboardContentFooterLayout.vue'
const galleryStore = useGalleryStore()
const { slides, slideFormData, isOpenSlideEditForm } = storeToRefs(galleryStore)

const [isShowSortable, toggle] = useToggle(true)
onBeforeRouteLeave(() => {
  toggle()
  return
})
galleryStore.fetchGallery()
</script>

<template>
  <DashboardContentLayout>
    <DashboardContentHeaderLayout>
      <div class="dashboard__header--left">
        <h3 class="dashboard__header-title">Слайдшоу на главной</h3>
      </div>
      <HdButton
        text="Добавить слайд"
        color="primary"
        @click="galleryStore.toggleSlideEditFormState()"
        icon="image-add"
      />
    </DashboardContentHeaderLayout>
    <DashboardContentBodyLayout>
      <RefSortable
        v-if="isShowSortable && slides.length"
        v-model="slides"
        class="gallery-slide-list"
      >
        <template #item="{ item }">
          <div class="gallery-slide">
            <div class="gallery-slide__media">
              <img
                @dragstart.prevent
                class="gallery-slide__image"
                :src="item.src"
                alt=""
                v-if="item.src"
              />

              <h3 class="gallery-slide__title">{{ item.title }}</h3>

              <div class="gallery-slide__controllers">
                <HdButton
                  @click="galleryStore.onEdit(item)"
                  icon="edit"
                  square
                  v-tooltip="{ label: 'редактировать' }"
                />
                <HdButton
                  @click="galleryStore.onDelete(item)"
                  icon="delete"
                  color="danger"
                  square
                  v-tooltip="{ label: 'удалить' }"
                />
              </div>
            </div>
          </div>
        </template>
        <template #clone="{ data }">
          <div class="gallery-slide">
            <div class="gallery-slide__media">
              <img
                @dragstart.prevent
                class="gallery-slide__image"
                :src="data.src"
                alt=""
                v-if="data.src"
              />

              <h3 class="gallery-slide__title">{{ data.title }}</h3>

              <div class="gallery-slide__controllers">
                <HdButton
                  @click="galleryStore.onEdit(data)"
                  icon="edit"
                  square
                  v-tooltip="{ label: 'редактировать' }"
                />
                <HdButton
                  @click="galleryStore.onDelete(data)"
                  icon="delete"
                  color="danger"
                  square
                  v-tooltip="{ label: 'удалить' }"
                />
              </div>
            </div>
          </div>
        </template>
      </RefSortable>
    </DashboardContentBodyLayout>
    <DashboardContentFooterLayout>
      <HdButton
        text="Сохранить изменения"
        color="success"
        @click="galleryStore.saveChanges"
      />
    </DashboardContentFooterLayout>
  </DashboardContentLayout>
  <HdModal v-model="isOpenSlideEditForm">
    <Slide
      :slide="slideFormData"
      @on-add="galleryStore.onAdd"
      @on-cancel="galleryStore.onCancel"
      @on-edit="galleryStore.onUpdate"
    />
  </HdModal>
</template>

<style lang="scss" scoped src="./style.scss" />
