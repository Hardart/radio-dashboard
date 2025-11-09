<script lang="ts" setup>
import { ref } from 'vue'
import { filesAPI } from '@/api/upload-api'
import type { Icon } from '@type/Icon'
import { UploadPath } from '@/shared/enums/upload-path-url'
import HdButton from '../hdButton/hdButton.vue'
import { correctImageUrl } from '@/shared/helpers/utils'

const src = defineModel<string>()
const props = defineProps<{
  name: keyof typeof UploadPath
  icon?: Icon
}>()
const uploadInputRef = ref<HTMLInputElement>()

function onInputVirtualClick() {
  if (uploadInputRef.value) uploadInputRef.value.click()
}

async function onChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  const file = input.files[0]
  const body = new FormData()
  const correctName = props.name
  body.append(correctName.trim().toLowerCase(), file, file.name)

  const { path } = await filesAPI.single(props.name, body)
  if (typeof path === 'undefined') throw new Error('image path is undefined')
  console.log(path)
  src.value = correctImageUrl(path) // MAYBE UNDEFINED
}
</script>

<template>
  <div class="hd-upload-image">
    <slot name="upload-button" :cb="onInputVirtualClick">
      <HdButton
        :icon="icon ?? 'image-add'"
        class="hd-upload-image__button"
        square
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
