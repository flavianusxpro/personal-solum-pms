import { z } from 'zod';

export const doctorScheduleFormSchema = z.object({
  interval: z.string().min(1, { message: 'Interval is required' }),
  description: z.string().optional(),
  dates: z.array(
    z.object({
      label: z.string(),
      day: z.number(),
      start_date: z.date().optional(),
      end_date: z.date().optional(),
    })
  ),
  dailyBreakTimes: z
    .array(
      z.object({
        label: z.string(),
        day: z.number(),
        start_date: z.date().optional(),
        end_date: z.date().optional(),
      })
    )
    .optional(),
});

// generate form types from zod validation schema
export type DoctorScheduleFormType = z.infer<typeof doctorScheduleFormSchema>;
