<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdUploadImage from '@/components/ui/hdUploadImage/hdUploadImage.vue'
import type { Slide } from '@/shared/schemes/slide-schema'

defineProps<{
  slide: Slide
}>()
defineEmits(['onAdd', 'onEdit', 'onCancel'])
</script>

<template>
  <div class="slide">
    <div class="slide__header">
      <div class="slide__media">
        <img v-if="slide.src" class="slide__image" :src="slide.src" alt="" />
        <div v-else class="slide__placeholder"></div>
        <div class="slide__controllers">
          <HdUploadImage
            name="GALLERY"
            icon="image-add"
            v-model="slide.src"
            v-tooltip="{ label: 'загрузить изображение' }"
          />
        </div>
      </div>
    </div>
    <div class="slide__body">
      <HdInput placeholder="Заголовок" v-model="slide.title" />
      <HdInput placeholder="Описание" v-model="slide.subtitle" />
      <HdInput placeholder="Ссылка" v-model="slide.to" />
    </div>
    <div class="slide__footer">
      <HdButton
        text="Отменить"
        color="danger"
        @click="$emit('onCancel', slide)"
      />

      <HdButton
        v-if="slide.id"
        text="Изменить"
        color="success"
        @click="$emit('onEdit', slide)"
      />
      <HdButton
        v-else
        text="Добавить"
        color="success"
        @click="$emit('onAdd', slide)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
