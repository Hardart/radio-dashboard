<script lang="ts" setup>
import type { Icon } from '@type/Icon'
import { filesAPI } from '@/api/files-api'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { correctImageUrl } from '@/shared/helpers/utils'
import { ImagesFolder } from '@/shared/enums/images-folder'
import { isImage } from '@/layers/filesViewLayer/views/filesView/utils'
import { useFilesystem } from '@/layers/filesViewLayer/views/filesView/composables/useFilesystem'
import { useToggle } from '@vueuse/core'
import HdButton from '../hdButton/hdButton.vue'

const {
  paths,
  selectedPreviewImagePath,
  onItem,
  goBack,
  getFiles,
  getFolderTitle,
  isShowBackButton,
} = useFilesystem(filesAPI)

const src = defineModel<string | undefined>({ required: true })
const [isOpen, change] = useToggle()

const { name, minLevel = 2 } = defineProps<{
  name: keyof typeof ImagesFolder
  icon?: Icon
  minLevel?: number
  tooltipLabel?: string
}>()
const path = `/images/${ImagesFolder[name]}`
getFiles(path)

function setSrc(path: string) {
  if (!isImage(path)) return

  src.value = onItem(path)
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="hd-select-image">
    <div class="hd-select-image__button">
      <slot :toggle="change">
        <HdButton
          :icon="icon ?? 'image-search'"
          class="hd-upload-image__button"
          square
          @click="change()"
          v-tooltip="{ label: tooltipLabel }"
        />
      </slot>
    </div>
    <div class="hd-select-image__body" v-if="isOpen">
      <ul class="files-list">
        <li
          class="files-list__item back-button"
          v-if="isShowBackButton(minLevel)"
          @dblclick="goBack"
        >
          <SvgIcon icon="arrow-back-ios" class="folder__icon" />
        </li>
        <li
          v-for="pathItem in paths"
          class="files-list__item folder"
          @dblclick="getFiles(pathItem)"
          @click.prevent="setSrc(pathItem)"
          :class="{
            'folder--inset-only': isImage(pathItem),
            'folder--selected': pathItem === selectedPreviewImagePath,
          }"
        >
          <SvgIcon
            v-if="!isImage(pathItem)"
            icon="folder"
            class="folder__icon"
          />
          <p class="folder__folder-title" v-if="!isImage(pathItem)">
            {{ getFolderTitle(pathItem) }}
          </p>
          <img
            @pointerdown.prevent
            v-if="isImage(pathItem)"
            class="folder__image"
            :src="correctImageUrl(pathItem)"
            alt=""
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" src="./hdSelectImage.scss" />
