import { z } from 'zod'

export type Schedule = z.output<typeof scheduleSchema>
export type ScheduleProperty = z.output<typeof scheduleTimeSchema>

const cellWidthSchema = z.object({
  startFromId: z.number(),
  width: z.number(),
})

const scheduleTimeSchema = z.object({
  start: z.object({
    hh: z.string(),
    mm: z.string(),
  }),
  end: z.object({
    hh: z.string(),
    mm: z.string(),
  }),
  isReplay: z.boolean(),
})

export const scheduleSchema = z.object({
  weekdayIds: z.array(z.number()),
  properties: z.array(scheduleTimeSchema),
  sizes: z.array(cellWidthSchema).optional(),
})
