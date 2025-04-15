import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const assignSchema = z.object({
  clinic: z.array(z.string({ required_error: messages.clinicIsRequired })),
  doctor: z.array(z.string()).min(1, messages.doctorIsRequired),
  generalPractice: z.string().optional(),
});

// generate form types from zod validation schema
export type AssignTypes = z.infer<typeof assignSchema>;

export const defaultValues = {
  first_name: '',
  last_name: undefined,
  email: '',
  avatar: undefined,
  role: undefined,
  country: undefined,
  timezone: undefined,
  bio: undefined,
  portfolios: undefined,
};
