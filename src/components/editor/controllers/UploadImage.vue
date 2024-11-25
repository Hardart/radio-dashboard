<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdUploadImage from '@/components/ui/hdUploadImage/hdUploadImage.vue'

const src = defineModel<string>({ required: true })
</script>

<template>
  <HdUploadImage
    v-model="src"
    name="news"
    btnClass="hd-editor__button"
    v-tooltip="{ label: 'загрузить фото' }"
  >
    <template #upload-button="{ cb }">
      <HdButton
        text="I"
        class="hd-editor__button"
        v-tooltip="{ label: 'загрузить фото' }"
        @click="cb"
      />
    </template>
  </HdUploadImage>
</template>
