import { z } from 'zod'
export type HostFormData = z.output<typeof hostFormSchema>

export const hostFormSchema = z.object({
  id: z.string().optional(),
  email: z
    .string({ required_error: 'Обязательное поле' })
    .email({ message: 'Неверный формат email' }),
  roles: z.array(z.string()).default([]),
  avatar: z.string().optional(),
  firstName: z
    .string({ required_error: 'Обязательное поле' })
    .min(3, 'Минимум 3 знака'),
  lastName: z
    .string({ required_error: 'Обязательное поле' })
    .min(3, 'Минимум 3 знака'),
  password: z.string().trim(),
  password_new: z.string().trim(),
})

function minError(val: string, ctx: z.RefinementCtx) {
  if (val.length < 7) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Минимум 7 знаков',
    })
  }
}
