import { useMouse } from '@vueuse/core'
import { reactive } from 'vue'

const { x, y } = useMouse()
export const coords = reactive({
  x: 0,
  y: 0,
})

export function initCoords() {
  coords.x = x.value
  coords.y = y.value
}
