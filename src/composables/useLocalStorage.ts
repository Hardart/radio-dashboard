import { ref, toRef, toValue, watch, type MaybeRefOrGetter } from 'vue'

export const useLocalStorage = (
  key: string,
  initialValue?: MaybeRefOrGetter<boolean | null>
) => {
  const v = localStorage.getItem(key)
  const storageData = ref()

  if (v && v !== 'undefined') storageData.value = JSON.parse(v)
  if (initialValue) {
    storageData.value = initialValue
  }

  watch(
    storageData,
    () => {
      if (typeof storageData.value !== 'undefined')
        localStorage.setItem(key, JSON.stringify(toValue(storageData)))
      if (storageData.value === null) localStorage.removeItem(key)
    },
    { immediate: true }
  )
  return storageData
}
