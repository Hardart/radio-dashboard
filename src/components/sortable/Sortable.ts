import { ref, toValue, type Ref } from 'vue'

type PoolItemElement = HTMLElement | (Window & typeof globalThis)

type PoolItem = {
  event: keyof HTMLElementEventMap
  element: PoolItemElement
  fn: EventListener
}

type Point = { x: number; y: number }

type SortableOptions = {
  handle?: string
  selector: string
}

const DEFAULT_OPTIONS: SortableOptions = {
  selector: '[sortable-item]',
}

class EventsPool {
  #pool: PoolItem[] = []

  add(
    element: PoolItemElement,
    event: keyof HTMLElementEventMap,
    fn: EventListener,
    options?: AddEventListenerOptions
  ) {
    this.#toggleEventInPool(element, event, fn, true, options)
  }

  remove(
    element: PoolItemElement,
    event: keyof HTMLElementEventMap,
    fn: EventListener,
    options?: AddEventListenerOptions
  ) {
    this.#toggleEventInPool(element, event, fn, false, options)
  }

  #toggleEventInPool(
    element: PoolItemElement,
    event: keyof HTMLElementEventMap,
    fn: EventListener,
    toAdd: boolean,
    options?: AddEventListenerOptions
  ) {
    if (toAdd) {
      this.#pool.push({ element, event, fn })
    } else {
      this.#pool = this.#pool.filter(
        (item) =>
          item.element !== element || item.event !== event || item.fn !== fn
      )
    }

    element[toAdd ? 'addEventListener' : 'removeEventListener'](
      event,
      fn,
      options
    )
  }

  removeByEvent(event: keyof HTMLElementEventMap) {
    this.#pool.forEach((item) =>
      item.element.removeEventListener(event, item.fn)
    )
    this.#pool = this.#pool.filter((item) => item.event !== event)
  }

  clearPool() {
    this.#pool.forEach((item) => {
      const { element, event, fn } = item
      this.remove(element, event, fn)
    })
  }

  showPool() {
    console.log(this.#pool)
  }
}

class Coordinates {
  point: Point = { x: 0, y: 0 }
  bounds: Partial<DOMRect> = {}

  getPointsOffset(event: Event) {
    const pointerEvent = event as PointerEvent
    const x = pointerEvent.clientX - this.point.x
    const y = pointerEvent.clientY - this.point.y
    return { x, y }
  }

  initPoint(event: Event) {
    const pointerEvent = event as PointerEvent
    this.point.x = pointerEvent.clientX
    this.point.y = pointerEvent.clientY
  }

  initBounds(elem: HTMLElement) {
    this.bounds = elem.getBoundingClientRect()
  }

  setPosition(elem: HTMLElement, event: Event) {
    const { left, top } = this.bounds
    if (typeof left !== 'number' || typeof top !== 'number') return
    const { x, y } = this.getPointsOffset(event)
    elem.style.left = `${left + x}px`
    elem.style.top = `${top + y}px`
  }
}

class Clone {
  sortableInstance: Sortable
  events = new EventsPool()
  $clone: HTMLElement | null = null

  constructor(sortableInstance: Sortable) {
    this.sortableInstance = sortableInstance
  }

  create() {
    if (this.$clone) return
    this.$clone = this.sortableInstance.$sortable?.cloneNode(
      true
    ) as HTMLElement

    this.$clone.classList.add('sortable__clone')
    this.setDefaultStyles()
    document.body.insertAdjacentElement('beforeend', this.$clone)
    this.events.add(this.$clone, 'transitionend', this.onCloneTransitionEnd)
  }

  private setDefaultStyles() {
    const { width, height, left, top } =
      this.sortableInstance.$sortable!.getBoundingClientRect()
    const styles: Partial<CSSStyleDeclaration> = {
      position: 'fixed',
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
      margin: '0',
      pointerEvents: 'none',
    }
    setStyleAttributes(this.$clone!, styles)
  }

  private onCloneTransitionEnd = (e: Event) => {
    if ((e as TransitionEvent).propertyName === 'transform') return
    if (!this.$clone) throw new Error('element CLONE is not defined')
    this.events.remove(this.$clone, 'transitionend', this.onCloneTransitionEnd)
    this.removeClone()
    this.$clone = null
    this.sortableInstance.$sortable?.removeAttribute('style')
    this.sortableInstance.removeTransitionListener()
  }

  private removeClone() {
    if (!this.$clone) throw new Error('element CLONE is not defined')
    if (!this.sortableInstance.$sortable)
      throw new Error('ELEMENT is not defined')
    this.$clone.remove()
    this.sortableInstance.$sortable.classList.remove('sortable__item--selected')
  }

  setStyles(
    $items: HTMLElement[],
    $container: HTMLElement,
    itemsBounds: Partial<DOMRect>[]
  ) {
    if (!this.sortableInstance.$sortable)
      throw new Error('ELEMENT is not defined')

    const id = $items.indexOf(this.sortableInstance.$sortable)

    const { top, left } = itemsBounds[id]

    if (typeof top !== 'number' || typeof left !== 'number') return

    const containerBounds = $container.getBoundingClientRect()
    const styles = {
      top: `${containerBounds.top + top}px`,
      left: `${containerBounds.left + left}px`,
      transitionProperty: 'top, left',
      transitionDuration: '170ms',
      transitionTimingFunction: 'ease-out',
    }

    requestAnimationFrame(() => {
      if (!this.$clone) throw new Error('element CLONE is not defined')
      setStyleAttributes(this.$clone, styles)
    })
  }
}

export class Sortable {
  $container = ref<HTMLElement | null>(null)
  $sortable: HTMLElement | undefined
  private $cross: HTMLElement | undefined
  private events = new EventsPool()
  private coords?: Coordinates
  private clone?: Clone
  private handle?: string
  private selector?: string
  private $items: HTMLElement[] = []
  private itemsBounds: Partial<DOMRect>[] = []
  private isDragStart = false

  private initOptions(options?: SortableOptions) {
    options = { ...DEFAULT_OPTIONS, ...options }
    const keys = Object.keys(options) as (keyof typeof options)[]
    keys.forEach((key) => (this[key] = options[key]))
  }

  init(container: Ref<HTMLElement | null>, options?: SortableOptions) {
    if (!container.value) return
    this.initOptions(options)
    this.$container.value = container.value
    this.$items = [...container.value.children] as HTMLElement[]
    this.events.add(container.value, 'pointerdown', this.onPointerDown)
  }

  refresh() {
    const container = HTMLElementGuard(this.$container)
    queueMicrotask(
      () => (this.$items = [...container.children] as HTMLElement[])
    )
  }

  removeTransitionListener() {
    const container = HTMLElementGuard(this.$container)
    this.events.remove(container, 'transitionend', this.onTransitionEnd)
  }

  removeListeners() {
    this.events.clearPool()
  }

  private onPointerDown = (e: Event) => {
    if (this.clone?.$clone) return
    const target = e.target as HTMLElement
    const isHandle =
      this.handle &&
      !target.classList.contains(this.handle) &&
      !target.hasAttribute(this.handle)
    if (isHandle) return
    const sortableCard = target.closest(`${this.selector}`) as HTMLElement
    if (!sortableCard) return
    const container = HTMLElementGuard(this.$container)
    this.$sortable = sortableCard
    this.coords = new Coordinates()
    this.clone = new Clone(this)
    this.coords.initPoint(e)
    this.coords.initBounds(this.$sortable)
    this.itemsBounds = calcOffsetFromParent(container, this.$items)
    this.$items.forEach((item) =>
      this.events.add(item, 'pointerenter', this.onPointerEnter)
    )

    this.events.add(container, 'transitionend', this.onTransitionEnd)
    this.events.add(window, 'pointerup', this.onPointerUp)
    this.events.add(window, 'pointermove', this.onPointerMove, {
      passive: true,
    })
    this.isDragStart = true
  }

  private onPointerMove = (e: Event) => {
    if (!this.isDragStart) return
    if (!this.$sortable) throw new Error('element SORTABLE is not defined')
    this.clone?.create()
    if (!this.clone?.$clone) throw new Error('element SORTABLE is not defined')
    this.coords?.setPosition(this.clone.$clone, e)
    setStyleAttributes(this.$sortable, { opacity: '0' })
  }

  private onPointerEnter = (e: Event) => {
    if (!this.isDragStart) return
    this.$cross = e.target as HTMLElement
    if (this.$cross == this.$sortable) return

    this.setStyleForContainer()
    this.setStylesForItems({ position: 'absolute', pointerEvents: 'none' })
    this.swapItems()
    requestAnimationFrame(() =>
      this.setStylesForItems({
        transitionProperty: 'top, left',
        transitionDuration: '150ms',
        transitionTimingFunction: 'ease',
      })
    )
  }

  private onPointerUp = () => {
    if (!this.$sortable) throw new Error('element SORTABLE is not defined')

    this.$items.forEach((item) =>
      this.events.remove(item, 'pointerenter', this.onPointerEnter)
    )
    this.events.remove(window, 'pointermove', this.onPointerMove)
    this.events.remove(window, 'pointerup', this.onPointerUp)

    if (!this.clone?.$clone) return
    this.clone.$clone.classList.remove('sortable__clone')
    const container = HTMLElementGuard(this.$container)
    this.clone.setStyles(this.$items, container, this.itemsBounds)
  }

  private onTransitionEnd = (e: Event) => {
    if (!this.isDragStart) return

    if ((e as TransitionEvent).propertyName === 'transform') return
    const container = HTMLElementGuard(this.$container)
    this.$items.forEach((item) => {
      item.removeAttribute('style')
      container.appendChild(item)
    })
    container.removeAttribute('style')
    if (!this.$sortable) throw new Error('element SORTABLE is not defined')
    setStyleAttributes(this.$sortable, { opacity: '0' })
  }

  private swapItems() {
    if (!this.$sortable) throw new Error('element SORTABLE is not defined')
    if (!this.$cross) throw new Error('element CROSS is not defined')
    const selectedId = this.$items.indexOf(this.$sortable)
    const crossId = this.$items.indexOf(this.$cross)
    const [removable] = this.$items.splice(selectedId, 1)
    this.$items.splice(crossId, 0, removable)
  }

  private setStyleForContainer() {
    const container = HTMLElementGuard(this.$container)
    const { height } = container.getBoundingClientRect()

    setStyleAttributes(container, {
      height: `${height}px`,
    })
  }

  private setStylesForItems(styles?: Partial<CSSStyleDeclaration>) {
    this.$items.forEach((item, idx) => {
      const { top, left, width, height } = this.itemsBounds[idx]

      const props: Partial<CSSStyleDeclaration> = {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        margin: '0',
      }
      if (styles) Object.assign(props, styles)

      setStyleAttributes(item, props)
    })
  }
}

function setStyleAttributes(
  elem: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
) {
  Object.entries(styles).forEach(([key, value]) => {
    if (typeof value !== 'string') return
    ;(elem.style[key as keyof CSSStyleDeclaration] as string) = value
  })
}

function calcOffsetFromParent($parent: HTMLElement, $elems: HTMLElement[]) {
  const parentBounds = $parent.getBoundingClientRect()

  return $elems.map((el) => {
    const { left, top, width, height } = el.getBoundingClientRect()
    return {
      left: left - parentBounds.left,
      top: top - parentBounds.top,
      width,
      height,
    }
  })
}

function HTMLElementGuard(elem: Ref<HTMLElement | null>) {
  if (elem.value == null) throw new Error(`Element is null`)
  return toValue(elem) as HTMLElement
}
