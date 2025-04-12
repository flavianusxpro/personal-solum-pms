import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from './common-rules';

// form zod validation schema
export const assignDoctorSchema = z.object({
  doctor: z.array(z.string()).min(1, messages.doctorIsRequired),
  generalPractice: z.string().optional(),
});

// generate form types from zod validation schema
export type AssignDoctorTypes = z.infer<typeof assignDoctorSchema>;

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
