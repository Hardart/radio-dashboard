<script setup lang="ts">
import { galleryAPI } from '@/api/gallery-api'
import Sortable from '@/components/sortable/Sortable.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { ref } from 'vue'
const gallery = ref()

async function fetchGallery() {
  gallery.value = await galleryAPI.list()
}
fetchGallery()
</script>

<template>
  <Sortable
    v-if="gallery"
    item-key="id"
    v-model="gallery"
    class="sortable"
    selector="[sortable-item]"
    handle="handle"
  >
    <template #item="{ item }">
      <div class="sortable__item" sortable-item>
        <div class="sortable__media">
          <div class="sortable__handle" handle></div>

          <img
            @dragstart.prevent
            class="sortable__image"
            src="http://localhost:3068/images/home/images/gallery/6a747f1484ea0f46_75.webp"
            alt=""
          />
          <div class="sortable__controllers">
            <HdButton icon="lock" type="success" />
          </div>
        </div>
      </div>
    </template>
  </Sortable>
</template>

<style lang="scss" scoped src="./style.scss" />
