import { type DirectiveBinding } from 'vue'
import { isShowTooltip, showTooltip } from '@/components/ui/hdTooltip/state'

export default {
  name: 'tooltip',
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const title = binding.value?.label
    if (!title) return
    const to = binding.value?.to || '#app'

    el.onmouseenter = (event: Event) => {
      showTooltip(event.target as HTMLElement, title, to)
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
