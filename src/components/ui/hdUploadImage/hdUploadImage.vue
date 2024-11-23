<script lang="ts" setup>
import { ref } from 'vue'
import { filesAPI } from '@/api/upload-api'
import HdButton from '../hdButton/hdButton.vue'
import type { Icon } from '@/shared/types/Icon'

const src = defineModel<string>()
const { name } = defineProps<{ name: string; icon?: Icon }>()
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

  const { path } = await filesAPI.single(body)
  src.value = path // MAYBE UNDEFINED
}
</script>

<template>
  <div class="hd-upload-image">
    <slot name="upload-button" :cb="onInputVirtualClick">
      <HdButton
        :icon="icon ?? 'gallery'"
        class="hd-upload-image__button"
        @click="onInputVirtualClick()"
      />
    </slot>

    <input
      type="file"
      accept=".jpg, .jpeg, .png, .webp, .avif"
      class="hd-upload-image__input"
      ref="uploadInputRef"
      @change="onChange"
    />
  </div>
</template>

<style lang="scss" src="./hdUploadImage.scss" />
