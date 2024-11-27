<script lang="ts" setup>
defineProps<{
  isOpen: boolean
}>()
</script>

<template>
  <Teleport to=".dashboard" defer>
    <Transition>
      <div class="modal" v-if="isOpen">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped src="./HdModal.scss" />
