<script setup lang="ts">
import * as UI from '@ui'
import * as ContentLayout from '@contentLayout'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { filesAPI } from '@/api/files-api'
import { computed, reactive, ref } from 'vue'
import { isArray } from 'lodash'
import { correctImageUrl } from '@/shared/helpers/utils'
import { isImage } from './utils'
import { useFilesystem } from './composables/useFilesystem'
import HdButton from '@/components/ui/hdButton/hdButton.vue'

const minLevel = 1

const {
  paths,
  setHistoryByDepth,
  goBack,
  isShowBackButton,
  onItem,
  getFolderTitle,
  selectedOriginalImagePath,
  selectedPreviewImagePath,
  resetSelectedPreviewImagePath,
} = useFilesystem()

async function getFiles(path: string = '') {
  if (isImage(path)) return

  paths.value = await filesAPI.list(path)
  setHistoryByDepth(paths)
}

getFiles()

const onDeleteImage = async () => {
  const res = await filesAPI.deleteSingle('DELETE_IMAGE', {
    path: selectedPreviewImagePath.value,
  })
  if (!res) return console.warn('no res on delete image')

  paths.value = paths.value?.filter(
    (item) => item !== selectedPreviewImagePath.value
  )
  resetSelectedPreviewImagePath()
}
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
