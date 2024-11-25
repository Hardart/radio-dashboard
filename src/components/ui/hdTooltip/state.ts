import { reactive, ref } from 'vue'

export type Coords = {
  top: number
  left: number
  title: string
  width: number
}

export const coords = reactive<Coords>({
  top: 0,
  left: 0,
  width: 0,
  title: '',
})

export const isShowTooltip = ref(false)

export function showTooltip($target: HTMLElement, title: string | null) {
  const { top, left, width } = $target.getBoundingClientRect()
  coords.top = top - 15
  coords.left = left + width / 2
  coords.title = title || 'Tooltip'
  isShowTooltip.value = true
}
