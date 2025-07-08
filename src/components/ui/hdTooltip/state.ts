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
export const to = ref()

export function showTooltip(
  $target: HTMLElement,
  title: string,
  classForModal: string
) {
  const { top, left, width, height } = $target.getBoundingClientRect()

  coords.top = top < 20 ? top + height + 15 : top - 15
  coords.left = left + width / 2

  coords.title = title || 'Не указано'
  to.value = classForModal
  isShowTooltip.value = true
}
