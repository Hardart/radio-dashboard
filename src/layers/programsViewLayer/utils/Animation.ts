import { isType } from '@/shared/helpers/utils'
import type { AnimationProps } from './SpringAnimation'
import SpringAnimation from './SpringAnimation'
import type { PointAnimationProps } from './SpringPointAnimation'
import SpringPointAnimation from './SpringPointAnimation'

type Animations = SpringAnimation
type PointAnimation = SpringPointAnimation

export class HdAnimation {
  start(props: AnimationProps) {
    const animation = new SpringAnimation(props)
    animation.onFinish = () => this.stop(animation)
    return animation
  }

  stop(animation: Animations) {
    animation.destroy()
  }
}

export class HdPointAnimation {
  start(props: PointAnimationProps) {
    const animation = new SpringPointAnimation(props)
    animation.onFinish = () => this.stop(animation)
    return animation
  }

  stop(animation: PointAnimation) {
    animation.destroy()
  }
}
