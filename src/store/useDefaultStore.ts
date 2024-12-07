import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDefaultStore = defineStore('default', () => {
  const isMenuOpen = ref(true)

  const toggleMenuOpenState = () => (isMenuOpen.value = !isMenuOpen.value)

  return { isMenuOpen, toggleMenuOpenState }
})
