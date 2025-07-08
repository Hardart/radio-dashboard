import type { CSSProperties } from 'vue'
import { z } from 'zod'

export type Schedule = z.output<typeof scheduleSchema>
export type ScheduleWithStyle = z.output<typeof scheduleSchemaWithStyle>

// new schema

export const scheduleSchema = z.object({
  id: z.string(),
  dayIndex: z.number(),
  dayRange: z.number(),
  duration: z.number(),
  startTime: z.string(),
  isReplay: z.boolean(),
  priority: z.number().optional(),
})

// Добавляем новое поле `styles` с типом `CSSProperties`
export const scheduleSchemaWithStyle = scheduleSchema.extend({
  style: z.custom<CSSProperties>(
    (value) => {
      // Проверяем, что значение является объектом
      return typeof value === 'object' && value !== null
    },
    {
      message: 'Must be a valid CSSProperties object',
    }
  ),
})

// Используем тип на основе расширенной схемы
