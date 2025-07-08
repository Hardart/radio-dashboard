<script setup lang="ts">
import * as UI from '@ui'
import { computed } from 'vue'
import { isNumber } from 'lodash'
import type { ScheduleWithStyle } from '@schema/schedule-schema'

const emit = defineEmits(['onUpdate', 'onToggle'])

const { schedule } = defineProps<{
  schedule: ScheduleWithStyle
  isShow: boolean
}>()

const calcTopPositon = () => {
  if (!isNumber(schedule.style.height) || !isNumber(schedule.style.top))
    return 0

  if (schedule.style.top < 55) {
    return `${schedule.style.height + 5}px`
  } else {
    return `-50px`
  }
}

const style = computed(() => {
  return {
    top: calcTopPositon(),
    left: '-20px',
  }
})
</script>

<template>
  <div class="schedule-settings" :style v-if="isShow">
    <UI.Checkbox label="повтор" v-model="schedule.isReplay" />
    <UI.Button
      icon="check"
      square
      color="success"
      variant="link"
      @click="$emit('onUpdate', schedule)"
    />
  </div>
</template>

<style lang="scss">
.schedule-settings {
  position: absolute;
  display: flex;
  gap: 10px;
  padding: 2px 15px;
  min-width: auto;

  color: #fff;
  background-color: hsl(var(--foreground), 0.02);
  font-size: var(--fs-s);
  border: 1px solid var(--color-border);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(0.8px);
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
}
</style>
