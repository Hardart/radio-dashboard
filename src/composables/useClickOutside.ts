import { onMounted, onUnmounted, ref, watchEffect, type Ref } from 'vue'
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
    if (!init) document.body.addEventListener('click', onClick)
    init = true
  }

  function removeListener() {
    document.body.removeEventListener('click', onClick)
    init = false
  }

  onMounted(() => {
    if (!element.value) return
    element.value.addEventListener('click', initListener)
  })
  onUnmounted(removeListener)
}
