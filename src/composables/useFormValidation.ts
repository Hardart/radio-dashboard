import { ref } from 'vue'
import { z } from 'zod'
export interface FormError<T extends string = string> {
  path: T
  message: string
}

export const useFormValidation = () => {
  const errors = ref<FormError[]>([])

  async function getZodErrors(
    state: Record<string, any>,
    schema: z.AnyZodObject
  ) {
    const result = await schema.safeParseAsync(state)
    if (result.success !== false) return (errors.value = [])
    errors.value = result.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }))
  }

  return { errors, getZodErrors }
}
