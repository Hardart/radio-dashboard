import { useMouse, useToggle } from '@vueuse/core'
import { reactive } from 'vue'

const { x, y } = useMouse()
const [isOpenContext, toggleContext] = useToggle()

export const coords = reactive({
  x: 0,
  y: 0,
})

export function initCoords() {
  coords.x = x.value
  coords.y = y.value
}

export const contextClosure = (model: unknown) => {
  return function (item: unknown) {
    initCoords()
    toggleContext(true)
    model = item
  }
}
