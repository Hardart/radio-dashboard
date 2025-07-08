import { z } from 'zod'
export type User = z.output<typeof userSchema>
export type UserFormData = z.output<typeof userFormDataSchema>
export type UserLoginForm = z.output<typeof userLoginSchema>

export const userSchema = z.object({
  id: z.string(),
  email: z
    .string({ required_error: 'Обязательное поле' })
    .email({ message: 'Неверный формат email' }),
  roles: z.array(z.string()),
  createdAt: z.string(),
  accessToken: z.string(),
  avatar: z.string().optional(),
  fullName: z.string(),
  firstName: z
    .string({ required_error: 'Обязательное поле' })
    .min(3, 'Минимум 3 знака'),
  role: z.enum(['admin', 'host', 'superadmin', 'creator']),
  lastName: z
    .string({ required_error: 'Обязательное поле' })
    .min(3, 'Минимум 3 знака'),
})

export const userFormDataSchema = userSchema
  .omit({
    id: true,
    createdAt: true,
    accessToken: true,
    roles: true,
    fullName: true,
  })
  .extend({
    id: z.string().optional(),
    password: z
      .string()
      .trim()
      .superRefine((val, ctx) => {
        isEmpty(val, ctx)
        minError(val, ctx)
      }),
    password_new: z.string().optional(),
    roles: z.array(z.string()).optional(),
    role: z.string(),
  })

export const userLoginSchema = z.object({
  email: z.string().email({ message: 'Неверный формат email' }),

  password: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      isEmpty(val, ctx)
      minError(val, ctx)
    }),
})

function isEmpty(val: string, ctx: z.RefinementCtx) {
  if (val == '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Обязательное поле',
    })
  }
}

function minError(val: string, ctx: z.RefinementCtx) {
  if (val.length < 7) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Минимум 7 знаков',
    })
  }
}
