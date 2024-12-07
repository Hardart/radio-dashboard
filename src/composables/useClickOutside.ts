import { onMounted, onUnmounted, onUpdated, watch, type Ref } from 'vue'
type ClickOutside = (
  element: Ref<HTMLElement | undefined>,
  fn: () => void
) => void

export const useClickOutside: ClickOutside = (
  element: Ref<HTMLElement | undefined>,
  fn
) => {
  const onClick = (event: Event) => {
    if (!element.value) return
    const target = event.target as HTMLElement
    if (element.value.contains(target)) return
    fn()
    removeListener()
  }

  function initListener() {
    document.body.addEventListener('click', onClick)
  }

  function removeListener() {
    document.body.removeEventListener('click', onClick)
  }

  onUnmounted(removeListener)
  // onMounted(initListener)
  onUpdated(initListener)

  // watch(
  //   element,
  //   () => {
  //     queueMicrotask(() =>
  //       element.value!.addEventListener('click', initListener)
  //     )
  //   },
  //   { once: true }
  // )
}
