import { onMounted, onUnmounted, ref, watch, watchEffect, type Ref } from 'vue'
type ClickOutside = (
  element: Ref<HTMLElement | undefined>,
  fn: () => void
) => void

export const useClickOutside: ClickOutside = (
  element: Ref<HTMLElement | undefined>,
  fn
) => {
  let init = false

  const onClick = (event: Event) => {
    if (!element.value) return
    const target = event.target as HTMLElement
    if (element.value.contains(target)) return
    removeListener()
    fn()
  }

  function initListener() {
    document.body.addEventListener('click', onClick)
  }

  function removeListener() {
    document.body.removeEventListener('click', onClick)
    init = false
  }

  onUnmounted(removeListener)

  watch(
    element,
    () => {
      queueMicrotask(() =>
        element.value!.addEventListener('click', initListener)
      )
    },
    { once: true }
  )
}
