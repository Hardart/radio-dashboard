import type { API } from '@/api/files-api'
import { isArray } from 'lodash'
import { computed, reactive, ref, type Ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { isImage } from '../utils'
import { correctImageUrl } from '@/shared/helpers/utils'

const _useFilesystem = (filesAPI: API.Files) => {
  const paths = ref<string[]>()
  const folderDepth = ref(0)
  const selectedPreviewImagePath = ref('')
  const folderHistory = reactive<
    Record<number, { paths: string[]; folder: string }>
  >({})

  const selectedOriginalImagePath = computed(() =>
    selectedPreviewImagePath.value.replace('_preview', '_orig')
  )

  const currentFolder = computed(
    () => folderHistory[folderDepth.value]?.folder ?? ''
  )

  function onItem(path: string) {
    selectedPreviewImagePath.value = path
    if (isImage(path)) {
      return correctImageUrl(selectedOriginalImagePath.value) ?? ''
    } else {
      return selectedPreviewImagePath.value
    }
  }

  function goBack() {
    delete folderHistory[folderDepth.value]
    decreaseDepth()
    paths.value = folderHistory[folderDepth.value].paths
    resetSelectedPreviewImagePath()
  }

  function setHistoryByDepth(paths: Ref<string[] | undefined>, path: string) {
    if (!isArray(paths.value)) return
    increaseDepth()

    folderHistory[folderDepth.value] = { paths: paths.value, folder: path }
  }

  function resetSelectedPreviewImagePath() {
    selectedPreviewImagePath.value = ''
  }

  function increaseDepth() {
    folderDepth.value++
  }

  function decreaseDepth() {
    folderDepth.value--
  }

  function isShowBackButton(minDepth: number = 1) {
    return folderDepth.value > minDepth
  }

  function getFolderTitle(path: string) {
    const folder = path.replace(/.*\//, '')
    return folder
  }

  async function getFiles(path: string = '') {
    if (isImage(path)) return
    paths.value = await filesAPI.list(path)
    setHistoryByDepth(paths, path)
  }

  async function onDeleteImage() {
    const path = selectedPreviewImagePath.value
    const url = isImage(path) ? 'DELETE_IMAGE' : 'DELETE_FOLDER'
    const res = await filesAPI.deleteSingle(url, { path })
    if (!res) return console.warn('no res on delete item')

    paths.value = paths.value?.filter(
      (item) => item !== selectedPreviewImagePath.value
    )
    resetSelectedPreviewImagePath()
  }

  return {
    paths,
    folderDepth,
    selectedPreviewImagePath,
    folderHistory,
    selectedOriginalImagePath,

    onItem,
    goBack,
    setHistoryByDepth,
    getFolderTitle,
    isShowBackButton,
    resetSelectedPreviewImagePath,
    getFiles,
    onDeleteImage,
    currentFolder,
  }
}

export const useFilesystem = createSharedComposable(_useFilesystem)
