<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch, type MaybeRef } from 'vue'
import { useElementBounding, useMouse, watchThrottled } from '@vueuse/core'
type Point = { x: number; y: number; width: number; height: number }
const sortableItems = defineModel<any[]>({ required: true })

defineProps<{
  handler?: boolean
}>()
const $container: MaybeRef = ref(null)
const $sortableElements = ref<(HTMLElement | null)[]>([])
const initBounds = ref<Point[]>([])
const itemsBounds = ref<Point[]>([])
const containerBounds = useElementBounding($container)
const point = { x: 0, y: 0 }

const { x, y } = useMouse()

const clone = reactive({
  id: -1,
  data: sortableItems.value[0],
  x: 0,
  y: 0,
  width: 0,
  height: 0,
})

const selectedId = ref(-1)
const isDragStart = ref(false)
const isSetStyles = ref(false)

const registerElement = (el: unknown, idx: number) => {
  if (el) {
    $sortableElements.value[idx] = el as HTMLElement
  } else {
    $sortableElements.value.splice(idx, 1)
  }
}

const onPointerDown = (id: number) => {
  if (isDragStart.value) return

  selectedId.value = id
  console.log(id)

  clone.id = id
  isDragStart.value = true
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointermove', onPointerMove)
  point.x = x.value
  point.y = y.value
}

const onPointerMove = () => {
  if (!isDragStart.value) return

  setCloneOffset()
}

const onPointerEnter = (id: number) => {
  if (!isDragStart.value || selectedId.value === id) return
  isSetStyles.value = true
  const [toSwap] = sortableItems.value.splice(selectedId.value, 1)
  sortableItems.value.splice(id, 0, toSwap)

  const [swapBoundsId] = $sortableElements.value.splice(selectedId.value, 1)
  $sortableElements.value.splice(id, 0, swapBoundsId)

  selectedId.value = id
}

const onPointerUp = () => {
  if (!isDragStart.value) return

  if (isCloneNotMoving.value) {
    clone.id = -1
    selectedId.value = -1
  } else {
    const { x, y } = initBounds.value[selectedId.value]
    clone.x = x + containerBounds.left.value
    clone.y = y + +containerBounds.top.value
  }

  isDragStart.value = false
  isSetStyles.value = false
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('pointermove', onPointerMove)
}

const onTransitionEnd = () => {}

const onCloneTransitionEnd = () => {
  clone.id = -1
  selectedId.value = -1
}

const isCloneId = computed(() => clone.id >= 0)
const isCloneVisible = computed(() => clone.width !== 0)

const cloneStyle = computed(() =>
  isCloneVisible.value ? `left:${clone.x}px;top:${clone.y}px` : undefined
)

const containerStyle = computed(() =>
  isSetStyles.value
    ? `width:${containerBounds.width.value}px;height:${containerBounds.height.value}px`
    : undefined
)

const isCloneNotMoving = computed(
  () =>
    isCloneId.value &&
    clone.x - containerBounds.left.value === itemsBounds.value[clone.id].x
)

onMounted(setElementsBounds)

function setElementsBounds() {
  if (!$sortableElements.value || !$sortableElements.value.length) return
  initBounds.value = $sortableElements.value.map((element) => {
    const { left, top, width, height } = (
      element as HTMLElement
    ).getBoundingClientRect()
    const x = left - containerBounds.x.value
    const y = top - containerBounds.y.value
    return { x, y, width, height }
  })
  itemsBounds.value = [...initBounds.value]
}

function isSelected(id: number) {
  return selectedId.value === id
}

function setPosition(id: number) {
  return `left:${itemsBounds.value[id].x}px;top:${itemsBounds.value[id].y}px`
}

function setCloneOffset() {
  clone.x += x.value - point.x
  clone.y += y.value - point.y
  point.x = x.value
  point.y = y.value
}

watch(
  () => clone.id,
  () => {
    if (isCloneId.value) {
      clone.data = sortableItems.value[clone.id]
      const { height, width, x, y } = initBounds.value[clone.id]
      clone.x = x + containerBounds.left.value
      clone.y = y + containerBounds.top.value
      clone.height = height
      clone.width = width
    } else {
      clone.width = 0
      clone.height = 0
      clone.x = 0
      clone.y = 0
    }
  }
)

watch(
  () => $sortableElements.value.length,
  () => {
    setElementsBounds()
  }
)
</script>

<template>
  <div
    ref="$container"
    class="sortable"
    :class="isSetStyles && 'sortable--absolute'"
    :style="containerStyle"
  >
    <div
      :ref="(el) => registerElement(el, idx)"
      @pointerdown.passive="!handler && onPointerDown(idx)"
      @pointerenter.passive="onPointerEnter(idx)"
      @pointerup.passive="onPointerUp"
      @transitionend.passive="onTransitionEnd"
      class="sortable__item"
      :class="[
        isSetStyles && 'sortable__item--absolute',
        isSelected(idx) && 'sortable__item--selected',
      ]"
      :style="isSetStyles && setPosition(idx)"
      v-for="(item, idx) in sortableItems"
      :key="item.id"
    >
      <slot name="item" :item :onPointerDown :id="idx" />
    </div>
    <Teleport to="body">
      <div
        v-if="isCloneVisible"
        class="sortable__item sortable__item--clone"
        :class="!isDragStart && 'sortable__item--animate'"
        :style="cloneStyle"
        @transitionend.passive="onCloneTransitionEnd"
      >
        <slot name="clone" :data="clone.data">
          <div>
            <h3>{{ clone.data?.label }}</h3>
          </div>
        </slot>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped src="./RefSortable.scss" />
