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
  selector: '[draggable]',
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
    if (!toAdd) {
      this.#pool = this.#pool.filter(
        (item) =>
          item.element !== element || item.event !== event || item.fn !== fn
      )
    } else {
      this.#pool.push({ element, event, fn })
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
  events: EventsPool
  $clone: HTMLElement | null = null
  $element: HTMLElement | null = null

  constructor() {
    this.events = new EventsPool()
  }

  create(element: HTMLElement) {
    if (this.$clone) return
    this.$element = element
    this.$clone = this.$element.cloneNode(true) as HTMLElement

    this.$clone.classList.add('clone')
    this.setDefaultStyles()
    document.body.insertAdjacentElement('beforeend', this.$clone)
    this.events.add(this.$clone, 'transitionend', this.onCloneTransitionEnd)
  }

  private setDefaultStyles() {
    const { width, height, left, top } = this.$element!.getBoundingClientRect()
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

  private onCloneTransitionEnd = () => {
    if (!this.$clone) throw new Error('element CLONE is not defined')
    this.events.remove(this.$clone, 'transitionend', this.onCloneTransitionEnd)
    this.removeClone()
    this.$clone = null
    this.$element?.removeAttribute('style')
  }

  private removeClone() {
    if (!this.$clone) throw new Error('element CLONE is not defined')
    if (!this.$element) throw new Error('ELEMENT is not defined')
    this.$clone.remove()
    this.$element.classList.remove('sortable__item--selected')
  }

  setStyles(
    $items: HTMLElement[],
    $container: HTMLElement,
    itemsBounds: Partial<DOMRect>[]
  ) {
    if (!this.$element) throw new Error('ELEMENT is not defined')

    const id = $items.indexOf(this.$element)

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
  private $container: HTMLElement
  private $sortable: HTMLElement | undefined
  private $cross: HTMLElement | undefined
  private events: EventsPool
  private coords?: Coordinates
  private clone?: Clone
  private handle?: string
  private selector?: string
  private $items: HTMLElement[] = []
  private itemsBounds: Partial<DOMRect>[] = []
  private isDragStart = false

  constructor(containerEl: HTMLElement, options: SortableOptions) {
    if (!containerEl)
      throw new Error('not passed sortable container element as param')
    this.$container = containerEl
    this.events = new EventsPool()

    this.init()
    this.initOptions(options)
  }

  static init(containerEl: HTMLElement, options: SortableOptions) {
    new Sortable(containerEl, options)
  }

  private initOptions(options: SortableOptions) {
    options = { ...DEFAULT_OPTIONS, ...options }
    const keys = Object.keys(options) as (keyof typeof options)[]
    keys.forEach((key) => (this[key] = options[key]))
  }

  private init() {
    this.$items = [...this.$container.children] as HTMLElement[]
    this.events.add(this.$container, 'pointerdown', this.onPointerDown)
    this.events.add(this.$container, 'transitionend', this.onTransitionEnd)
  }

  private onPointerDown = (e: Event) => {
    const target = e.target as HTMLElement
    const isHandle =
      this.handle &&
      !target.classList.contains(this.handle) &&
      !target.hasAttribute(this.handle)
    if (isHandle) return
    const sortableCard = target.closest(`${this.selector}`) as HTMLElement
    if (!sortableCard) return

    this.$sortable = sortableCard
    this.coords = new Coordinates()
    this.clone = new Clone()
    this.coords.initPoint(e)
    this.coords.initBounds(this.$sortable)
    this.itemsBounds = calcOffsetFromParent(this.$container, this.$items)
    this.$items.forEach((item) =>
      this.events.add(item, 'pointerenter', this.onPointerEnter)
    )

    this.events.add(window, 'pointerup', this.onPointerUp)
    this.events.add(window, 'pointermove', this.onPointerMove, {
      passive: true,
    })
    this.isDragStart = true
  }

  private onPointerMove = (e: Event) => {
    if (!this.isDragStart) return
    if (!this.$sortable) throw new Error('element SORTABLE is not defined')
    this.clone?.create(this.$sortable)
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
    this.clone.setStyles(this.$items, this.$container, this.itemsBounds)
    this.isDragStart = false
  }

  private onTransitionEnd = () => {
    if (!this.isDragStart) return
    this.$items.forEach((item) => {
      item.removeAttribute('style')
      this.$container.appendChild(item)
    })
    this.$container.removeAttribute('style')
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
    const { height } = this.$container.getBoundingClientRect()

    setStyleAttributes(this.$container, {
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
