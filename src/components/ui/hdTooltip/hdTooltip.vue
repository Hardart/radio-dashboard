<script setup lang="ts">
import { computed, ref } from 'vue'
import { isShowTooltip, coords, to } from './state'

const $this = ref<HTMLElement>()

const style = computed(() => {
  if (!$this.value) return { left: 0, top: 0 }
  const { width, height } = $this.value.getBoundingClientRect()
  const rightBorder = coords.left + width / 2

  const screenWidth = document.body.clientWidth
  const rightScreenBorder = screenWidth - width - 2
  const centerLeftPosition = coords.left - width / 2
  const top = `${coords.top - height / 2}px`
  let left: string | number =
    rightBorder > screenWidth ? rightScreenBorder : centerLeftPosition

  left = left < 0 ? 0 : `${left}px`
  return { left, top }
})
</script>

<template>
  <Transition>
    <Teleport defer :to v-if="isShowTooltip">
      <div ref="$this" class="tooltip" :style>
        {{ coords.title }}
      </div>
    </Teleport>
  </Transition>
</template>

<style lang="scss" scoped src="./hdTooltip.scss" />
