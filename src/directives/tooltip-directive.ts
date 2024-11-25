import { isShowTooltip, showTooltip } from '@/components/ui/hdTooltip/state'
import { type DirectiveBinding } from 'vue'

export default {
  name: 'tooltip',
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const title = binding.value?.label || null

    el.onmouseenter = (event: Event) => {
      showTooltip(event.target as HTMLElement, title)
    }
    el.onmouseleave = () => (isShowTooltip.value = false)
    el.onmousedown = () => (isShowTooltip.value = false)
  },
  unmounted(el: HTMLElement) {
    el.onmouseenter = null
    el.onmouseleave = null
    el.onmousedown = null
  },
}
