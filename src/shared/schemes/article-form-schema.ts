import { z } from 'zod'

export const articleFormSchema = z.object({
  id: z.string().optional(),
  image: z.string().optional(),
  title: z.string().min(5, 'Минимум 5 символов'),
  content: z.string().min(1, 'Контент новости не может быть пустым'),
  tags: z.array(z.string()),
  isPublished: z.boolean(),
  publishAt: z.string(),
  categoryId: z.string().min(16, 'Выбери категорию'),
})

export type ArticleForm = z.output<typeof articleFormSchema>
