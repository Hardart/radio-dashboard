<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { type Notification, useNotifications } from '../useNotifications'
const { removeContainer, remove } = useNotifications()
const {
  duration = 5000,
  autoClose = true,
  id,
  onHover = true,
} = defineProps<Notification>()

const progress = ref(0)
const rafId = ref(0)
let dismissTime = 0
let currentTime = 0

function calcProgress() {
  progress.value = (dismissTime / duration) * 100
}

function updateDismissTime(time: number) {
  dismissTime += time - currentTime
}

function updateCurrentTime(time: number) {
  currentTime = time
}

function timerProgress(time: number) {
  if (!currentTime) updateCurrentTime(time)
  updateDismissTime(time)
  updateCurrentTime(time)
  startAnimation()
  calcProgress()

  if (progress.value >= 100) onComplete()
}

function startAnimation() {
  rafId.value = requestAnimationFrame(timerProgress)
}

function stopAnimation() {
  if (onHover) cancelAnimationFrame(rafId.value)
}

function onComplete() {
  stopAnimation()
  remove(id)
}

function onEnter() {
  stopAnimation()
}

function onLeave() {
  if (!autoClose) return
  startAnimation()
  currentTime = 0
}

if (autoClose) onMounted(startAnimation)
</script>

<template>
  <li
    class="hd-notifications__item hd-notification"
    :class="[status && `hd-notification--${status}`]"
    :key="id"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @transitionend="removeContainer"
  >
    <div class="hd-notification__body">
      <span v-if="icon" class="hd-notification__icon">
        <SvgIcon :icon />
      </span>
      <span class="hd-notification__text">{{ text }}</span>
      <span
        v-if="autoClose"
        class="hd-notification__lifetime"
        :style="{ right: `${progress}%` }"
      >
      </span>
    </div>
  </li>
</template>

<style lang="scss" scoped src="./styles.scss" />
