import { z } from 'zod'
import { scheduleSchema } from './schedule-schema'
export type Program = z.output<typeof programSchema>

export const programSchema = z.object({
  id: z.string(),
  title: z.string({ required_error: 'Обязательное поле' }),
  slug: z.string().optional(),
  color: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  hosts: z.array(z.string()),
  schedule: z.array(scheduleSchema),
  isPublished: z.boolean(),
  showInMenu: z.boolean(),
})
