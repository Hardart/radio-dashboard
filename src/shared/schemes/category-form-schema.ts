import { z } from 'zod'
import { categorySchema } from './category-schema'

export type CategoryFormData = z.output<typeof categoryFormDataSchema>

export const categoryFormDataSchema = categorySchema
  .omit({ createdAt: true, updatedAt: true, id: true })
  .extend({ id: z.string().optional() })
