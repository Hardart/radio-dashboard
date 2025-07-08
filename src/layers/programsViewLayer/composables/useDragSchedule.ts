import { ref, type Ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { HdAnimation } from '../utils/Animation'
import { minutesToTime, timeToMinutes } from '../utils/timeUtils'
import { MAX_HEIGHT, MIN_HEIGHT } from '../utils/constants'
import type { ScheduleWithStyle } from '@schema/schedule-schema'
import { useScheduleStore } from '../store/useScheduleStore'
import { _clamp } from '@/shared/helpers/utils'

interface Point {
  x: number
  y: number
}
const WEEKDAYS_LENGTH = 7
const AXIS_SWIPE_HYSTERISIS = 3
const BORDER_WIDTH = 1
const UPDATE_AFTER = 2000

export function useDragSchedule(
  cellHeight: Ref<number>,
  cellWidth: Ref<number>
) {
  let isDragStart = false
  let isResizeStart = false
  let animationStart = false
  let dragAxis: 'x' | 'y' | null = null
  let timerId: number | null = null
  const dragItem = ref<ScheduleWithStyle | null>(null)
  const startPoint: Point = { x: 0, y: 0 }
  const point: Point = { x: 0, y: 0 }
  const isDragInAction = ref(false)
  const initialProps = {
    left: 0,
    width: 0,
    duration: 0,
    startMinutes: 0,
  }

  const stack = ref<ScheduleWithStyle[]>()

  const scheduleStore = useScheduleStore()

  function onMouseDown(evt: MouseEvent, scheduleItem: ScheduleWithStyle) {
    if (animationStart) return
    if (timerId) clearTimeout(timerId)

    dragItem.value = scheduleItem
    dragItem.value.style.zIndex = 10
    _addScheduleToStack(scheduleItem)

    if (scheduleStore.scheduleForm.id !== dragItem.value.id)
      scheduleStore.updateScheduleForm(scheduleItem)

    _updatePoints(point, evt)
    _equalizePoints(startPoint, point)

    useEventListener(window, 'mousemove', onMouseMove)
    useEventListener(window, 'mouseup', onMouseUp)

    const { duration, style } = dragItem.value
    if (_isResizeTarget(evt)) {
      isResizeStart = true
      initialProps.duration = duration
      initialProps.width = Number(style.width)
    } else {
      initialProps.left = Number(style.left)
      initialProps.startMinutes = timeToMinutes(dragItem.value.startTime)
    }
  }

  function onMouseMove(evt: MouseEvent) {
    if (dragItem.value === null) return
    _calculateDragDirection()
    if (dragAxis && isResizeStart == false) isDragStart = true

    if (isResizeStart) {
      if (dragAxis === 'x') _onResizeItemXAxis(dragItem.value)
      else if (dragAxis === 'y') _onResizeItemYAxis(dragItem.value)
    }

    if (isDragStart) {
      if (dragAxis === 'x') _onDragItemXAxis(dragItem.value)
      else if (dragAxis === 'y') _onDragItemYAxis(dragItem.value)
    }
    isDragInAction.value = true
    _updatePoints(point, evt)
  }

  function _onDragItemXAxis(dragItem: ScheduleWithStyle) {
    const xOffset = _getXOffset(point, startPoint)

    const tableWidth = cellWidth.value * WEEKDAYS_LENGTH
    const maxLeft = tableWidth - Number(dragItem.style.width) + WEEKDAYS_LENGTH
    const currValue = initialProps.left + xOffset
    dragItem.style.left = _clamp(0, maxLeft, currValue)
  }

  function _onDragItemYAxis(dragItem: ScheduleWithStyle) {
    const yOffset = _getYOffset(point, startPoint)
    const duration = 24 * 60 - dragItem.duration

    const minStartTime =
      initialProps.startMinutes +
      _getHeigthForFiveMinutes(yOffset, cellHeight.value)
    const startTimeMinutes = Math.max(0, Math.min(duration, minStartTime))
    dragItem.startTime = minutesToTime(startTimeMinutes)
  }

  function _onResizeItemXAxis(dragItem: ScheduleWithStyle) {
    const xOffset = _getXOffset(point, startPoint)

    initialProps.width += xOffset
    const minWidth = cellWidth.value / 1.5
    dragItem.style.width = Math.max(minWidth, initialProps.width)
    _equalizePoints(startPoint, point)
  }

  function _onResizeItemYAxis(dragItem: ScheduleWithStyle) {
    const yOffset = _getYOffset(point, startPoint)

    const durationChange = _getHeigthForFiveMinutes(yOffset, cellHeight.value)
    const newDuration = Math.max(5, initialProps.duration + durationChange)
    dragItem.duration = newDuration
  }

  function onMouseUp(evt: MouseEvent) {
    if (isResizeStart && dragAxis === 'x') {
      _onResizeEnd()
    } else if (isDragStart && dragAxis === 'x') {
      requestAnimationFrame(() => _onDragEnd(evt))
    } else if (isDragStart || isResizeStart) {
      _updateSchedule()
      _resetDragItem()
    } else {
      _clearStack()
      _resetDragItem()
    }
  }

  function _onResizeEnd() {
    if (dragItem.value === null) return
    const animation = new HdAnimation()
    const dayRange = _calcDayRange(dragItem.value, cellWidth.value)
    dragItem.value.dayRange = dayRange
    const start = Number(dragItem.value.style.width)
    const end = cellWidth.value * dayRange + dayRange - BORDER_WIDTH // отнимаем толщину border - 1px

    animationStart = true
    animation.start({
      start,
      end,
      velocity: 0.2,
      dampingRatio: 0.6,
      onUpdate(value) {
        if (dragItem.value === null) return
        dragItem.value.style.width = value
      },
      onComplete() {
        if (dragItem.value === null) return
        dragItem.value.style.width = end
        _updateSchedule()
        _resetDragItem()
      },
    })
  }

  function _onDragEnd(evt: MouseEvent) {
    if (dragItem.value === null) return
    const cellElement = _getElementFromPoint(evt)

    if (!_isUnderCell(cellElement)) {
      _resetDragItem()
      return
    }

    const animation = new HdAnimation()
    const cellId = Number(cellElement.dataset.id)
    const minDayIndex = 7 - dragItem.value.dayRange
    const correctCellId = Math.min(cellId, minDayIndex)
    const start = Number(dragItem.value.style.left)
    const end = cellWidth.value * correctCellId + correctCellId + BORDER_WIDTH

    function onUpdate(value: number) {
      if (dragItem.value === null) return
      dragItem.value.style.left = value
    }

    function onComplete() {
      if (dragItem.value === null) return
      dragItem.value.dayIndex = correctCellId
      _updateSchedule()
      _resetDragItem()
    }

    animationStart = true
    animation.start({
      start,
      end,
      onUpdate,
      onComplete,
      dampingRatio: 0.5,
    })
  }

  function _resetDragItem() {
    if (!dragItem.value) return
    delete dragItem.value.style.zIndex
    dragItem.value = null
    isDragStart = false
    isDragInAction.value = false
    isResizeStart = false
    dragAxis = null
    animationStart = false
  }

  function _calculateDragDirection() {
    if (dragAxis !== null) return
    // calculate delta of the last touchmove tick
    const diff = _getDifference(point, startPoint)

    if (diff !== 0) {
      // check if pointer was shifted horizontally or vertically
      const axisToCheck = diff > 0 ? 'x' : 'y'

      const isAxisChange = _isAxisChange(point, startPoint, axisToCheck)

      if (isAxisChange) dragAxis = axisToCheck
    }
  }

  function _isResizeTarget(evt: MouseEvent) {
    const target = evt.target as HTMLDivElement
    return target.classList.contains('schedule-item__grab')
  }

  function onWheel(event: WheelEvent) {
    const delta = event.deltaY > 0 ? -5 : 5
    const newHeight = Math.min(
      MAX_HEIGHT,
      Math.max(MIN_HEIGHT, cellHeight.value + delta)
    )

    if (newHeight !== cellHeight.value) {
      cellHeight.value = newHeight
    }
  }

  function _updateSchedule() {
    timerId = setTimeout(() => {
      if (!Array.isArray(stack.value)) return
      scheduleStore.updateManySchedules(stack.value)
      _clearStack()
    }, UPDATE_AFTER)
  }

  function _clearStack() {
    stack.value = undefined
  }

  function _addScheduleToStack(schedule: ScheduleWithStyle) {
    if (!Array.isArray(stack.value)) stack.value = []
    stack.value = stack.value.filter(
      (stackItem) => stackItem.id !== schedule.id
    )
    stack.value.push(schedule)
  }

  return {
    isDragStart,
    isDragInAction,
    onMouseDown,
    onWheel,
    stack,
  }
}

//OUTER FUNCTIONS
function _equalizePoints(pointToUpdate: Point, updateFromPoint: Point) {
  pointToUpdate.x = updateFromPoint.x
  pointToUpdate.y = updateFromPoint.y
}

function _updatePoints(pointToUpdate: Point, event: MouseEvent) {
  pointToUpdate.x = event.clientX
  pointToUpdate.y = event.clientY
}

function _getDifference(point1: Point, point2: Point) {
  return Math.abs(point1.x - point2.x) - Math.abs(point1.y - point2.y)
}

function _getXOffset(point1: Point, point2: Point) {
  return point1.x - point2.x
}

function _getYOffset(point1: Point, point2: Point) {
  return point1.y - point2.y
}

function _getOffset(point1: Point, point2: Point) {
  const xOffset = _getXOffset(point1, point2)
  const yOffset = _getYOffset(point1, point2)
  return { xOffset, yOffset }
}

function _isAxisChange(point: Point, startPoint: Point, axis: 'x' | 'y') {
  return Math.abs(point[axis] - startPoint[axis]) >= AXIS_SWIPE_HYSTERISIS
}

function _getHeigthForFiveMinutes(yOffset: number, cellHeight: number) {
  const minuteHeight = cellHeight / 60 // Высота одной минуты в пикселях
  const fiveMinuteHeight = minuteHeight * 5 // Высота 5 минут в пикселях
  return Math.round(yOffset / fiveMinuteHeight) * 5
}

function _calcDayRange(dragItem: ScheduleWithStyle, cellWidth: number) {
  const reminder = Math.ceil(Number(dragItem.style.width) / cellWidth)
  return Math.min(7 - dragItem.dayIndex, reminder)
}

function _getElementFromPoint(evt: MouseEvent) {
  const x = evt.clientX
  const y = evt.clientY
  return document.elementFromPoint(x, y) as HTMLDivElement
}

function _isUnderCell(element: HTMLDivElement) {
  return element.classList.contains('cell')
}
