import type { CSSProperties } from 'vue'
import { z } from 'zod'
export type Slide = z.output<typeof slideSchema>
export type ExtendedSlide = z.output<typeof extendedSlideSchema>

export const slideSchema = z.object({
  id: z.string(),
  src: z.string(),
  priority: z.number().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  to: z.string().optional(),
})

export const extendedSlideSchema = slideSchema.extend({
  style: z.custom<CSSProperties>(
    (value) => {
      // Проверяем, что значение является объектом
      return typeof value === 'object' && value !== null
    },
    {
      message: 'Must be a valid CSSProperties object',
    }
  ),
})
