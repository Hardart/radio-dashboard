import { z } from 'zod'
import { scheduleSchema } from './schedule-schema'

export const programFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, 'Минимум 5 символов'),
  slug: z.string().optional(),
  color: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  hosts: z.array(z.string()),
  schedule: z.array(scheduleSchema),
  isPublished: z.boolean(),
  showInMenu: z.boolean(),
})

export type ProgramForm = z.output<typeof programFormSchema>
