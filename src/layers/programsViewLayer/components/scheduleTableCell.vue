<script setup lang="ts">
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import { computed } from 'vue'

const { cellHeight } = defineProps<{
  dayIndex: number
  cellHeight: number
  isDragStart: boolean
}>()
const style = computed(() => ({ height: `${cellHeight}px` }))

defineEmits(['onCreateProgram'])
</script>

<template>
  <div class="cell" :style :data-id="`${dayIndex}`">
    <HdButton
      v-if="!isDragStart"
      icon="add"
      variant="link"
      class="cell__button"
      @click="$emit('onCreateProgram', dayIndex)"
    />
  </div>
</template>

<style scoped lang="scss">
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-left: 1px solid var(--color-border);
  border-top: 1px solid var(--color-border);

  &__button {
    display: none;
  }

  &:hover &__button {
    display: block;
  }
}
</style>
