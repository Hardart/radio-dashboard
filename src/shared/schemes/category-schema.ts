import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string().min(16, 'id'),
  title: z.string().min(5, 'Хотя бы 5 знаков'),
  slug: z.string().min(5, 'Хотя бы 5 знаков'),
  createdAt: z.string(),
  updatedAt: z.string(),
  isPublished: z.boolean(),
})

export type Category = z.output<typeof categorySchema>
