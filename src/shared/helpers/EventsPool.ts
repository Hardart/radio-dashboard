type PoolItemElement = HTMLElement | (Window & typeof globalThis)

type PoolItem = {
  event: keyof HTMLElementEventMap
  element: PoolItemElement
  fn: EventListener
}

export class EventsPool {
  private _pool: PoolItem[] = []

  add(
    element: PoolItemElement,
    event: keyof HTMLElementEventMap,
    fn: EventListener,
    options?: AddEventListenerOptions
  ) {
    this._toggleEventInPool(element, event, fn, true, options)
  }

  remove(
    element: PoolItemElement,
    event: keyof HTMLElementEventMap,
    fn: EventListener,
    options?: AddEventListenerOptions
  ) {
    this._toggleEventInPool(element, event, fn, false, options)
  }

  private _toggleEventInPool(
    element: PoolItemElement,
    event: keyof HTMLElementEventMap,
    fn: EventListener,
    toAdd: boolean,
    options?: AddEventListenerOptions
  ) {
    if (toAdd) {
      this._pool.push({ element, event, fn })
    } else {
      this._pool = this._pool.filter(
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
    this._pool.forEach((item) =>
      item.element.removeEventListener(event, item.fn)
    )
    this._pool = this._pool.filter((item) => item.event !== event)
  }

  clearPool() {
    this._pool.forEach((item) => {
      const { element, event, fn } = item
      this.remove(element, event, fn)
    })
  }

  showPool() {
    console.log(this._pool)
  }
}
