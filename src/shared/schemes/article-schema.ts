import { z } from 'zod'
import { categorySchema } from '@/shared/schemes/category-schema'
import { PUBLISH_STATUSES } from '@/shared/enums/article-status'

export const articleSchema = z.object({
  id: z.string(),
  image: z.string().optional(),
  title: z.string().min(5, 'Минимум 5 символов'),
  slug: z.string().min(5, 'Минимум 5 символов'),
  content: z.string().min(1, 'Контент новости не может быть пустым'),
  category: categorySchema,
  tags: z.array(z.string()),
  publishAt: z.coerce.date(),
  isPublished: z.boolean(),
  createdAt: z.string(),
  status: z.enum(['в ожидании', 'опубликовано', 'не опубликовано']),
})

export type Article = z.output<typeof articleSchema>
