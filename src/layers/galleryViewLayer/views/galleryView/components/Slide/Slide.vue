<script lang="ts" setup>
import * as UI from '@ui'
import type { Slide } from '@schema/slide-schema'
import { replaceGalleryImage } from '@/shared/helpers/utils'

defineProps<{ slide: Slide }>()
defineEmits(['onAdd', 'onEdit', 'onCancel'])
</script>

<template>
  <div class="slide">
    <div class="slide__header">
      <div class="slide__media">
        <div class="slide__wrapper">
          <img
            v-if="slide.src"
            class="slide__image"
            :src="replaceGalleryImage(slide.src, 'md')"
            alt=""
          />
          <div v-else class="slide__placeholder"></div>
        </div>
        <div class="slide__controllers">
          <UI.UploadImage
            name="GALLERY"
            icon="image-add"
            v-model="slide.src"
            v-tooltip="{ label: 'загрузить изображение' }"
          />
          <UI.SelectImage
            name="GALLERY"
            v-model="slide.src"
            tooltip-label="выбрать изображение"
          />
        </div>
      </div>
    </div>
    <div class="slide__body">
      <UI.Input placeholder="Ссылка" v-model="slide.to" />
    </div>
    <div class="slide__footer">
      <UI.Button
        text="Отменить"
        color="danger"
        @click="$emit('onCancel', slide)"
      />

      <UI.Button
        v-if="slide.id"
        text="Изменить"
        color="success"
        @click="$emit('onEdit', slide)"
      />
      <UI.Button
        v-else
        text="Добавить"
        color="success"
        @click="$emit('onAdd', slide)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
