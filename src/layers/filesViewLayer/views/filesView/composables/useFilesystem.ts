import { computed, reactive, ref, type Ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { isImage } from '../utils'
import { isArray } from 'lodash'

const _useFilesystem = () => {
  const paths = ref<string[]>()
  const folderDepth = ref(0)
  const selectedPreviewImagePath = ref('')
  const folderHistory = reactive<Record<number, string[]>>({})

  const selectedOriginalImagePath = computed(() =>
    selectedPreviewImagePath.value.replace('_preview', '_orig')
  )

  function onItem(path: string) {
    if (isImage(path)) selectedPreviewImagePath.value = path
  }

  function goBack() {
    delete folderHistory[folderDepth.value]
    decreaseDepth()
    paths.value = folderHistory[folderDepth.value]
    resetSelectedPreviewImagePath()
  }

  function setHistoryByDepth(paths: Ref<string[] | undefined>) {
    if (!isArray(paths.value)) return
    increaseDepth()
    folderHistory[folderDepth.value] = paths.value
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
    return path.replace(/.*\//, '')
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
  }
}

export const useFilesystem = createSharedComposable(_useFilesystem)
