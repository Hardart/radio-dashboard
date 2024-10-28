<script lang="ts" setup>
import { ref } from 'vue'
import HdButton from '../hdButton/hdButton.vue'
import { filesAPI } from '@/api/upload-api'
const src = defineModel<string>()
const { name } = defineProps<{ name: string }>()
const uploadInputRef = ref<HTMLInputElement>()

function onInputVirtualClick() {
  if (uploadInputRef.value) uploadInputRef.value.click()
}

async function onChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  const file = input.files[0]
  const body = new FormData()

  body.append(name, file, file.name)

  const data = await filesAPI.single(
    'http://localhost:3068/api/v1/dashboard/image-news',
    body
  )
  src.value = data.path

  //   emit('append-handler', src.value)
}
</script>

<template>
  <div class="hd-upload-image">
    <HdButton
      icon="gallery"
      class="hd-upload-image__button"
      @click="onInputVirtualClick()"
    />
    <input
      type="file"
      accept=".jpg, .jpeg, .png, .webp, .avif"
      class="hd-upload-image__input"
      ref="uploadInputRef"
      @change="onChange"
    />
  </div>
</template>

<style lang="scss" scoped src="./hdUploadImage.scss" />
