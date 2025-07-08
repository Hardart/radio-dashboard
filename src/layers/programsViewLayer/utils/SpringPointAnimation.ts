import { number } from 'zod'
import SpringEaser from './SpringEaser'
export type Point = {
  x: number
  y: number
}

export interface PointAnimationProps {
  start: Point
  end: Point
  velocity?: number
  dampingRatio?: number
  naturalFrequency?: number
  onUpdate: (value: Point) => void
  onComplete: () => void
  onFinish?: () => void
}

class SpringPointAnimation {
  props: PointAnimationProps
  _raf: number
  onFinish: () => void

  constructor(props: PointAnimationProps) {
    this.props = props
    this._raf = 0

    const {
      start,
      end,
      velocity,
      dampingRatio,
      naturalFrequency,
      onUpdate,
      onComplete,
      onFinish = () => {},
    } = props

    this.onFinish = onFinish

    const easerX = new SpringEaser(velocity, dampingRatio, naturalFrequency)
    const easerY = new SpringEaser(velocity, dampingRatio, naturalFrequency)
    let prevXTime = Date.now()
    let prevYTime = Date.now()
    let deltaXPosition = start.x - end.x
    let deltaYPosition = start.y - end.y

    const animationLoop = () => {
      if (this._raf) {
        deltaXPosition = easerX.easeFrame(
          deltaXPosition,
          Date.now() - prevXTime
        )
        deltaYPosition = easerY.easeFrame(
          deltaYPosition,
          Date.now() - prevYTime
        )

        // Stop the animation if velocity is low and position is close to end
        if (
          Math.abs(deltaXPosition) < 1 &&
          Math.abs(easerX.velocity) < 50 &&
          Math.abs(deltaYPosition) < 1 &&
          Math.abs(easerY.velocity) < 50
        ) {
          // Finalize the animation
          onUpdate(end)
          if (onComplete) onComplete()
          this.onFinish()
        } else {
          prevXTime = Date.now()
          prevYTime = Date.now()
          const x = deltaXPosition + end.x
          const y = deltaYPosition + end.y
          onUpdate({ x, y })
          this._raf = requestAnimationFrame(animationLoop)
        }
      }
    }

    this._raf = requestAnimationFrame(animationLoop)
  }

  // Destroy is called automatically onFinish
  destroy() {
    if (this._raf >= 0) {
      cancelAnimationFrame(this._raf)
    }
    this._raf = 0
  }
}

export default SpringPointAnimation
