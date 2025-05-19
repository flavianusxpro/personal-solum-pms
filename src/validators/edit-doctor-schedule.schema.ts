import { z } from 'zod';

export const editdoctorScheduleFormSchema = z.object({
  description: z.string().optional(),
  date: z.object({
    start_date: z.date().optional(),
    end_date: z.date().optional(),
  }),
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
export type EditDoctorScheduleFormType = z.infer<
  typeof editdoctorScheduleFormSchema
>;
