import { z } from 'zod'
import { scheduleSchemaWithStyle } from './schedule-schema'

export const programFormSchema = z.object({
  id: z.string(),
  title: z.string().min(5, 'Минимум 5 символов'),
  slug: z.string().optional(),
  color: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  hosts: z.array(z.string()).optional(),
  schedule: z.array(scheduleSchemaWithStyle).optional(),
  isPublished: z.boolean().optional(),
  showInMenu: z.boolean().optional(),
  type: z.enum(['программа', 'дайджест']).default('программа'),
})

export type ProgramForm = z.output<typeof programFormSchema>
export type ProgramFormWithStringSchedule = Omit<ProgramForm, 'schedule'> & {
  schedule: string[]
}
