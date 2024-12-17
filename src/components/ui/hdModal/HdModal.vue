<script lang="ts" setup>
import HdButton from '../hdButton/hdButton.vue'

const isOpen = defineModel({ required: true })
</script>

<template>
  <Teleport to=".dashboard" defer>
    <Transition>
      <div class="modal" v-if="isOpen" tabindex="-1">
        <HdButton
          class="modal__close"
          icon="close"
          color="danger"
          variant="solid"
          square
          @click="isOpen = !isOpen"
        />
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped src="./HdModal.scss" />
