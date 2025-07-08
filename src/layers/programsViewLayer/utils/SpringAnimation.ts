import { number } from 'zod'
import SpringEaser from './SpringEaser'

export interface AnimationProps {
  start: number
  end: number
  velocity?: number
  dampingRatio?: number
  naturalFrequency?: number
  onUpdate: (value: number) => void
  onComplete: () => void
  onFinish?: () => void
}

class SpringAnimation {
  props: AnimationProps
  _raf: number
  onFinish: () => void

  constructor(props: AnimationProps) {
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

    const easer = new SpringEaser(velocity, dampingRatio, naturalFrequency)
    let prevTime = Date.now()
    let deltaPosition = start - end

    const animationLoop = () => {
      if (this._raf) {
        deltaPosition = easer.easeFrame(deltaPosition, Date.now() - prevTime)

        // Stop the animation if velocity is low and position is close to end
        if (Math.abs(deltaPosition) < 1 && Math.abs(easer.velocity) < 50) {
          // Finalize the animation
          onUpdate(end)
          if (onComplete) onComplete()
          this.onFinish()
        } else {
          prevTime = Date.now()
          onUpdate(deltaPosition + end)
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

export default SpringAnimation
