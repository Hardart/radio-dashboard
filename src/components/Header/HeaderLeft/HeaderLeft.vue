<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import UserMenu from '../UserMenu/UserMenu.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { ref } from 'vue'
import { useToggle } from '@/composables/useToggle'

const useColorTheme = () => {
  const isDark = ref(false)
  const isSystem = ref(true)
  const changeColorTo = (theme: 'dark' | 'light') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      isDark.value = true
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      isDark.value = false
    }
  }

  const swapTheme = () =>
    !isDark.value ? changeColorTo('dark') : changeColorTo('light')

  return { swapTheme, isDark }
}

const { swapTheme, isDark } = useColorTheme()
</script>

<template>
  <div class="header-left">
    <div>
      <HdButton icon="settings" square @click="swapTheme" />
    </div>
    <div class="notifications">
      <SvgIcon icon="bell" class="notifications__icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped src="./HeaderLeft.scss" />
