import { ref, type Ref } from 'vue'
type UseToggle = (state?: boolean) => [Ref<boolean>, (state?: boolean) => void]

export const useToggle: UseToggle = (state?: boolean) => {
  const isOpen = ref(state || false)
  const toggleOpenState = (state?: boolean) =>
    (isOpen.value = typeof state !== 'undefined' ? state : !isOpen.value)

  return [isOpen, toggleOpenState]
}
