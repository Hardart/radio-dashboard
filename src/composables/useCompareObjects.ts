import { computed, reactive, ref, type Ref } from 'vue'

export const useCompareObjects = () => {
  const initObj = reactive<Record<string, any>[]>([])
  const compareObj = ref<Record<string, any>[]>([])
  const setupObj = (input: Ref<Record<string, any>[]>) => {
    if (Object.keys(initObj).length) return
    compareObj.value = input.value

    compareObj.value.forEach((inputItem) => {
      initObj.push(inputItem)
    })
  }

  const isSame = computed(() => {
    return compareObj.value.every((inputItem, index) => {
      return JSON.stringify(inputItem) === JSON.stringify(initObj[index])
    })
  })

  return { isSame, setupObj, initObj }
}
