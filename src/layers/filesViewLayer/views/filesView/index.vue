<script setup lang="ts">
import { filesAPI } from '@/api/files-api'
import * as ContentLayout from '@contentLayout'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { correctImageUrl } from '@/shared/helpers/utils'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { useFilesystem } from './composables/useFilesystem'
import { isImage } from './utils'

const minLevel = 1

const {
  paths,
  goBack,
  isShowBackButton,
  onItem,
  getFolderTitle,
  selectedOriginalImagePath,
  selectedPreviewImagePath,
  getFiles,
  onDeleteImage,
} = useFilesystem(filesAPI)

getFiles('/images')
</script>

<template>
  <ContentLayout.Root>
    <ContentLayout.Header title="Файлы"> </ContentLayout.Header>
    <ContentLayout.Body no-padding>
      <div class="files">
        <ul class="files__list">
          <li
            class="files__item back-button"
            v-if="isShowBackButton(minLevel)"
            @dblclick="goBack"
          >
            <SvgIcon
              icon="arrow-back-ios"
              :style="{ width: '5rem', height: '5rem' }"
            />
          </li>
          <li
            v-for="pathItem in paths"
            class="files__item folder"
            @dblclick="getFiles(pathItem)"
            @click.prevent="onItem(pathItem)"
            :class="{
              'folder--inset-only': isImage(pathItem),
              'folder--selected': pathItem === selectedPreviewImagePath,
            }"
          >
            <SvgIcon
              v-if="!isImage(pathItem)"
              icon="folder"
              :style="{ width: '5rem', height: '5rem' }"
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
        <div class="files__preview" v-if="selectedPreviewImagePath">
          <img
            class="files__preview-image"
            :src="correctImageUrl(selectedOriginalImagePath)"
            alt=""
          />
          <div>
            <HdButton
              text="удалить"
              flip-icon="delete"
              color="danger"
              @click="onDeleteImage"
            />
          </div>
        </div>
      </div>
    </ContentLayout.Body>
    <ContentLayout.Footer> </ContentLayout.Footer>
  </ContentLayout.Root>
</template>

<style lang="scss" scoped src="./style.scss" />
