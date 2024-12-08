import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDefaultStore = defineStore('default', () => {
  const isMenuOpen = ref(false)

  const toggleMenuOpenState = () => (isMenuOpen.value = !isMenuOpen.value)

  return { isMenuOpen, toggleMenuOpenState }
})
