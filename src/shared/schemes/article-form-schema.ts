import { z } from 'zod'

export const articleFormSchema = z.object({
  image: z.string().optional(),
  title: z.string().min(5, 'Минимум 5 символов'),
  content: z.string().min(1, 'Контент новости не может быть пустым'),
  categoryId: z.string(),
  tags: z.array(z.string()),
  isPublished: z.boolean(),
  publishAt: z.string(),
})

export type ArticleForm = z.output<typeof articleFormSchema>
