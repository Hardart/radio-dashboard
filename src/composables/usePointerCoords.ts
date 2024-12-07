import {
  onBeforeMount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  watch,
  type Ref,
} from 'vue'

export const usePointerCoords = (elem?: Ref<HTMLElement | undefined>) => {
  const x = ref(0)
  const y = ref(0)

  const onPointerEvent = (event: PointerEvent) => {
    setTimeout(() => {
      x.value = event.pageX
      y.value = event.pageY
    }, 1)
  }

  function initListener() {
    window.addEventListener('pointerdown', onPointerEvent, {
      passive: true,
    })
  }

  function removeListener() {
    window.removeEventListener('pointerdown', onPointerEvent)
  }

  onUnmounted(removeListener)
  onMounted(initListener)

  return { x, y, initListener }
}
