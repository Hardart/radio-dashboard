import { useElementBounding, type UseElementBoundingReturn } from '@vueuse/core'
import {
  computed,
  nextTick,
  reactive,
  shallowRef,
  toValue,
  type CSSProperties,
} from 'vue'
import type { ExtendedSlide } from '@schema/slide-schema'
import { EventsPool } from '../../shared/helpers/EventsPool'

type Point = { x: number; y: number }

class Draggable {
  startPoint = reactive<Point>({ x: 0, y: 0 })
  point = reactive<Point>({ x: 0, y: 0 })
  isDragStart = false
  isAnimationInAction = false
  isTransitionInAction = false

  updatePointToEvent(evt: PointerEvent) {
    this.point.x = evt.clientX
    this.point.y = evt.clientY
  }

  equalizeStartPointToPoint() {
    this.startPoint.x = this.point.x
    this.startPoint.y = this.point.y
  }

  get startPointsAndPointOffset() {
    return {
      xOffset: this.startPoint.x - this.point.x,
      yOffset: this.startPoint.y - this.point.y,
    }
  }
}

class RootElement {
  element: HTMLElement | undefined
  bounds?: UseElementBoundingReturn
  position = reactive({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  initElement(element: HTMLElement | undefined) {
    this.element = element
    this.bounds = useElementBounding(element)
  }

  get isElementInit() {
    return !!this.element
  }
}

class SlideElement {
  slide?: ExtendedSlide
  draggable = new Draggable()
  events = new EventsPool()
  bounds?: UseElementBoundingReturn
  position = reactive({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  isSelected(id: string) {
    return this.slide?.id === id
  }

  initElement(slide: ExtendedSlide, bounds?: UseElementBoundingReturn) {
    this.slide = slide
    this.bounds = bounds
  }

  updatePoints(evt: PointerEvent) {
    this.draggable.updatePointToEvent(evt)
    this.draggable.equalizeStartPointToPoint()
  }

  setStyleFromBounds() {
    if (!this.bounds?.width || !this.bounds.height) return
    this.position.width = toValue(this.bounds.width)
    this.position.height = toValue(this.bounds.height)
    this.position.top = toValue(this.bounds.top)
    this.position.left = toValue(this.bounds.left)
  }

  updateStyleOnMove(evt: Event) {
    this.draggable.updatePointToEvent(evt as PointerEvent)
    const { xOffset, yOffset } = this.draggable.startPointsAndPointOffset
    if (xOffset || yOffset) this.draggable.isTransitionInAction = true

    this.position.left -= xOffset
    this.position.top -= yOffset
    this.draggable.equalizeStartPointToPoint()
  }

  style = computed<CSSProperties>(() => {
    const transitionStyle = {
      transitionProperty: 'top, left',
      transitionDuration: '150ms',
      transitionTimingFunction: 'ease-in-out',
    }
    const baseStyle = {
      left: `${this.position.left}px`,
      top: `${this.position.top}px`,
      width: `${this.position.width}px`,
      height: `${this.position.height}px`,
    }

    return this.draggable.isDragStart
      ? baseStyle
      : Object.assign(baseStyle, transitionStyle)
  })

  get isCloneInit() {
    return !!this.slide
  }
}

class PointerEvents {
  sortable: Sortable

  constructor(sortable: Sortable) {
    this.sortable = sortable
  }

  onPointerDown(evt: Event, idx: number) {
    if (this.sortable.clone.draggable.isAnimationInAction) return
    this.sortable.clone.updatePoints(evt as PointerEvent)
    this.sortable.initClone(idx)

    const onUp = this._onPointerUp.bind(this)
    const onMove = this._onPointerMove.bind(this)
    this.sortable.clone.events.add(window, 'pointerup', onUp)
    this.sortable.clone.events.add(window, 'pointermove', onMove, {
      passive: true,
    })

    this.sortable.clone.draggable.isDragStart = true
  }

  onPointerEnter(slide: ExtendedSlide, idx: number) {
    if (!this.sortable.clone.draggable.isDragStart) return
    if (!this.sortable.clone.isCloneInit) return
    this.animation(slide, idx)
  }

  async animation(slide: ExtendedSlide, idx: number) {
    const slideId = this.sortable.clone.slide!.id
    if (slide.id === slideId) return
    const selectedSlideIdx = this.sortable.findSlideIndex(slideId)
    this.sortable.setWidthAndHeight()
    this._setStyle()
    this.sortable.clone.draggable.isAnimationInAction = false
    const [removable] = this.sortable.slides.splice(selectedSlideIdx, 1)
    this.sortable.slides.splice(idx, 0, removable)
    await nextTick()
    this._setStyle(true)
  }

  private _setStyle(isTransition: boolean = false) {
    this.sortable.slides.forEach((slide, slideIndex) => {
      const { top, left, height, width } = this.sortable.bounds![slideIndex]
      slide.style.position = 'absolute'
      slide.style.top = `${top}px`
      slide.style.left = `${left}px`
      slide.style.width = `${width}px`
      slide.style.height = `${height}px`
      if (!isTransition) return
      slide.style.transitionProperty = 'top, left'
      slide.style.transitionDuration = '200ms'
      slide.style.transitionTimingFunction = 'ease'
      slide.style.pointerEvents = 'none'
      this.sortable.clone.draggable.isAnimationInAction = true
    })
  }

  private _removeStyle() {
    this.sortable.slides.forEach((slide) => {
      slide.style = {}
    })
  }

  onSLideTransitionEnd() {
    this.sortable.clone.draggable.isAnimationInAction = false
    this.sortable.resetStyleHeight()
    this._removeStyle()
  }

  onCloneTransitionEnd() {
    this.sortable.clone.draggable.isTransitionInAction = false
    this.sortable.deleteClone()
  }

  private _onPointerMove(evt: Event) {
    if (!this.sortable.clone.draggable.isDragStart) return
    this.sortable.clone.updateStyleOnMove(evt)
  }

  private _onPointerUp() {
    const slide = this.sortable.clone.slide
    const idx = this.sortable.findSlideIndex(slide!.id)
    const { left, top } = this.sortable.bounds![idx]
    this.sortable.clone.position.left = toValue(left)
    this.sortable.clone.position.top = toValue(top)
    this.sortable.clone.draggable.isDragStart = false
    this.sortable.clone.draggable.isAnimationInAction = false
    if (!this.sortable.clone.draggable.isTransitionInAction)
      this.sortable.deleteClone()
    this.sortable.clone.events.clearPool()
  }
}

export class Sortable {
  _root = new RootElement()
  clone = new SlideElement()
  events = new PointerEvents(this)
  slides: ExtendedSlide[] = []
  bounds?: UseElementBoundingReturn[]
  position = reactive({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  init(element: HTMLElement | undefined, slides: ExtendedSlide[]) {
    this._root.initElement(element)
    this.slides = slides
    this.initBounds()
  }

  initBounds() {
    if (!this._root.element) return
    const children = Array.from(this._root.element.children) as HTMLElement[]

    this.bounds = children.map((child) => {
      const childBounds = useElementBounding(child)
      return {
        ...childBounds,
        left: shallowRef(
          toValue(childBounds.left) - toValue(this._root.bounds!.left)
        ),
        top: shallowRef(
          toValue(childBounds.top) - toValue(this._root.bounds!.top)
        ),
      }
    })
  }

  isRootInit() {
    return typeof this._root.element !== 'undefined'
  }

  initClone(idx: number) {
    const child = this.slides[idx]
    const bounds = this.bounds![idx]
    this.clone.initElement(child, bounds)
    this.clone.setStyleFromBounds()
  }

  setWidthAndHeight() {
    const { width, height } = this._root.bounds!

    this.position.width = toValue(width)
    this.position.height = toValue(height)
  }

  resetStyleHeight() {
    this.position.height = 0
  }

  deleteClone() {
    this.clone.slide = undefined
  }

  findSlideIndex(id: string) {
    const slideIdx = this.slides.findIndex((slide) => slide.id === id)
    if (slideIdx === -1) throw new Error('can_t find slide by id')
    return slideIdx
  }

  get style(): CSSProperties {
    if (this.position.height)
      return {
        position: 'absolute',
        width: `${this.position.width}px`,
        height: `${this.position.height}px`,
      }
    else return {}
  }
}
