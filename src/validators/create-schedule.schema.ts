import { z } from 'zod';

export const scheduleFormSchema = z.object({
  interval: z.string({ required_error: 'Interval is required' }),
  week: z.array(
    z.object({
      label: z.string(),
      day: z.number(),
      startTime: z.date().optional(),
      endTime: z.date().optional(),
    })
  ),
  dailyBreakTimes: z
    .array(
      z.object({
        startTime: z.date().optional(),
        endTime: z.date().optional(),
      })
    )
    .optional(),
});

// generate form types from zod validation schema
export type ScheduleFormType = z.infer<typeof scheduleFormSchema>;
