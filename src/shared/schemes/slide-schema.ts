import { z } from 'zod'
export type Slide = z.output<typeof slideSchema>

export const slideSchema = z.object({
  id: z.string(),
  src: z.string(),
  priority: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  to: z.string().optional(),
})
