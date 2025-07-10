<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdUploadImage from '@/components/ui/hdUploadImage/hdUploadImage.vue'

const src = defineModel<string>('src', { required: true })
</script>

<template>
  <HdUploadImage
    v-model="src"
    name="NEWS"
    v-tooltip="{ label: 'загрузить фото' }"
  >
    <template #upload-button="{ cb }">
      <HdButton
        square
        icon="image-add"
        class="hd-editor__button"
        v-tooltip="{ label: 'загрузить фото' }"
        @click="cb"
      />
    </template>
  </HdUploadImage>
</template>
