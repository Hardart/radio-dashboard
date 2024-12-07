import { z } from 'zod'
export type Track = z.output<typeof trackSchema>

export const trackSchema = z.object({
  id: z.string(),
  artistName: z
    .string({ required_error: 'Обязательное поле' })
    .min(1, 'Введите имя исполнителя'),
  trackTitle: z.string(),
  cover: z.string(),
  createdAt: z.string(),
  preview: z.string(),
})
