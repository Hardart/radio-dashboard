<script setup lang="ts">
import { computed, ref } from 'vue'
import { isShowTooltip, coords } from './state'

const $this = ref<HTMLElement>()

const left = computed(() =>
  $this.value ? coords.left - $this.value.getBoundingClientRect().width / 2 : 0
)
const top = computed(() =>
  $this.value ? coords.top - $this.value.getBoundingClientRect().height / 2 : 0
)
</script>

<template>
  <Transition>
    <Teleport defer to=".dashboard">
      <div
        v-if="isShowTooltip"
        ref="$this"
        class="tooltip"
        :style="`top: ${top}px; left: ${left}px`"
      >
        {{ coords.title }}
      </div>
    </Teleport>
  </Transition>
</template>

<style lang="scss" scoped src="./hdTooltip.scss" />
